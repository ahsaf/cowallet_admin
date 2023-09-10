

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Customers } from '../../actions/customer';
import { Get_Accounts } from '../../actions/accounts';
import { Get_Works } from '../../actions/work';
import CTable from '../../components/Ctable';
import { Btn, CInput, Picker, Txt,HAND_ACCOUNT, get_error_string, CheckBox, get_date, Check_Positive_Number_Error, Check_OBJ_Required_Error, GetItemID, Tost_Massages, setSearchPickerDefaulValue  } from '../../components/general';
import { Post } from '../../services/services';
import SearchPicker from '../../components/SearchPicker';
import { CLRS } from '../../components/constants';
import { toast } from 'react-toastify';
import AddCustomer from '../customers/addcustomer';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        party:{},
        e_party:"",
        remarks:"",
        e_remarks:"",
        amount:"",
        e_amount:"",
        project:{},
        e_project:"",
        loading:false,
        account:HAND_ACCOUNT,
        e_account:"",
        date:get_date(new Date(),"YYYY-MM-DD"),
        id:0,
        projects:[]
      }
    }
    componentDidMount(){
        this.props.Get_Customers({},()=>{});
        this.props.Get_Accounts({},()=>{});
        this.props.Get_Works({},(projects)=>{
          if(projects && projects.data && projects.data.length){
            this.setState({projects:projects.data});
          }
        });
        if(this.props.location && this.props.location.state){
          let updateState = {};
          if(this.props.location.state.party && this.props.location.state.party.id){
            updateState.party=setSearchPickerDefaulValue(this.props.location.state.party);
            updateState.amount=this.props.location.state.party.balance;
          }
          this.setState(updateState);
        }
    }
    onChangeText = (field, value)=>{
      this.setState({[field]:value});
    }
  onSlectItem = (cus)=>{
    this.setState({party:cus,amount:String(cus.balance)})
  }

  clear_state = ()=>{
    this.setState({
        party:{},
        e_party:"",
        remarks:"",
        e_remarks:"",
        amount:"",
        e_amount:"",
        project:{},
        e_project:"",
        loading:false,
        account:HAND_ACCOUNT,
        e_account:"",
        date:get_date(new Date(),"YYYY-MM-DD"),
        id:0
    })
  }
    onSubmit = ()=>{
      const s = this.state;
      const e_amount = Check_Positive_Number_Error(s.amount,"Amount");
      const e_remarks = get_error_string(s.remarks,"Description", 1);
      const e_account = Check_OBJ_Required_Error(s.account,"id", "Account");
      const e_party = Check_OBJ_Required_Error(s.party,"id", "Customer");
      this.setState({e_remarks,e_amount,e_party,e_account});
      if(!e_amount && !e_remarks && !e_party && !e_account ){
        this.setState({loading:true});
            let item = {
                party_id:GetItemID(s.party),
                settlement:true,
                id:s.id,
                remarks:s.remarks,
                amount:Number(s.amount),
                date:this.state.date?new Date(this.state.date):new Date(),
                account_id:GetItemID(s.account),
                project_id:GetItemID(s.project),
            }
            Post("/expense/payreceived",item,(st,res)=>{
              if(st){
                this.clear_state();
                toast("Cash-In added successfully",{type:"success"})
              }else{
                this.setState({loading:false});
                toast(Tost_Massages.wrong,{type:"error"});
              }
            });
      }
    }
    onSlectCustomer = (a)=>{
      this.setState({party:a,project:{}})
    }
    onSlectProject = (a)=>{
      this.setState({party:setSearchPickerDefaulValue({id:a.customer_id,name:a.customer_name}),project:a})
    }
    onAddCustomer = (newCus)=>{
      if(newCus){
        this.setState({
          party:setSearchPickerDefaulValue(newCus)
        })
      }
        this.props.Get_Customers({},()=>{})
    }
    render(){
        const s = this.state;
        let projectstoshow = s.projects;
      if(s.party && s.party.id && s.party.id !== "Select"){
        projectstoshow = projectstoshow.filter(li => li.customer_id === s.party.id);
      }
        return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{}}>
              <div className='fl' style={{marginBottom:16,backgroundColor:CLRS.GREEN,overflow:"hidden",alignItems:"center",borderRadius:"6px 6px 0px 0px"}} >
              <h4  class="card-title mg-b-2 mt-3 ml-3 mb-3" style={{flex:1,color:"#FFFFFF"}}>CASH IN</h4>
              </div>
       
          <div style={{padding:16}}>
            <div className='fl' style={{alignItems:"flex-end"}} >
              <SearchPicker
                title="Customer"
                onAddClick={this.showAddCustomer}
                list={this.props.customer.customers.data}
                AddSelect
                onChange={(a)=> this.onSlectCustomer(a)}
                err={this.state.e_party}
                onEnterPress={this.focusProjectPicker}
                value={this.state.party}
                focus={call => this.focusPartyPicker = call}
                fl
              />
               <SearchPicker
                title="Project"
                list={projectstoshow}
                AddSelect
                onChange={(a)=> this.onSlectProject(a)}
                onEnterPress={this.focusDate}
                value={this.state.project}
                focus={call => this.focusProjectPicker =
                   call}
                fl
                ml={8}
            />
              <CInput
                title="Date"
                fl
                onChange={(a) => this.onChangeText("date",a)}
                value={this.state.date}
                date
                ml={8}
                onEnterPress={this.focusAmount}
                focus={call => this.focusDate = call}
              />
              </div>
          <div className='fl'>
          <CInput
                title="Amount Received"
                number
                fl
                onChange={(a) => this.onChangeText("amount",a)}
                value={this.state.amount}
                err={this.state.e_amount}
                focus={call => this.focusAmount = call}
                onEnterPress={this.focusItemItemname2}
              />
                <CInput
                    title="Description"
                    fl
                    ml={8}
                    onChange={(a) => this.onChangeText("remarks",a)}
                    value={this.state.remarks}
                    err={this.state.e_remarks}
                    focus={call => this.focusItemItemname2 = call}
                    onEnterPress={this.focusAccount}
              />
                 <SearchPicker
                    title="Account"
                    list={[HAND_ACCOUNT,...this.props.account.list]}
                    AddSelect
                    ml={8}
                    onChange={(a)=> this.onChangeText("account",a)}
                    onEnterPress={this.focusPayedAmount}
                    value={this.state.account}
                    focus={call => this.focusAccount = call}
                    fl
                    onEnterPress={this.onSubmit}
                    err={s.e_account}
              />
          </div>
          <Btn
                  wi={100}
                  mt={0}
                  title="SUBMIT"
                  style={{height:38}}
                  onClick={this.onSubmit}
                
                />
          </div>
          </div>
        </div>
        </div>
        <AddCustomer 
            show={call => this.showAddCustomer = call}
            onSuccess={this.onAddCustomer}
        />
     
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      user:state.user,
      customer:state.customer,
      inventory:state.inventory,
      party:state.party,
      work:state.work,
      account:state.account
    }
  }
export default connect(mapStateToProps,{Get_Customers,Get_Accounts,Get_Works})(Page);
