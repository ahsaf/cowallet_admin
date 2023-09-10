

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Parties } from '../../actions/party';
import { Get_Works } from '../../actions/work';
import { Get_Accounts } from '../../actions/accounts';

import CTable from '../../components/Ctable';
import { Post } from '../../services/services';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        party:{},
        party_name:"",
        e_party:"",
        amount:"",
        e_amount:"",
        project:{},
        e_project:"",
        qty:"1",
        e_qty:"",
        item:"",
        e_item:"",
        items:[],
        payed:false,
        payed_amount:"",
        total:0,
        loading:false,
        account:HAND_ACCOUNT,
        select_party:true,
        date:new Date(),
        bill_no:""      
      }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
    componentDidMount(){
        this.props.Get_Parties({},()=>{});
        this.props.Get_Works({},()=>{});
        this.props.Get_Accounts({},()=>{});
    }
    onDateSelect = (date)=>{
      this.setState({date});
    }
    onSlectItem = (cus)=>{
        this.setState({item:cus,unit_price:String(cus.unit_price)})
    }
    onPayedTick = (current)=>{
        if(current){
          this.setState({payed:false})
        }else{
          this.setState({payed:true,payed_amount:String(this.state.total)})
        }
    }
    onSubmit = ()=>{
      const s = this.state;
      let e_party = s.select_party?s.party.id?false:"Choose Party":s.party_name?false:"Enter party name";
      let e_project = s.project.id?false:"Choose Project";
      if(e_party || e_project){
        this.setState({e_party,e_project});
      }else
       if(s.items.length === 0){
        alert("At least one item required.")
        this.setState({e_party});
      }else{
        this.setState({loading:true,e_party,e_project});
        Post("/expense/create",{
          items:s.items,
          party_name:s.party_name,
          select_party:s.select_party,
          party:s.party,
          project:s.project,
          payed:s.payed,
          payed_amount:s.payed_amount,
          account:s.account,
          date:s.date,
          bill_no:s.bill_no,
        },(st,res)=>{
          if(st){
            this.setState({loading:false});
            // Tost("Expense Saved Successfully");
            this.clear_state();
          }else{
            // Tost(Tost_Massages.wrong);
          }
        })
      }
    }
    clear_state = ()=>{
      this.setState({
            party:{},
            party_name:"",
            amount:"",
            e_amount:"",
            item:"",
            e_item:"",
            items:[],
            payed:false,
            payed_amount:"",
            total:0,
            loading:false,
            select_party:true
      })
    }
    onAddItem = ()=>{
        const s = this.state;
        let e_amount = s.amount && Number(s.amount) > 0?false:"Enter a valid amount";
        let e_qty = s.qty && Number(s.qty) > 0?false:"Enter a valid quantity";
        let e_item = get_error_string(s.item,"Name",1);
        if(e_amount || e_item ||e_qty ){
          this.setState({e_item,e_amount,e_qty});
        }else{
            let item = {
                item:s.item,
                amount:Number(s.amount),
                qty:Number(s.qty),
                total:Number(s.amount) * Number(s.qty),
                id:Math.random()
                 }
               let total = this.state.total + (Number(s.amount) * Number(s.qty));
                let all_items = this.state.items;
                all_items.push(item);
                this.setState({items:all_items,amount:"",item:"",e_item:"",e_amount:"",total})
        }
      }
      onRemoveItem = (item)=>{
        this.setState({items:this.state.items.filter(li => li.id !== item.id),total:this.state.total - Number(item.amount)});
      }


    render(){
  return (
     <>
        <div style={{}}>
			<CTable 
			fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"Designation",key:"desigination"},{title:"Balance",key:"balance"}]}
			list={this.props.employee.employees}
			title="Employees"
			onData_CLick={this.onData_CLick}
			/>
        </div>
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        employee:state.employee,
    }
  }
export default connect(mapStateToProps,{Get_Parties,Get_Accounts,Get_Works})(Page);
