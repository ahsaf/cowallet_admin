

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
        party:{},
        e_party:"",
        to_type:"Employee",
        amount:"",
        e_amount:"",
        project:{},
        item:{},
        remarks:"",
        e_remarks:"",
        loading:false,
        account:HAND_ACCOUNT,
        e_account:"",
        date:get_date(new Date(),"YYYY-MM-DD"),
        id:0
      }
    }
    componentDidMount(){
      if(this.props.location && this.props.location.state){
        let updateState = {};
        if(this.props.location.state.employee && this.props.location.state.employee.id){
          updateState.party=setSearchPickerDefaulValue(this.props.location.state.employee);
          updateState.amount=this.props.location.state.employee.balance
        }
        if(this.props.location.state.type){
          updateState.to_type = this.props.location.state.type;
        }
        this.setState(updateState);
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
      party:{},
      e_party:"",
      to_type:"Employee",
      amount:"",
      e_amount:"",
      project:{},
      remarks:"",
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
        const e_party = Check_OBJ_Required_Error(s.party,"id", s.to_type === "Employee"?"Labour":s.to_type);
        this.setState({e_amount,e_remarks,e_account,e_party});
        if(!e_amount && !e_remarks && !e_account && !e_party){
            this.setState({loading:true});
            const post = {
                id:s.id,
                remarks:s.remarks,
                amount:Number(s.amount),
                to_type:s.to_type,
                party_id:s.party && s.party.id?s.party.id:0,
                settlement:true,
                date:this.state.date?new Date(this.state.date):new Date(),
                account_id:GetItemID(s.account),
                project_id:GetItemID(s.project),
            }
            Post("/expense/payout",post,(st,res)=>{
              if(st){
                this.clear_state();
                this.focusParty();
                toast("Payout added successfully",{type: "success"})
                const { comeBack } = getDefaultLocationParams(this.props);
                if(comeBack){
                  this.props.history.goBack();
                }
              }else{
                toast(Tost_Massages.wrong,{type: "error"})
                this.setState({loading:false})
              }
              })
        }
    }
  
    render(){
        const s = this.state;
      const permissions = this.props.user.user && this.props.user.user.permissions?this.props.user.user.permissions:{};

  return (
     <>
         <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{}}>
              <div className='fl' style={{marginBottom:16,backgroundColor:CLRS.RED,overflow:"hidden",alignItems:"center",borderRadius:"6px 6px 0px 0px"}} >
              <h4  class="card-title mg-b-2 mt-3 ml-3 mb-3" style={{flex:1,color:"#FFFFFF"}}>PAYMENT OUT</h4>
              </div>
          <div style={{padding:16}}>
              <RadioBtnCollection 
                list={[{value:"Employee",title:"Labour"},{value:"Party",title:"Party"}]}
                title="Type"
                onSelect={(val) => this.setState({to_type:val.value,party:{}})}
                style={{marginTop:-8,marginBottom:16}}
                value={s.to_type}
              />
            <div className='fl' style={{alignItems:"flex-end"}} >
            <SearchPicker
                title={s.to_type ==="Employee"?"Labour":s.to_type}
                list={s.to_type === "Employee"?this.props.employee?.employees?.data:s.to_type === "Account"?[HAND_ACCOUNT,...this.props.account.list,...this.props.user.admins.data]:this.props.party?.parties?.data}
                AddSelect
                onChange={(a)=> this.onSlectParty(a)}
                value={this.state.party}
                fl
                onEnterPress={this.focusAmout}
                err={s.e_party}
                focus={call => this.focusParty = call}
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
            <SearchPicker
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
            />
               {/* <SearchPicker
                title="Service"
                list={this.props.item.list.data}
                AddSelect
                onChange={(a)=> this.onChangeText("item",a)}
                value={this.state.item}
                fl
                ml={8}
            /> */}
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
                  mt={8}
                  title="SAVE"
                  style={{height:38}}
                  onClick={this.onSubmit}
                
                />
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
      item:state.item,
      employee:state.employee,
      party:state.party,
      work:state.work,
      account:state.account
    }
  }
export default connect(mapStateToProps,{Get_Parties,Get_Accounts,Get_Works,Get_Employees})(Page);
