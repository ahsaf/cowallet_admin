

import React, { Component } from 'react';
import {CInput,get_error_string, Picker, Tost_Massages, Txt } from '../../components/general';
import { Post } from '../../services/services';
import {
    CButton,CModalHeader,CModalTitle,CModal,CModalBody,CModalFooter,CSwitch
    } from '@coreui/react'
import { connect } from 'react-redux';
import { Get_Users } from '../../actions/user';
import { toast } from 'react-toastify';


class Page extends Component {
    constructor(){
        super();
        this.state={
            current_password:"",
            e_current_password:"",
            password1:"",
            password2:"",
            e_password1:"",
            e_password2:"",
            loading:false,
            show_add:false,
        }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
  
    componentDidMount(){
        if(this.props.show){
            this.props.show(this.show_modal);
        }
    }
    show_modal = (client)=>{
        this.setState({
            show_add:true,current_password:"",
            e_current_password:"",
            password1:"",
            password2:"",
            e_password1:"",
            e_password2:""});
      }
    onSubmit = ()=>{
        const s = this.state;
        const e_current_password = get_error_string(s.current_password,"Current Password",6);
        const e_password1 = get_error_string(s.password1,"New Password",6);
        this.setState({e_password1,e_current_password});
        if(!e_current_password && !e_password1 ){
            if(s.password1 !== s.password2){
                this.setState({e_password2:"Passwords must match"})  
            }else{
                this.setState({loading:true});
                const post = {
                    current_password:s.current_password,
                    new_password:s.password1
                }
                Post("/admin/change_password",post,(st,res)=>{
                    if(st){
                        if(res.status === "failed"){
                            this.setState({loading:false,e_current_password:"Invalid current password."});
                        }else{
                           this.clearState();
                           toast("Password updated successfully",{type:"success"});
                        }
                    }else{
                        this.setState({loading:false});
                        toast(Tost_Massages.wrong,{type:"error"});
                    }
                })
            }
         
        }
    }
    clearState = ()=>{
        this.setState({ 
            current_password:"",
            e_current_password:"",
            password1:"",
            password2:"",
            e_password1:"",
            e_password2:"",
            loading:false,
            show_add:false,
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
    <CModalTitle>Change Password</CModalTitle>
  </CModalHeader>
  <CModalBody>
       
      
        <div className='fl'>
            <CInput 
                title="Current Password"
                value={s.current_password}
                onChange={this.onChangeText.bind(this, 'current_password')}
                err={s.e_current_password}
                password
                fl
            />
            <CInput 
                title="New Password"
                value={s.password1}
                onChange={this.onChangeText.bind(this, 'password1')}
                err={s.e_password1}
                password
                ml={8}
                fl
            />
            <CInput 
                title="Confirm Password"
                value={s.password2}
                err={s.e_password2}
                password
                ml={8}
                fl
                onChange={this.onChangeText.bind(this, 'password2')}
            />
        </div>
  </CModalBody>
  <CModalFooter>
      {/* {s.loading?
      <Btn_loading mr={8} mt={4} />:null} */}
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
    }
  }
export default connect(mapStateToProps,{Get_Users})(Page);
