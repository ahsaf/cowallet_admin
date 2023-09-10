

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Parties } from '../../actions/party';
import { Get_Accounts } from '../../actions/accounts';
import { Get_Employees } from '../../actions/employee';
import { Get_Works } from '../../actions/work';
import { Btn, CInput, Txt,HAND_ACCOUNT, get_error_string, CheckBox, get_date, RadioBtnCollection, Check_Positive_Number_Error, Check_OBJ_Required_Error, GetItemID, Tost_Massages, setSearchPickerDefaulValue, getDefaultLocationParams  } from '../../components/general';
import { Post } from '../../services/services';
import SearchPicker from '../../components/SearchPicker';
import { CLRS } from '../../components/constants';
import { toast } from 'react-toastify';


class Page extends Component {
    constructor(){
      super();
      this.state = {
          from:{},
          e_from:"",
          to:{},
          e_to:"",
          project:{},
          remarks:"",
          e_remarks:"",
          amount:"",
          e_amount:"",
          loading:false,
          date:get_date(new Date(),"YYYY-MM-DD"),
          id:0,
          type:""
      }
    }
    componentDidMount(){
      if(this.props.location && this.props.location.state){
        if(this.props.location.state.data && this.props.location.state.data.id){
            console.log("PAYMENTS : ",this.props.location.state.data )
            const data = this.props.location.state.data ;
            this.setState({
                from:setSearchPickerDefaulValue({name:data.user_from_name,id:data.from_id}),
                to:setSearchPickerDefaulValue({name:data.user_to_name,id:data.to_id}),
                project:setSearchPickerDefaulValue({name:data.project_name,id:data.project_id}),
                remarks:data.remarks,
                amount:data.amount,
                type:data.type,
                date:get_date(data.date,"YYYY-MM-DD"),
                id:data.id
            });
        }
      }
        this.props.Get_Parties({},()=>{});
        this.props.Get_Accounts({},()=>{});
        this.props.Get_Employees({},()=>{});
        this.props.Get_Works({},()=>{});
    }
    onChangeText = (field, value)=>{
      this.setState({[field]:value});
    }
  onSlectParty = (cus)=>{
    this.setState({party:cus,amount:String(cus.balance)});
  }



  clear_state = ()=>{
    this.setState({
      from:{},
        e_from:"",
        to:{},
        e_to:"",
        project:{},
        remarks:"",
        e_remarks:"",
        amount:"",
        e_amount:"",
        loading:false,
        date:get_date(new Date(),"YYYY-MM-DD"),
        id:0,
        type:""
    });
  }
    onSubmit = ()=>{
        const s = this.state;
        const e_amount = Check_Positive_Number_Error(s.amount,"Amount");
        const e_remarks = get_error_string(s.remarks,"Description", 1);
        const e_from = Check_OBJ_Required_Error(s.from,"id", "Account");
        const e_to = Check_OBJ_Required_Error(s.to,"id", s.type === "Employee"?"Labour":s.type);
        this.setState({e_amount,e_remarks,e_from,e_to});
        if(!e_amount && !e_remarks && !e_from && !e_to){
            this.setState({loading:true});
            const post = {
                id:s.id,
                to:s.to,
                account:s.from,
                to_type:s.type,
                amount:Number(s.amount),
                remarks:s.remarks,
                date:this.state.date?new Date(this.state.date):new Date(),
            }
            Post("/account/addtransaction",post,(st,res)=>{
              if(st){
                this.clear_state();
                toast("Transaction updated successfully",{type: "success"})
                this.props.history.goBack();
              }else{
                toast(Tost_Massages.wrong,{type: "error"})
                this.setState({loading:false})
              }
              })
        }
    }
  
    render(){
        const s = this.state;
        let fromList = [];
        let toList = [];
        let FromName = "FROM"
        let ToName = "TO"
        if(s.type === "EmployeePayment"){
            fromList = [HAND_ACCOUNT,...this.props.account.list];
            toList = this.props.employee?.employees?.data;
            FromName = "From Account"
            ToName = "Worker"
        }else if(s.type === "PartyPayment"){
            fromList = [HAND_ACCOUNT,...this.props.account.list];
            toList = this.props.party?.parties?.data
            FromName = "From Account"
            ToName = "Party"
        }
  return (
     <>
         <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{}}>
              <div className='fl' style={{marginBottom:0,overflow:"hidden",alignItems:"center",borderRadius:"6px 6px 0px 0px"}} >
                <h4  class="card-title mg-b-2 mt-3 ml-3 mb-3" style={{flex:1,color:"#000"}}>UPDATE TRANSACTION</h4>
              </div>
          <div style={{padding:16}}>
            <div className='fl' style={{alignItems:"flex-end"}} >
            <SearchPicker
                title={FromName}
                list={fromList}
                AddSelect
                onChange={(a)=> this.onChangeText("from",a)}
                value={this.state.from}
                fl
                onEnterPress={this.focusAmout}
                err={s.e_from}
                focus={call => this.focusParty = call}
              />
                <SearchPicker
                title={ToName}
                list={toList}
                AddSelect
                ml={8}
                onChange={(a)=> this.onChangeText("to",a)}
                onEnterPress={this.focusPayedAmount}
                value={this.state.to}
                focus={call => this.focusAccount = call}
                fl
                onEnterPress={this.onSubmit}
                err={s.e_to}
            />
            <CInput
                title="Amount"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("amount",a)}
                value={this.state.amount}
                err={this.state.e_amount}
                focus={call => this.focusAmout = call}
                onEnterPress={this.focusItemItemname2}
              />
           
              </div>
          <div className='fl'>
          <CInput
                title="Date"
                fl
                onChange={(a) => this.onChangeText("date",a)}
                value={this.state.date}
                date
                
                focus={call => this.focusDate = call}
                onEnterPress={this.focusProjectPicker}
              />
            {/* <SearchPicker
                title="Project"
                list={this.props.work.works.data}
                AddSelect
                onChange={(a)=> this.onChangeText("project",a)}
                onEnterPress={this.focusDate}
                value={this.state.project}
                focus={call => this.focusProjectPicker = call}
                fl
                ml={8}
                onEnterPress={this.focusAccount}
            /> */}
                 <CInput
                title="Description"
                fl
                ml={8}
                onChange={(a) => this.onChangeText("remarks",a)}
                value={this.state.remarks}
                err={this.state.e_remarks}
                focus={call => this.focusItemItemname2 = call}
                onEnterPress={this.focusDate}
              />
              <div style={{flex:1,marginLeft:8}}>
              <Btn
                  wi={100}
                  mt={26}
                  title="UPDATE"
                  style={{height:38}}
                  onClick={this.onSubmit}
                />
              </div>
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
      party:state.party,
      work:state.work,
      account:state.account
    }
  }
export default connect(mapStateToProps,{Get_Parties,Get_Accounts,Get_Works,Get_Employees})(Page);
