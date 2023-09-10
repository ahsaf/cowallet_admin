

import React, { Component } from 'react';
import {CInput,get_error_string, Picker, Txt } from '../../components/general';
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
            name:"",
            e_name:"",
            mobile:"",
            balance:"0",
            username:"",
            e_username:"",
            password1:"",
            password2:"",
            e_password1:"",
            e_password2:"",
            role_id:"",
            e_role_id:"",
            active:true,
            loading:false,
            user:{},
            show_add:false,
            id:0
        }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
    onChange2 = (n,v)=>{
        this.setState({[n]:v});
      }
    componentDidMount(){
        if(this.props.show){
            this.props.show(this.show_modal);
        }
    }
    show_modal = (client)=>{
        if(client){
          this.setState({
              show_add:true,
              name:client.name,
              username:client.username,
              mobile:client.mobile,
              id:client.id,
              active:client.active,
              role:client.role,
              id:client.id
        })
        }else{
          this.setState({show_add:true})
        this.clearState();
        }
      
      }
    onSubmit = ()=>{
        const s = this.state;
        const e_name = get_error_string(s.name,"Name",3);
        const e_username = get_error_string(s.username,"User name",3);
        const e_password1 = get_error_string(s.password1,"Password",6);
        const e_role_id = s.role_id && s.role_id !== "Select"?false:"Please select a role"
        this.setState({e_name,e_password1,e_username,e_role_id})
        if(!e_name && !e_username && !e_password1 && !e_role_id ){
            if(s.password1 !== s.password2){
                this.setState({e_password2:"Passwords must match"})  
            }else{
                this.setState({loading:true});
                const post = {
                    name:s.name,
                    username:s.username,
                    password:s.password1,
                    mobile:s.mobile,
                    role_id:s.role_id,
                    active:s.active,
                    id:s.id?s.id:""
                }
                Post("/admin/create_user",post,(st,res)=>{
                    if(st){
                        if(res.status === "failed"){
                            this.setState({loading:false,e_username:"User name already taken"});
                        }else{
                            this.setState({loading:false,show_add:false});
                            toast("User added successfully");
                            this.props.Get_Users({},()=>{});
                            this.clearState();
                        }
                    }else{
                        this.setState({loading:false});
                    }
                })
            }
         
        }
    }
    clearState = ()=>{
        this.setState({ 
            name:"",
            e_name:"",
            mobile:"",
            balance:"0",
            username:"",
            e_username:"",
            password1:"",
            password2:"",
            e_password1:"",
            e_password2:"",
            role_id:"",
            e_role_id:"",
            active:true,
        })
    }
   
    render(){
		const s = this.state;
        const p = this.props;
  return (
     <>
        {/* <div style={{}}>
        <div class="col-md-12 col-xl-12 col-xs-12 col-sm-12">
						<div class="card">
							<div class="card-body">
								<div class="main-content-label mg-b-5">
                                Add Project
								</div>
								<div class="row row-sm">
									<div class="col-lg">
                                    <CInput 
                                        title="Name"
               
                                        />
									</div>
								</div>
							</div>
						</div>
					</div>

	           <h1></h1>
               
              

        </div> */}

<CModal 
  show={this.state.show_add} 
  onClose={() => this.setState({show_add:false})}
  size="lg"
>
  <CModalHeader closeButton>
    <CModalTitle>{s.id?'Edit User':'Add User'}</CModalTitle>
  </CModalHeader>
  <CModalBody>
  <div className='fl'>
  <CInput 
            title="Name"
            value={s.name}
            onChange={this.onChange2.bind(this, 'name')}
            err={s.e_name}
            fl
         />
            <CInput 
                    title="User Name"
                    value={s.username}
                    err={s.e_username}
                    ml={8}
                    fl
                    onChange={this.onChange2.bind(this, 'username')}
        />
        </div>
        <div className='fl'>
        <Picker
                title="Role"
                list={this.props.user.roles}
                onSelect={this.onChange2.bind(this, 'role_id')}
                field="name"
                value_field="id"
                err={this.state.e_role_id}
                add_select
                fl
              />
          <CInput 
                title="Mobile"
                fl
                ml={8}
                value={s.mobile}
                number
                onChange={this.onChange2.bind(this, 'mobile')}
                    />
        </div>
        {s.id?null:
        <div className='fl'>
  <CInput 
            title="Password"
            value={s.password1}
            onChange={this.onChange2.bind(this, 'password1')}
            err={s.e_password1}
            password
            fl
         />
            <CInput 
                    title="Confirm Password"
                    value={s.password2}
                    err={s.e_password2}
                    password
                    ml={8}
                    fl
                    onChange={this.onChange2.bind(this, 'password2')}
        />
        </div>}
        <div  style={{display:'flex',alignItems:'center',flex:1,marginLeft:8}}>

<Txt>Is Active</Txt>
<CSwitch 
className={'mx-1'} 
// shape="pill" 
variant={'3d'} 
size={"sm"} 
color={'primary'} 
checked={s.active} value={s.active} style={{marginLeft:16}} onChange={(e)=> this.setState({active:e.target.checked})} />

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
