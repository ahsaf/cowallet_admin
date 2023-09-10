

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Expenses } from '../../actions/party';
import { Get_Accounts } from '../../actions/accounts';
import { Get_Works } from '../../actions/work';
import CTable from '../../components/Ctable';
import { Btn, CInput, Picker, Txt,HAND_ACCOUNT, get_error_string  } from '../../components/general';
import { Post } from '../../services/services';
import { Get_Employees } from '../../actions/employee';



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
    componentDidMount(){
        this.props.Get_Employees({},()=>{});
        this.props.Get_Works({},()=>{});
        this.props.Get_Accounts({},()=>{});
    }
    onChangeText = (field, value)=>{
      this.setState({[field]:value});
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
    let e_project = s.project.id?false:"Project Required";
    this.setState({e_project});
    if(!e_project){
      this.setState({loading:true});
      Post("/employeework/create",{
        employees:s.items,
        project:s.project,
        date:s.date,
      },(st,res)=>{
        if(st){
          this.setState({loading:false});
          // Tost("Work Saved Successfully");
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
    onRemoveItem = (item)=>{
      this.setState({items:this.state.items.filter(li => li.id !== item.id),total:this.state.total - Number(item.amount)});
    }

    onSelectPicker = (value,field,stateField,list)=>{
      let item = list.find(li => li[field] === Number(value));
      console.log(item)
      this.setState({[stateField]:item});
    }
    
   
  
    render(){
  return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{padding:16}}>
            <h4  class="card-title mg-b-2 mt-2 mb-4" style={{flex:1}}>Add Labour Work</h4>
            <div className='fl'>
             
              <Picker
                title="Project"
                list={this.props.work.works.data}
                onSelect={(a)=> this.onSelectPicker(a,"id","project",this.props.work.works.data)}
                fl
                add_select
                field="name"
                value_field="id"
                err={this.state.e_project}
              
              />
             
              <CInput
                title="Date"
                fl
                date
                ml={8}
                value={this.state.date}
                onChange={(a) => this.onChangeText("date",a)}


              />
              <div style={{flex:2}} />
            </div> 
            <div className='fl' style={{marginLeft:8}}>
            <Picker
                title="Employee"
                list={this.props.employee.employees.data}
                onSelect={(a)=> this.onSelectPicker(a,"id","employee",this.props.employee.employees.data)}
                field="name"
                value_field="id"
                err={this.state.e_employee}
                add_select
                fl
              />
           
               <CInput
                title="Amount"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("unit_price",a)}
                value={this.state.unit_price}
                err={this.state.e_unit_price}

              />
               <CInput
                title="Quantity"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("qty",a)}
                value={this.state.qty}
                err={this.state.e_qty}

              />
              <div style={{flex:1}}>
                <Btn
                  wi={100}
                  ml={8}
                  mt={25}
                  title="ADD"
                  style={{height:38}}
                  onClick={this.onAddItem}
                
                />
              </div>
              
            </div>
          </div>
        </div>


			<CTable 
                fields= {[{title:"SL NO",key:"slno"},{title:"Employee",key:"item"},{title:"Unit Charge",key:"rate"},{title:"Quantity",key:"qty"},{title:"Total",key:"total"}]}
                list={this.state.items.length?[...this.state.items,{item:"Total",total:this.state.total,totalRow:true}]:[]}
                title="Attendance"
                hide_Search
                hide_pagination
                custome={{
                  "slno":(item,index)=> <th  scope="row">{item.totalRow?"":(index + 1)}</th>,
                  "item":(item,index)=> <th style={{fontWeight:item.totalRow?"bold":"normal"}}  scope="row">{item.employee?.name}</th>,
                  "total":(item,index)=> <th style={{fontWeight:item.totalRow?"bold":"normal"}}  scope="row">{item.total}</th>
                }}
			/>
        <div className='col-xl-12'>
          <div className='card' style={{padding:16}}>
            <div className='fl'>
              <div style={{flex:1}}>
                <Btn
                  wi={100}
                  ml={8}
                  title="SUBMIT"
                  style={{height:38}}
                  onClick={this.onSubmit}
                
                />
              </div>
              
            </div>
          </div>
        </div>
        </div>
        
     
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      user:state.user,
      customer:state.customer,
      inventory:state.inventory,
      employee:state.employee,
      account:state.account,
      work:state.work,
    }
  }
export default connect(mapStateToProps,{Get_Employees,Get_Accounts,Get_Works})(Page);
