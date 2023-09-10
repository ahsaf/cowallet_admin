

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Admins,Get_Roles } from '../../actions/user';

import CTable from '../../components/Ctable';
import { Btn, Txt, get_date } from '../../components/general';
import { Delete,Edit,AddRounded,AddCircle } from '@material-ui/icons';
import AskConfirm from '../../components/askConfirmModal';
import { Post } from '../../services/services';
class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
      this.props.Get_Admins({},()=>{});
    }
	onData_CLick = (item)=>{
    this.props.history.push(`/add-admin/${item.company_id}`);
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
  AddAdmin = ()=>{
    this.props.history.push("/add-admin");
  }
  onFetch = (post)=>{
    this.props.Get_Admins(post,()=>{});
  }

    render(){
  return (
     <>
        <div >
			<CTable 
                    fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},
                    {title:"User Name",key:"username"},{title:"Company Name",key:"company_name"},
                    {title:"Mobile",key:"mobile"},
                    {title:"Reg.From",key:"created_by"},
                    {title:"Joined At",key:"created_at"},
                    {title:"Status",key:"active"}]}
                    list={this.props.user.admins.data}
                    data={this.props.user.admins}
                    title="Admins"
                    onData_CLick={this.onData_CLick}
                    addBtn="Add Admin"
                    onAddClick={this.AddAdmin}
                    onFetch={this.onFetch}
                    custome={{
                      active:(data)=> 	<td style={{color:data.active?"green":'red' }}>{data.active?"Active":"Inactive"}</td>,
                      created_by:(data)=> 	<td style={{color:data.created_by === "APP"?"green":'#333' }}>{data.created_by}</td>,
                      created_at:(data)=> 	<td style={{color:data.created_by === "APP"?"green":'#333' }}>{get_date(data.created_at)}</td>,
                    }}

			/>
        </div>
     <AskConfirm 
            show={call => this.show_delete_modal = call}
            onSubmit={this.onDelete}
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
export default connect(mapStateToProps,{Get_Admins})(Page);
