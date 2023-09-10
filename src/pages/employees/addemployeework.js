

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Employees } from '../../actions/employee';
import { Get_Accounts } from '../../actions/accounts';
import CTable from '../../components/Ctable';
import { Get_Works } from '../../actions/work';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        employee:{},
        e_employee:"",
        qty:"1",
        e_qty:"",
        unit_price:"",
        e_unit_price:"",
        project:{},
        e_project:"",
        loading:false,
        date:new Date(),
        payed:false,
        payed_amount:"",
        account:{
          name:"From Hand",
          id:"hand"
        },
        e_account:"",
        total:0,
        total_payed:0,
        items:[]
      }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
    componentDidMount(){
        this.props.Get_Employees({},()=>{});
        this.props.Get_Accounts({},()=>{});
        this.props.Get_Works({},()=>{});
        this.unsubscribe = this.props.navigation.addListener('focus', this.onFocus)
        this.setState({
          account:{
            name:"From Hand",
            id:"hand",
          }
        })
    }
    onFocus = ()=>{
      const customer = this.props.route.params?this.props.route.params.customer:false;
      if(customer){
          this.setState({customer})
      }
    }
    componentWillUnmount(){
      this.unsubscribe();
    }
    onSlectItem = (cus)=>{
        this.setState({employee:cus,unit_price:cus.rate?String(cus.rate):""});
        let timer11 = setTimeout(()=>{
          this.Focdus_QTY()
        },100)
    }
    onAddnewCustomer = (name)=>{
        this.props.navigation.navigate("HomeStack",{params:{name},screen:"AddCustomer"})
    }
    onPayedTick = (current)=>{
      if(current){
        this.setState({payed:false})
      }else{
        const s = this.state;
        this.setState({payed:true,payed_amount:String(Number(s.qty) * Number(s.unit_price))})
      }
  }

    onSubmit = ()=>{
      const s = this.state;
      let e_project = s.project.id?false:"Project Required";
      this.setState({e_project});
      if(!e_project){
        this.setState({loading:true});
        console.log(s.items);
        console.log(s.project);
        console.log(s.date);
        Post("/employeework/create",{
          employees:s.items,
          project:s.project,
          date:s.date,
        },(st,res)=>{
          if(st){
            this.setState({loading:false});
            Tost("Work Saved Successfully");
            this.clear_state();
          }else{
            Tost(Tost_Massages.wrong);
          }
        })
      }
    }


    clear_state = ()=>{
      this.setState({
        employee:{},
           e_employee:"",
           qty:"1",
           e_qty:"",
           unit_price:"",
           e_unit_price:"",
           project:{},
           e_project:"",
           loading:false,
           date:new Date(),
           payed:false,
           payed_amount:"",
           account:{
             name:"From Hand",
             id:"hand"
           },
           e_account:"",
           total:0,
           items:[]
      })
    }
    onRemoveItem = (item)=>{
      this.setState({items:this.state.items.filter(li => li.id !== item.id),total:this.state.total - Number(item.total),
        total_payed:this.state.total_payed - (item.payed && Number(item.payed_amount)?Number(item.payed_amount):0)
      });
    }


    onDateSelect = (date)=>{
      this.setState({date});
    }
    onAddEmployee = ()=>{
      const s = this.state;
      let e_employee = s.employee.id?false:"Please choose a employee";
      let e_account = s.payed?s.account.id?false:"Please choose a account":false;
      let e_qty = Number(s.qty) &&Number(s.qty) > 0?false:"Enter a valid quantity"; 
      let e_unit_price = Number(s.unit_price) && Number(s.unit_price) > 0?false:"Enter a valid unit charge"; 
      this.setState({e_employee,e_account,e_qty,e_unit_price});
      if(!e_employee && !e_account && !e_qty && !e_unit_price ){
        let items = s.items;
        let nw_item = {
          id:Math.random(),
          employee:s.employee,
          qty:Number(s.qty),
          rate:Number(s.unit_price),
          payed:s.payed,
          account:s.account,
          total:Number(s.qty) * Number(s.unit_price),
          payed_amount:Number(s.payed_amount)
        }
        let already = items.find(li => li.employee.id === s.employee.id);
        if(already){
          this.setState({e_employee:"Employee is already added"})
        }else{
          this.setState({items:[...items,nw_item],total:s.total + nw_item.total,
            total_payed:s.total_payed + (nw_item.payed && Number(s.payed_amount)?Number(s.payed_amount):0),
          qty:"1",
          unit_price:"",
          payed_amount:"",
          employee:{},
          payed:false
          
          })
        }
      }
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
export default connect(mapStateToProps,{Get_Employees,Get_Accounts,Get_Works})(Page);
