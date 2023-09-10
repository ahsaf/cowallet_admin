
import React, { Component } from 'react';
import {
CButton,CModalHeader,CModalTitle,CModal,CModalBody,CModalFooter
} from '@coreui/react'
import {connect} from 'react-redux';
import { get_error_string, CInput, Txt } from '../../components/general';
import Inlinecheckbox from '../../components/Inlinecheckbox';
import { Post } from '../../services/services';
import { Get_Roles } from '../../actions/user';

const DeafaultModules = [{name:"Administration",key:"administration",view:false,add:false,delete:false,edit:false},
{name:"Projects",key:"project",view:false,add:false,delete:false,edit:false},
{name:"Employees",key:"employees",view:false,add:false,delete:false,edit:false},
{name:"Party",key:"party",view:false,add:false,delete:false,edit:false},
{name:"Expense",key:"expense",view:false,add:false,delete:false,edit:false},
{name:"Attendance",key:"attendance",view:false,add:false,delete:false,edit:false},
{name:"Customers",key:"customers",view:false,add:false,delete:false,edit:false},
{name:"Entries",key:"entries",view:false,add:false,delete:false,edit:false},
{name:"Accounts",key:"account",view:false,add:false,delete:false,edit:false}]

class cmpnt extends Component {
    constructor(){
        super();
        this.state={
            show_add:false,
            loading:false,
            name:'',
            e_name:'',
            id:'',
            modules:DeafaultModules
        }
    }

    componentDidMount(){
        if(this.props.show){
            this.props.show(this.show_modal);
        }
    }
    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value,msg:'',e_name_msg:''});
      }
      onChange2 = (n,v)=>{
        this.setState({[n]:v});
      }

show_modal = (client)=>{
  if(client){
    let new_modules = this.state.modules;
    new_modules.map(it =>{
            it.view = client[`${it.key}_view`]?true:false;
            it.add = client[`${it.key}_create`]?true:false;
            it.edit = client[`${it.key}_edit`]?true:false;
            it.delete = client[`${it.key}_delete`]?true:false;
    })
    this.setState({
        show_add:true,
        name:client.name,
        id:client.id,
        modules:new_modules
  })
  }else{
    this.setState({show_add:true,id:""});
    this.clear_state();
  }
}

clear_state = ()=>{
  this.setState({
    name:"",
    modules:[{name:"Administration",key:"administration",view:false,add:false,delete:false,edit:false},
    {name:"Projects",key:"project",view:false,add:false,delete:false,edit:false},
    {name:"Employees",key:"employees",view:false,add:false,delete:false,edit:false},
    {name:"Party",key:"party",view:false,add:false,delete:false,edit:false},
    {name:"Expense",key:"expense",view:false,add:false,delete:false,edit:false},
    {name:"Attendance",key:"attendance",view:false,add:false,delete:false,edit:false},
    {name:"Customers",key:"customers",view:false,add:false,delete:false,edit:false},
    {name:"Entries",key:"entries",view:false,add:false,delete:false,edit:false},
    {name:"Accounts",key:"account",view:false,add:false,delete:false,edit:false}]
  })
}
  
onAddSubmit = ()=>{
  const s= this.state;
    let e_name = get_error_string(s.name,'Role Name',3);

    if(e_name){
        this.setState({e_name});
    }else{
        this.setState({loading:true,e_name});
        const post = {
            name:s.name,
            modules:s.modules,
            id:s.id
        }
        Post("/admin/add-role",post,(st,res)=>{
            this.setState({loading:false,show_add:false});
            this.props.Get_Roles();
        })
    }
}
onTick =(id,field,value)=>{
    console.log(`${id} : ${field} : ${value}`)
   let new_module = this.state.modules;
   new_module.map(it =>{
       if(it.key === id){
           it[field] = !value;
       }
   });
   this.setState({modules:new_module})
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
    <CModalTitle>{s.id?'Edit User Role':'Create User Role'}</CModalTitle>
  </CModalHeader>
  <CModalBody>

  <div className='fl'>
          <CInput
          style={{flex:0.5}}
          title='Role Name'
          value={s.name}
          onChange={this.onChange2.bind(this, 'name')}
          err={s.e_name}
          />
        </div>

        <div>
           <div className="fl">
                <Txt w={500} s={16} style={{flex:2}} >Module</Txt>
                <Txt w={500} s={16} style={{}} fl>View</Txt>
                <Txt w={500} s={16} fl>Add </Txt>
                <Txt w={500} s={16} fl>Edit</Txt>
                <Txt w={500} s={16} fl>Delete</Txt>
           </div>
           {s.modules.map(it =>{
               return(
                <Inlinecheckbox 
                name={it.name}
                view={it.view}
                add={it.add}
                delete={it.delete}
                edit={it.edit}
                onChange={(feild,value)=>{
                    this.onTick(it.key,feild,value);
                }}
                 />
               )
           })}
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
    onClick={this.onAddSubmit} color="primary" >Submit</CButton>
  </CModalFooter>
 
</CModal>

    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      user:state.user
    }
  }
export default connect(mapStateToProps,{Get_Roles})(cmpnt);







  