

import React, { Component } from 'react';
import {CInput,get_error_string, Txt,Picker, get_date, Check_OBJ_Required_Error, CheckPositiveNumberReturnZero, GetItemID, GetAccountID } from '../../components/general';
import { Post } from '../../services/services';
import {
    CButton,CModalHeader,CModalTitle,CModal,CModalBody,CModalFooter,CSwitch
    } from '@coreui/react'
import { Get_Accounts } from "../../actions/accounts";
import { Get_Works } from "../../actions/work";
import { connect } from 'react-redux';
import { HAND_ACCOUNT } from '../../components/constants';
import SearchPicker from '../../components/SearchPicker';
import { toast } from 'react-toastify';

class Page extends Component {
    constructor(){
        super();
        this.state={
            name:"",
            e_name:"",
            loading:false,
            account:{},
            project:{},
            e_project:"",
            amount:"",
            e_amount:"",
            remarks:"",
            start_date:get_date(new Date(),"YYYY-MM-DD"),
            end_date:get_date(new Date(),"YYYY-MM-DD"),
            show_add:false
        }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
    onChange2 = (n,v)=>{
        this.setState({[n]:v});
      }
    onPayedTick = (current)=>{
        if(current){
          this.setState({tender:false})
        }else{
          this.setState({tender:true})
        }
    }
    componentDidMount(){
        this.props.Get_Accounts({},()=>{})
        this.props.Get_Works({},()=>{})
        if(this.props.show){
            this.props.show(this.show_modal);
        }
    }
    show_modal = (client)=>{
        // if(client){
        //   this.setState({
        //       show_add:true,
        //       name:client.name,
        //       email:client.email,
        //       id:client.id,
        //       active:client.active,
        //       role:client.role
        // })
        // }else{
          this.setState({show_add:true})
        // this.clear_state();
        // }
      
      }
      onSubmit = ()=>{
        const s = this.state;
        const e_name = get_error_string(s.name,"Name",3);
        const e_amount = Number(s.balance) > 0?false:"Invalid Amount";
        const e_project = Check_OBJ_Required_Error(s.project,"id","Project");
        this.setState({e_name,e_amount,e_project})
        if(!e_name && !e_amount && !e_project){
            this.setState({loading:true});
            const post = {
                name:s.name,
                amount:CheckPositiveNumberReturnZero(s.amount),
                account_id:GetAccountID(s.account),
                project_id:GetItemID(s.project), 
                date:s.start_date,
                end_date:s.end_date,
                remarks:s.remarks,
            }
            Post('/project/addDeposit',post,(st,res)=>{
                if(st){
                  toast("Deposit added successfully",{type:"success"});
                    this.clearState();
                }else{
                    this.setState({loading:false});
                }
            });
        }
    }
    clearState = ()=>{
        this.setState({ 
            name:"",
            e_name:"",
            mobile:"",
            balance:"",
            place:"",
            loading:false,
            account:{},
            date:new Date(),
            show_add:false
        })
    }
   
    render(){
		const s = this.state;
        const p = this.props;
  return (
     <>
          <CModal 
            show={this.state.show_add} 
            onClose={() => this.setState({show_add:false})}
            size="lg"
          >
            <CModalHeader closeButton>
              <CModalTitle>{s.id?'Edit Deposit':'Add Deposit'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <div className='fl'>
                        <SearchPicker
                          title="Account"
                          list={[HAND_ACCOUNT,...this.props.account.list]}
                          AddSelect
                          onChange={(a)=> this.onChangeText("account",a)}
                          onEnterPress={this.focusPayedAmount}
                          value={this.state.account}
                          fl
              />
                     <SearchPicker
                        title="Project"
                        list={this.props.work.works.data}
                        onChange={(a)=> this.onChangeText("project",a)}
                        fl
                        err={this.state.e_project}
                        ml={8}
                        focus={call => this.focusProject = call}
                        onEnterPress={this.focusBillNumber}
                        value={this.state.project}
              />
              </div>
               
                  <div className='fl'>
                  <CInput 
                      title="Name"
                      value={s.name}
                      onChange={this.onChange2.bind(this, 'name')}
                      err={s.e_name}
                      fl
                  />
                    <CInput 
                      title="Amount"
                      fl
                      ml={8}
                      number
                      value={s.balance}
                      err={s.e_amount}
                      onChange={this.onChange2.bind(this, 'balance')}
                  />
                
                  </div>
                  <div className='fl'>
                  <CInput 
                              title="Deposit Date"
                              value={s.start_date}
                              onChange={this.onChange2.bind(this, 'start_date')}
                              date
                              fl
                  />
                  <CInput 
                              title="End Date"
                              value={s.end_date}
                              onChange={this.onChange2.bind(this, 'end_date')}
                              date
                              fl
                              ml={8}
                  />
                
                  </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" 
              onClick={()=>{
                this.clear_state();
              }}
              >Clear</CButton>{' '}
              <CButton 
              disabled={s.loading}
              onClick={this.onSubmit} color="primary" >Submit</CButton>
            </CModalFooter>
          </CModal>
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      user:state.user,
      account:state.account,
      work:state.work
    }
  }
export default connect(mapStateToProps,{Get_Accounts,Get_Works})(Page);

