

import React, { Component } from 'react';
import { CLRS } from '../../components/constants';
import decode from 'jwt-decode';
import { connect } from 'react-redux';
import { Post } from '../../services/services';
import store from '../../store';
import { Update_user } from '../../actions/user';
import { Link } from 'react-router-dom';
import { Btn } from '../../components/general';
import AskConfirm from '../../components/askConfirmModal';
class Page extends Component {
    constructor(){
      super();
      this.state = {
	    loading:true,
		user:{}
      }
    }
	componentDidMount(){
		let token = localStorage.getItem('token');
		console.log("user:",this.props.user.user)
		if(token){
		  if(this.props.user.user && this.props.user.user.name && this.props.user.role && this.props.user.role.name){
				this.setState({loading:false,user:this.props.user.user.name})
				this.setNavs(this.props.user.role)
		  }else{
			try{
			  let decoded_token = decode(token);
			  console.log(decoded_token);
			  Post("/user/checklogin",{
				id:decoded_token.id,
				token
			},(st,res)=>{
			  if(st){
				if(res.status === "Success"){
				  store.dispatch(
					Update_user({...res,token:token}),
				  );
				this.setState({loading:false,user:{...res,token:token}})
				}else{
				    localStorage.clear();
			 		 this.props.history.push('/login');
				}
			  }else{
				localStorage.clear();
				this.props.history.push('/login');
			  }
			})
			// this.props.Get_user_and_role({
			//   user_id:decoded_token.user_id,
			//   token
			// },(st)=>{
			//   if(st){
			// 	this.setNavs(this.props.user.role)
			// 	this.setState({loading:false,user:this.props.user.user.name})
			//   }else{
			// 	localStorage.clear();
			// 	this.props.history.push('/login');
			//   }
			// })
			}catch (e){
			  localStorage.clear();
			  this.props.history.push('/login');
			}
		  }
	  }else{
			 this.props.history.push('/login');
		}
	}
	onLogout = ()=>{
		localStorage.clear();
		this.props.history.push("/login")
	}
	onNavClick = (screen)=>{
		this.props.history.replace(screen)
	}
    render(){
		const s = this.state;
		const permissions = this.props.user.permissions;
  return (
     <>
        <div style={{}}>
           
		{/* <div id="global-loader">
			<img src="../assets/img/loaders/loader-4.svg" className="loader-img" alt="Loader">
		</div> */}

		<div className="app-sidebar__overlay" data-toggle="sidebar"></div>
		<aside className="main-sidebar app-sidebar sidebar-scroll">
			<div className="main-sidebar-header">
                {/* <h3>Contractor Wallet</h3> */}
				<img src={require("../../assets/img/verticalcologo.png")} style={{height:60}} />
				{/* <a classNam="desktop-logo logo-light active" href="index.html" className="text-center mx-auto"><img src="../assets/img/brand/logo.png" class="main-logo" /></a> */}
				{/* <a class="desktop-logo icon-logo active"href="index.html"><img src="../assets/img/brand/favicon.png" class="logo-icon" /></a> */}
				{/* <a class="desktop-logo logo-dark active" href="index.html"><img src="../assets/img/brand/logo-white.png" class="main-logo dark-theme" alt="logo" /></a> */}
				{/* <a class="logo-icon mobile-logo icon-dark active" href="index.html"><img src="../assets/img/brand/favicon-white.png" class="logo-icon dark-theme" alt="logo" /></a> */}
			</div>
			<div className="main-sidebar-loggedin">
				<div className="app-sidebar__user">
					<div className="dropdown user-pro-body text-center">
						<div className="user-pic">
							{/* <img src="../assets/img/faces/6.jpg" alt="user-img" className="rounded-circle mCS_img_loaded" /> */}
						</div>
						<div className="user-info">
							<h6 className=" mb-0 text-dark">{this.props.user.user.name}</h6>
							<span className="text-muted app-sidebar__user-name text-sm">{permissions.company_name}</span><br />
							<span className="text-muted app-sidebar__user-name text-sm">{permissions.user_role}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="sidebar-navs">
				<ul className="nav  nav-pills-circle">
				{permissions.administration_view?
					<li onClick={() => this.onNavClick("/administration")} className="nav-item point"  data-toggle="tooltip" data-placement="top" title="" data-original-title="Settings" aria-describedby="tooltip365540">
						<a className="nav-link text-center m-2">
							<i className="fe fe-settings"></i>
						</a>
					</li>:null}
					{/* <li className="nav-item" data-toggle="tooltip" data-placement="top" title="" data-original-title="Chat">
						<a className="nav-link text-center m-2">
							<i className="fe fe-mail"></i>
						</a>
					</li> */}
					<li onClick={() => this.onNavClick("/profile")} className="nav-item point" data-toggle="tooltip" data-placement="top" title="" data-original-title="Followers">
						<a className="nav-link text-center m-2">
							<i className="fe fe-user"></i>
						</a>
					</li>
					<li
					onClick={() => this.showlogouConfirm({},true,"Tap yes to logout")}
					
					className="nav-item point" data-toggle="tooltip" data-placement="top" title="" data-original-title="Logout">
						<a className="nav-link text-center m-2"    >
							<i className="fe fe-power"></i>
						</a>
					</li>
				</ul>
			</div>
			<div className="main-sidebar-body">
				<ul className="side-menu ">
				<Link to="/dashboard">
						<li className="slide">
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-airplay"></i><span className="side-menu__label">Dashboard</span></a>
						</li>
						</Link>
						{permissions.project_view?
					<Link to="/projects">
						<li className="slide" style={{cursor:"pointer"}}  >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-grid"></i><span className="side-menu__label">Projects</span></a>
						</li>
					</Link>:null}
					<Link to="/sales">
						<li className="slide" style={{cursor:"pointer"}}  >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-tag"></i><span className="side-menu__label">Payments</span></a>
						</li>
					</Link>
					{/* <Link to="/orders">
						<li className="slide" style={{cursor:"pointer"}}  >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-tag"></i><span className="side-menu__label">Orders</span></a>
						</li>
					</Link> */}
					<Link to="/purchase">
						<li className="slide" style={{cursor:"pointer"}}  >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-shopping-cart"></i><span className="side-menu__label">Purchase</span></a>
						</li>
					</Link>
					<Link to="/expense">
						<li className="slide" style={{cursor:"pointer"}}  >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-dollar-sign"></i><span className="side-menu__label">Expense</span></a>
						</li>
					</Link>
						{/* {permissions.project_view || true?
					<Link to="/inventories">
						<li className="slide" style={{cursor:"pointer"}}  >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-package"></i><span className="side-menu__label">Inventory</span></a>
						</li>
					</Link>:null} */}
						{/* {permissions.entries_view?
					<Link to="/entries">
						<li className="slide" style={{cursor:"pointer"}}  >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-dollar-sign"></i><span className="side-menu__label">Entries</span></a>
						</li>
					</Link>:null} */}
					{permissions.attendance_view?
					<Link to="/attendance">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-calendar"></i><span className="side-menu__label">Attendance</span></a>
						</li>
					</Link>:null}
					{permissions.employees_view?
					<Link to="/employees">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-users"></i><span className="side-menu__label">Employees</span></a>
						</li>
					</Link>:null}
					{/* {permissions.expense_view?
					<Link to="/expenses">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-shopping-cart"></i><span className="side-menu__label">Expenses</span></a>
						</li>
					</Link>:null} */}
					{permissions.party_view?
					<Link to="/parties">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-shopping-bag"></i><span className="side-menu__label">Party</span></a>
						</li>
					</Link>:null}
					{permissions.customers_view?
					<Link to="/customers">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-user"></i><span className="side-menu__label">Customers</span></a>
						</li>
					</Link>:null}
					{permissions.equipment_view?
					<Link to="/tools">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-square"></i><span className="side-menu__label">Tools</span></a>
						</li>
					</Link>:null}
					{permissions.account_view?
					<Link to="/accounts">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-credit-card"></i><span className="side-menu__label">Accounts</span></a>
						</li>
					</Link>:null}
					{permissions.account_view || true?
					<Link to="/deposits">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-shield"></i><span className="side-menu__label">FD & BG</span></a>
						</li>
					</Link>:null}
					{permissions.administration_view || true?
					<Link to="/reports">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-calendar"></i><span className="side-menu__label">Reports</span></a>
						</li>
					</Link>:null}
					{/* {permissions.administration_view?
					<Link to="/administration">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-settings"></i><span className="side-menu__label">Administration</span></a>
						</li>
					</Link>:null} */}
					{this.props.user.user?.type === "SuperAdmin"?
						<Link to="/admins">
						<li className="slide" style={{cursor:"pointer"}}   >
							<a className="side-menu__item" ><i className="side-menu__icon fe fe-settings"></i><span className="side-menu__label">Super Admin</span></a>
						</li>
					</Link>
					
					:null}
				
				
					{/* <li className="slide">
						<a className="side-menu__item" href="icons.html"><i className="side-menu__icon fe fe-award"></i><span className="side-menu__label">Icons</span></a>
					</li> */}
			
				
				</ul>
			</div>
		</aside>
	

		
		 <div style={{}}  >
		 <div className="main-header  side-header">
		
		</div>
        </div> 
		{/* <a href="#top" id="back-to-top"><i className="las la-angle-double-up"></i></a> */}
		
		

        <div style={{marginLeft:260,marginTop:100}}>
	
			{s.loading?<div />:
            this.props.children}
        </div>
		{/* <div className='fl main-header side-header fixed-header' style={{backgroundColor:"#fff",width:"100%",height:63,marginLeft:240,borderBottom:"1px solid #ddd",position:"fixed",top:0,alignItems:"center",zIndex:100}}> */}
		<div className='fl ' style={{backgroundColor:"#fff",width:"100%", paddingRight:260,height:63,marginLeft:240,borderBottom:"1px solid #ddd",position:"fixed",top:0,alignItems:"center",zIndex:100}}>
					<div className='fl' style={{marginLeft:16,flex:1}}>
					{permissions.attendance_create || true?
					<Link to="/in">
						<Btn title="+ CASH IN" wi={120} style={{backgroundColor:CLRS.GREEN}}  />
					</Link>:null}
					{permissions.attendance_create || true?
					<Link to="/out" style={{marginLeft:8}}>
						<Btn title="- CASH OUT" wi={120} style={{backgroundColor:CLRS.RED}}  />
					</Link>:null}
					
				
					</div>
				
					{/* {permissions.attendance_create?
					<Link to="/add-attendance">
							<a className="fl" ><i className="side-menu__icon fe fe-clock" style={{color:"#000"}}></i><span className="side-menu__label">Add Attendance</span></a>
					</Link>:null} */}
					{permissions.attendance_create?
					<Link style={{borderRight:"1px solid #ccc",paddingRight:8}} to="/AddSingleAttendance">
							<a className="fl" ><i className="side-menu__icon fe fe-clock" style={{color:"#000"}}></i><span className="side-menu__label">Add Labour Work</span></a>
					</Link>:null}
					{permissions.expense_create?
					<Link to="/add-sale" style={{borderRight:"1px solid #ccc",paddingRight:8,marginLeft:8}}>
							<a className="fl" ><i className="side-menu__icon fe fe-tag" style={{color:"#000"}}></i><span className="side-menu__label">Add Sale</span></a>
					</Link>:null}
					{permissions.expense_create?
					<Link to="/add-purchase" style={{borderRight:"1px solid #ccc",paddingRight:8,marginLeft:8}}>
							<a className="fl" ><i className="side-menu__icon fe fe-shopping-cart" style={{color:"#000"}}></i><span className="side-menu__label">Add Purchase</span></a>
					</Link>:null}
					{permissions.expense_create?
					<Link to="/add-expense" style={{marginLeft:8}}>
							<a className="fl" ><i className="side-menu__icon fe fe-dollar-sign" style={{color:"#000"}}></i><span className="side-menu__label">Add Expense</span></a>
					</Link>:null}
		</div>
        
        </div>
		<AskConfirm 
			show={call => this.showlogouConfirm = call}	
			onSubmit={this.onLogout}
		/>
    </>
  )
}
}
const mapStateToProps =(state) =>{
	return{
	  user:state.user
	}
  }
export default connect(mapStateToProps)(Page);
