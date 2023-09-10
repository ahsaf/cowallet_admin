

import React, { Component } from 'react';
import { get_error_string } from '../../components/general';
import { login } from '../../actions/user';
import { connect } from 'react-redux';
import { CircularProgress } from "@material-ui/core";
import "./loginStyle.css";
class Page extends Component {
    constructor(){
      super();
      this.state = {
	    	username:"",
            password:"",
            e_username:"",
			error:"",
            e_password:"",
            loading:false
      }
    }
    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value,msg:''});
      }
	onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
	onSubmit = ()=>{
        const s = this.state;
        let e_username = get_error_string(s.username,"User Name",1);    
        let e_password = get_error_string(s.password,"Password",1);   
        this.setState({error:e_username?e_username:e_password?e_password:""});
        if(!e_username && !e_password ){
                this.setState({loading:true});
                const post = {
                    username:s.username,
                    password:s.password
                  }
                  this.props.login(post,(res,data)=>{
					  console.log(data,res)
                    this.setState({loading:false});
                    if(res){	
						this.props.history.push("/dashboard")
                    }else{
                      this.setState({error:"Invalid Username or Password"});
                    }
                  })
        }
    }
    render(){
		const s = this.state;
  return (
     <>
        <div style={{}}>
		<div class="my-auto page page-h loginBackground">
			<div className='blackCover' />
			<div class="main-signin-wrapper">
				<div class="main-card-signin d-md-flex wd-100p">
				<div class="wd-md-50p login d-none d-md-block  p-5 text-white" >
					<div class="my-auto authentication-pages">
						<div>
							<img src={require("../../assets/img/cologo.png")} class=" m-0 mb-4" alt="logo" />
							{/* <h5 class="mb-4">Contractor Plus</h5>
							<p class="mb-5"></p> */}
							{/* <a href="index.html" class="btn btn-success">Learn More</a> */}
						</div>
					</div>
				</div>
				<div class="p-5 wd-md-50p">
					<div class="main-signin-header">
						<h2>Welcome back!</h2>
						<h4>Please sign in to continue</h4>
						<p style={{margin:0,padding:0,color:'red'}}>{s.error?s.error:""}</p>
						<div 
						// action="index.html"
						>
							<div class="form-group">
								<label>User Name</label>
								<input class="form-control" name='username' onChange={this.onChange} placeholder="Enter your user name" type="text" value={s.username} />
							</div>
							<div class="form-group">
								<label>Password</label> 
								<input class="form-control" name='password' onChange={this.onChange} placeholder="Enter your password" type="password" value={s.password} />
							</div>
							<button 
							onClick={this.onSubmit} 
							class="btn btn-main-primary btn-block">
								{s.loading?<CircularProgress 
								size={16} style={{ color: "#fff" }}
								
								/>:"Sign In"}
								
							
							
							</button>
						</div>
					</div>
					{/* <div class="main-signin-footer mt-3 mg-t-5">
						<p><a href="">Forgot password?</a></p>
						<p>Don't have an account? <a href="page-signup.html">Create an Account</a></p>
					</div> */}
				</div>
			</div>
			</div>
		</div>
	
        </div>
    </>
  )
}
}

export default connect(null,{login})(Page);
