

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Accounts } from '../../actions/accounts';
import { Get_Works } from '../../actions/work';
import { Btn, CInput, Check_OBJ_Required_Error, CheckBox, get_date, 
  Check_Positive_Number_Error, CheckPositiveNumberReturnZero, Tost_Massages,setSearchPickerDefaulValue, 
  getDefaultLocationParams,  
  LabelData,
  LabelDataBold,
  GetItemID} from '../../components/general';
import { Post } from '../../services/services';
import { Get_Employees } from '../../actions/employee';
import SearchPicker from '../../components/SearchPicker';
import { toast } from 'react-toastify';
import { HAND_ACCOUNT } from '../../components/constants';
import AddEmplooye from '../employees/addemployee';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        employee:{},
        item:{},
        e_employee:"",
        qty:"1",
        e_qty:"",
        unit_price:"",
        e_unit_price:"",
        project:{},
        e_project:"",
        loading:false,
        date:get_date(new Date(),"YYYY-MM-DD"),
        payed:false,
        payed_amount:"",
        account:{
          name:"From Hand",
          id:"hand"
        },
        e_account:"",
        id:0
      }
    }
    componentDidMount(){
      console.log("DATA: " , this.props.location)
      if(this.props.location && this.props.location.state){
        let updateState = {};
        if(this.props.location.state.employee && this.props.location.state.employee.id){
          updateState.employee=setSearchPickerDefaulValue(this.props.location.state.employee);
          updateState.unit_price=this.props.location.state.employee.rate
        }
        if(this.props.location.state.project && this.props.location.state.project.id){
          updateState.project=setSearchPickerDefaulValue(this.props.location.state.project);
        }
        if(this.props.location.state.data && this.props.location.state.data.id){
          console.log("EMPLOYEE DATA: ", this.props.location.state.data);
          updateState.employee=setSearchPickerDefaulValue({id:this.props.location.state.data.employee_id,name:this.props.location.state.data.employee_name});
          updateState.project=setSearchPickerDefaulValue({id:this.props.location.state.data.project_id,name:this.props.location.state.data.name});
          updateState.qty=this.props.location.state.data.qty;
          updateState.date=get_date(this.props.location.state.data.date,"YYYY-MM-DD") ;
          updateState.unit_price=this.props.location.state.data.rate;
          updateState.id=this.props.location.state.data.id;
        }
        this.setState(updateState);
      }
        this.props.Get_Employees({},()=>{});
        this.props.Get_Works({},()=>{});
        this.props.Get_Accounts({},()=>{});
    }
    onChangeText = (field, value)=>{
      this.setState({[field]:value});
    }
  onSlectItem = (cus)=>{
    this.setState({employee:cus,unit_price:String(cus.rate)})
  }
  onAddEmployee = (newCus)=>{
    if(newCus){
      this.setState({
        employee:setSearchPickerDefaulValue(newCus)
      })
    }
      this.props.Get_Employees({},()=>{})
  }
  onAddItem = ()=>{
    const s = this.state;
    let e_employee = Check_OBJ_Required_Error(s.employee,"id","Employee");
    let e_account = s.payed?Check_OBJ_Required_Error(s.account,"id","Account"):false;
    let e_qty = Check_Positive_Number_Error(s.qty,"Quantity");
    let e_unit_price = Check_Positive_Number_Error(s.qty,"Unit Charge");
    this.setState({e_employee,e_account,e_qty,e_unit_price});
    if(!e_employee && !e_account && !e_qty && !e_unit_price ){
      this.setState({loading:true})
      let nw_item = {
        employee_id:s.employee.id,
        qty:Number(s.qty),
        rate:Number(s.unit_price),
        project_id:s.project && s.project.id && s.project.id !== "Select"?s.project.id:0,
        date:s.date,
        account_id:s.account && s.account.id?s.account.id:0,
        payed:s.payed,
        payed_amount:CheckPositiveNumberReturnZero(s.payed_amount),
        item_id:GetItemID(s.item)
      };
      if(s.id){
        nw_item.id = s.id;
        nw_item.total = Number(s.qty) * Number(s.unit_price);
        delete nw_item.account_id;
        delete nw_item.payed;
        delete nw_item.payed_amount;
      }
        const npoint_link = s.id?"/employeework/update":"/employeework/createSingle"
      Post(npoint_link,nw_item,(st,res)=>{
        this.setState({loading:false});
        if(st){
          if(s.id){
            toast("Work Updated Successfully",{type:"success"});
          }else{
            toast("Work Added Successfully",{type:"success"});
          }
          this.setState({
            employee:{},
            e_employee:"",
            qty:"1",
            e_qty:"",
            unit_price:"",
            e_unit_price:"",
            project:{},
            e_project:"",
            payed:false,
            payed_amount:"",
            account:{
              name:"From Hand",
              id:"hand"
            },
            e_account:"",
          });
          const { comeBack } = getDefaultLocationParams(this.props);
          if(comeBack){
            this.props.history.goBack();
          }
        }else{
          toast(Tost_Massages.wrong,{type:"error"});
        }
      });
    
    }
    }
  
    render(){
      const s = this.state;
      const total = this.state.qty * this.state.unit_price ;
      const permissions = this.props.user.user && this.props.user.user.permissions?this.props.user.user.permissions:{};
  return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{padding:16}}>
            <h4  class="card-title mg-b-2 mt-2 mb-4" style={{flex:1}}>{s.id?"Update":"Add"} Labour Work</h4>
            <div className='fl'>
            <SearchPicker
                title="Worker"
                list={this.props.employee.employees.data}
                AddSelect
                onChange={(a)=> this.onSlectItem(a)}
                err={this.state.e_employee}
                onEnterPress={this.focusProjectPicker}
                value={this.state.employee}
                onAddClick={s.id?null:this.showAddEmployee}
                fl
              />
              <SearchPicker
                title="Project"
                list={this.props.work.works.data}
                AddSelect
                ml={8}
                onChange={(a)=> this.onChangeText("project",a)}
                onEnterPress={this.focusDate}
                value={this.state.project}
                focus={call => this.focusProjectPicker = call}
                fl
              />
                {permissions.employees === "Service"?
                 <SearchPicker
                    title="Service"
                    list={this.props.item.list.data}
                    AddSelect
                    ml={8}
                    onChange={(a)=> this.onChangeText("item",a)}
                    onEnterPress={this.focusDate}
                    value={this.state.item}
                    fl
              />:null}
              <CInput
                title="Date"
                fl
                date
                ml={8}
                value={this.state.date}
                focus={call => this.focusDate = call}
                onChange={(a) => this.onChangeText("date",a)}
                onEnterPress={this.focusAmount}
              />
              {/* <div style={{flex:1}} /> */}
            </div> 

            <div className='fl' style={{marginLeft:0}}>
               <CInput
                title="Amount"
                number
                fl
                onChange={(a) => this.onChangeText("unit_price",a)}
                value={this.state.unit_price}
                err={this.state.e_unit_price}
                focus={call => this.focusAmount = call}
                onEnterPress={this.focusQTY}
              />
               <CInput
                title="Quantity"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("qty",a)}
                value={this.state.qty}
                err={this.state.e_qty}
                focus={call => this.focusQTY = call}

              />
                <LabelDataBold 
                      label="Total"
                      money
                      fl
                      data={total}
                      ml={8}
                      mt={2}
                    />
            </div>
            {s.id?null:
            <CheckBox title="Payed" onChange={(value)=> this.setState({payed:!this.state.payed,payed_amount:total})} value={this.state.payed} />}
            {this.state.payed?
            <div className='fl' style={{marginTop:16}}>
              <SearchPicker
                title="Account"
                list={[HAND_ACCOUNT,...this.props.account.list]}
                AddSelect
                onChange={(a)=> this.onChangeText("account",a)}
                onEnterPress={this.focusPayedAmount}
                value={this.state.account}
                fl
              />
              <CInput
                title="Payed Amount"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("payed_amount",a)}
                value={this.state.payed_amount}
                focus={call => this.focusPayedAmount = call}
                onEnterPress={this.focusQTY}
              />
                    <div style={{flex:1}} />
            </div>:null}
            <Btn
                  wi={100}
                  mt={this.state.payed || s.id?0:24}
                  title={s.id?"UPDATE":"SAVE"}
                  style={{height:38}}
                  onClick={this.onAddItem}
                  loading={this.state.loading}
                
                />
          </div>
        </div>
        </div>
        
     <AddEmplooye
                 show={call => this.showAddEmployee = call}
                 onSuccess={this.onAddEmployee}
     
     />
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      user:state.user,
      customer:state.customer,
      item:state.item,
      employee:state.employee,
      account:state.account,
      work:state.work,
    }
  }
export default connect(mapStateToProps,{Get_Employees,Get_Accounts,Get_Works})(Page);
