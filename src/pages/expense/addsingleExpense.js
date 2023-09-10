

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Parties } from '../../actions/party';
import { Get_Accounts } from '../../actions/accounts';
import { Get_Works } from '../../actions/work';
import CTable from '../../components/Ctable';
import { Btn, CInput, Picker, Txt,HAND_ACCOUNT, get_error_string, CheckBox, get_date, Check_Positive_Number_Error,GetItemID, Check_OBJ_Required_Error, Tost_Massages, setSearchPickerDefaulValue  } from '../../components/general';
import { Post } from '../../services/services';
import SearchPicker from '../../components/SearchPicker';
import { CLRS } from '../../components/constants';
import { toast } from 'react-toastify';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        amount:"",
        e_amount:"",
        remarks:"",
        e_remarks:"",
        project:{},
        loading:false,
        account:HAND_ACCOUNT,
        date:get_date(new Date(),"YYYY-MM-DD"),
        id:0,
        item:{}
      }
    }
    componentDidMount(){
      if(this.props.location && this.props.location.state){
        let updateState = {};
        if(this.props.location.state.project && this.props.location.state.project.id){
          updateState.project=setSearchPickerDefaulValue(this.props.location.state.project);
        }
        this.setState(updateState);
      }
       this.props.Get_Accounts({},()=>{});
    }
    onChangeText = (field, value)=>{
      this.setState({[field]:value});
    }

  clear_state = ()=>{
    this.setState({
        amount:"",
        e_amount:"",
        remarks:"",
        e_remarks:"",
        project:{},
        loading:false,
        account:HAND_ACCOUNT,
        id:0
    })
  }
    onSubmit = ()=>{
        const s = this.state;
        const e_amount = Check_Positive_Number_Error(s.amount,"Amount");
        const e_remarks = get_error_string(s.remarks,"Description", 1);
        const e_account = Check_OBJ_Required_Error(s.account,"id", "Account");

        this.setState({e_amount,e_remarks,e_account});
        if(!e_amount && !e_remarks && !e_account){
            this.setState({loading:true});
            const post = {
                id:s.id,
                remarks:s.remarks,
                amount:Number(s.amount),
                to_type:"Expense",
                date:this.state.date?new Date(this.state.date):new Date(),
                account_id:GetItemID(s.account),
                item_id:GetItemID(s.item),
                project_id:GetItemID(s.project),
            }
            Post("/expense/payout",post,(st,res)=>{
              if(st){
                this.clear_state();
                toast("Expense added successfully",{type: "success"})
              }else{
                toast(Tost_Massages.wrong,{type: "error"})
                this.setState({loading:false})
              }
              })
        }

    }
  
    render(){
      const permissions = this.props.user.user && this.props.user.user.permissions?this.props.user.user.permissions:{};

  return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{}}>
              <div className='fl' style={{marginBottom:16,backgroundColor:CLRS.RED,overflow:"hidden",alignItems:"center",borderRadius:"6px 6px 0px 0px"}} >
              <h4  class="card-title mg-b-2 mt-3 ml-3 mb-3" style={{flex:1,color:"#FFFFFF"}}>Add Expense</h4>
              </div>
          <div style={{padding:16}}>
            <div className='fl' style={{alignItems:"flex-end"}} >
                <CInput
                title="Amount"
                number
                fl
                onChange={(a) => this.onChangeText("amount",a)}
                value={this.state.amount}
                err={this.state.e_amount}
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
               <CInput
                title="Date"
                fl
                onChange={(a) => this.onChangeText("date",a)}
                value={this.state.date}
                date
                ml={8}
                focus={call => this.focusDate = call}
                onEnterPress={this.focusProjectPicker}
              />

              </div>
          <div className='fl'>
          <SearchPicker
                title="Project"
                list={this.props.work.works.data}
                AddSelect
                onChange={(a)=> this.onChangeText("project",a)}
                onEnterPress={this.focusDate}
                value={this.state.project}
                focus={call => this.focusProjectPicker = call}
                fl
                onEnterPress={this.focusAccount}
              />
              {permissions.project === "Service"?
          <SearchPicker
                title="Service"
                list={this.props.item.list.data}
                AddSelect
                onChange={(a)=> this.onChangeText("item",a)}
                value={this.state.item}
                fl
                ml={8}
              />:null}
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
              />
             
              <div style={{flex:1}}>
                <Btn
                  wi={100}
                  ml={8}
                  mt={25}
                  title="SAVE"
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
      item:state.item,
      party:state.party,
      work:state.work,
      account:state.account
    }
  }
export default connect(mapStateToProps,{Get_Parties,Get_Accounts,Get_Works})(Page);
