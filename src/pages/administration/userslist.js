

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Users,Get_Roles } from '../../actions/user';

import CTable from '../../components/Ctable';
import { Btn, Txt, Edit_Delete_Btns } from '../../components/general';
import Addrole from './addrole';
import AddUser from './adduser';
import { Delete,Edit,AddRounded,AddCircle } from '@material-ui/icons';
import AskConfirm from '../../components/askConfirmModal';
import { Post } from '../../services/services';
import { toast } from 'react-toastify';
import store from '../../store';



class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
      this.props.Get_Roles();
      this.props.Get_Users({},()=>{});
    }
  onDelete = (item)=>{
    Post("/admin/delete-role",{id:item.id},(st,res)=>{
      if(st){
        if(res.status === "failed"){
          alert(`There is ${res.data} users active in this role.`)
        }else{
          this.props.Get_Roles();
        }
      }
    
    });
  }
  onFetch = (post)=>{
    this.props.Get_Users(post,()=>{});
  }

  onDeleteUser = (delUser)=>{
    Post("/user/delete",{id:delUser.id},()=>{
      toast("User deleted successfully");
      store.dispatch({
              type:"DELETE_USER",
              payload:delUser.id,
      });
   });
  }

    render(){
  return (
     <>
        <div >
        <div style={{padding:"0px 16px",marginBottom:40 }}>

      
        <div className="fl" style={{alignItems:"center",marginBottom:16}} >
  <label style={{fontWeight:"700",marginTop:8}} className="page_title">User Roles</label>
  <AddCircle style={{marginLeft:8}} className='point'  onClick={()=> this.Addrole_show()}   />
  {/* <Btn 
            title='Create New Role'
            onClick={()=> this.Addrole_show()}
            wi={150}
          /> */}
  </div>
  <div className="fl" style={{flexWrap:"wrap"}}>
          {this.props.user.roles.map(itd =>{
            const it = itd;
              return(
                <div style={{backgroundColor:'#fff',borderRadius:12,width:250,padding:16,marginRight:16,marginBottom:16}} >
                  <div className="fl">
                  <Txt fl w={500} >{it.name}</Txt>
                  <Edit style={{width:20}} className='point' onClick={()=>{
                        if(this.Addrole_show){
                          this.Addrole_show(it);
                        }           
                        }}
                      />
                        <Delete 
              onClick={()=>{
              this.show_delete_modal(it);
              }}
              style={{width:20,marginLeft:12}} />
                      </div>
                </div>
              )
          })}
  </div>
  </div>

			<CTable 
			fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"User Name",key:"username"},{title:"User Role",key:"role"},{title:"Mobile",key:"mobile"},{title:"Status",key:"status"},{title:"Actions",key:"Actions"}]}
			list={this.props.user.users.data}
      data={this.props.user.users}
			title="Users"
			// onData_CLick={this.onData_CLick}
      addBtn="Add User"
      onAddClick={() => this.AddUser_show()}
      onFetch={this.onFetch}
      custome={{
        "status":(item,index) =>	<td>{item.acitve?"Active":"Inactive"}</td>,
        "Actions":(item,index) =>	<td>
          <Edit_Delete_Btns
           onEditPress={()=> this.AddUser_show(item)}
           onDeletePress={() => this.show_delete_user_modal(item)}
          />
        </td>
      }}
			/>
        </div>
        <Addrole 
        show={call => this.Addrole_show = call}
    />
    <AddUser 
        show={call => this.AddUser_show = call}
    />
     <AskConfirm 
    show={call => this.show_delete_modal = call}
    onSubmit={this.onDelete}
    />
     <AskConfirm 
    show={call => this.show_delete_user_modal = call}
    onSubmit={this.onDeleteUser}
    />
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        user:state.user,
    }
  }
export default connect(mapStateToProps,{Get_Users,Get_Roles})(Page);
