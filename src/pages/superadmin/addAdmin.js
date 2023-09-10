

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Btn, CInput, Picker, Txt,HAND_ACCOUNT, get_error_string  } from '../../components/general';
import { Post } from '../../services/services';
import { PARTY_OPTIONS,ACCOUNT_OPTIONS,EXPENSE_OPTIONS,PROJECT_OPTIONS,EMPLOYEES_OPTIONS,ATTENDANCE_OPTIONS,ADMINISTRATION_OPTIONS, CUSTOMER_OPTIONS, ENTRIES_OPTIONS, ITEMS_OPTIONS } from '../../components/constants';
import {
   CSwitch
    } from '@coreui/react'


class Page extends Component {
    constructor(){
      super();
      this.state = {
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
        place:"",
        role_id:"",
        e_role_id:"",
        company_name:"",
        e_company_name:"",
        active:true,
        loading:false,
        user:{},
        show_add:false,
        id:"",
        admin_id:"",

        project:"Normal",
        employees:"Normal",
        attendance:"Normal",
        party:"Normal",
        expense:"Normal",
        account:"Normal",
        administration:"Normal",
        entries:"Normal",
        customers:"Normal",
        equipment:"Normal",
        item:"Normal"
      }
    }
    componentDidMount(){
      let url = this.props.location.pathname;
      url = url.split('/');
      if(url && url.length > 2){
          Post('/admin/admins',{
              id:url[2]
          },(st,res)=>{
            if(res && res.data && res.data.length){
              const data = res.data[0];
                this.setState({
                  name:data.name,
                  mobile:data.mobile,
                  username:data.username,
                  place:data.place,
                  company_name:data.company_name,
                  active:data.active,
                  project:data.project,
                  employees:data.employees,
                  attendance:data.attendance,
                  party:data.party,
                  expense:data.expense,
                  equipment:data.equipment,
                  account:data.account,
                  administration:data.administration,
                  entries:data.entries,
                  customers:data.customers,
                  id:url[2],
                  admin_id:data.id
                });
            }
          });
      }else{
        this.clear_state();
      }
    }
    onChangeText = (field, value)=>{
      this.setState({[field]:value});
    }
  onSlectItem = (cus)=>{
    this.setState({item:cus,unit_price:String(cus.unit_price)})
  }

  onSubmit = ()=>{
    const s = this.state;
    const e_name = get_error_string(s.name,"Name",3);
    const e_company_name = get_error_string(s.company_name,"Company Name",3);
    const e_username = get_error_string(s.username,"User name",3);
    const e_password1 = s.id?false:get_error_string(s.password1,"Password",6);

    this.setState({e_name,e_password1,e_username,e_company_name})
    if(!e_name && !e_username && !e_password1 && !e_company_name ){
        if(s.password1 !== s.password2 && !s.id){
            this.setState({e_password2:"Passwords must match"})  
        }else{
            this.setState({loading:true});
            const post = {
                name:s.name,
                username:s.username,
                password:s.password1,
                mobile:s.mobile,
                active:s.active,
                id:s.id?s.id:"",
                company_name:s.company_name,
                place:s.place,
                project:s.project,
                employees:s.employees,
                attendance:s.attendance,
                party:s.party,
                expense:s.expense,
                account:s.account,
                administration:s.administration,
                entries:s.entries,
                customers:s.customers,
                equipment:s.equipment,
                admin_id:s.admin_id,
            }
            console.log("AAAA: ", post);
            Post("/admin/create_admin",post,(st,res)=>{
                if(st){
                    if(res.status === "failed"){
                        this.setState({loading:false,e_username:"User name already taken"});
                    }else{
                        this.setState({loading:false,show_add:false});
                        // Tost("Employee added successfully");
                        if(!s.id){
                          this.clear_state();
                        }
                    
                    }
                  
                }else{
                    this.setState({loading:false});
                    
                    // Tost(Tost_Massages.wrong);
                }
            })
        }
     
    }
}
  clear_state = ()=>{
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
      place:"",
      role_id:"",
      e_role_id:"",
      company_name:"",
      e_company_name:"",
      active:true,
      loading:false,
      user:{},
      show_add:false,
      id:"",
      admin_id:"",

      project:"Normal",
      employees:"Normal",
      attendance:"Normal",
      party:"Normal",
      expense:"Normal",
      account:"Normal",
      administration:"Normal",
      entries:"Normal",
      equipment:"Normal",
      customers:"Normal"
    })
  }
    onSelectPicker = (value,field,stateField,list)=>{
      let item = list.find(li => li[field] === Number(value));
      console.log(item)
      this.setState({[stateField]:item});
    }
    
   
  
    render(){
        const s = this.state;
  return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{padding:16}}>
            <h4  class="card-title mg-b-2 mt-2 mb-4" style={{flex:1}}>Add Admin</h4>
            <div className='fl'>
            <CInput
                title="Name"
                fl
                onChange={(a) => this.onChangeText("name",a)}
                value={this.state.name}
                err={s.e_name}
              />
              <CInput
                title="User Name"
                fl
                ml={8}
                value={this.state.username}
                onChange={(a) => this.onChangeText("username",a)}
                err={s.e_username}

              />
                <CInput
                title="Password"
                password
                fl
                ml={8}
                onChange={(a) => this.onChangeText("password1",a)}
                value={this.state.password1}
              />
              <CInput
                title="Confirm Password"
                fl
                password
                ml={8}
                value={this.state.password2}
                err={s.e_password2}
                onChange={(a) => this.onChangeText("password2",a)}

              />
            
            
            
            </div>
            <div className='fl'>
            <CInput
                title="Mobile"
                fl
                number
                onChange={(a) => this.onChangeText("mobile",a)}
                value={this.state.mobile}
              />
              <CInput
                title="Company Name"
                fl
                ml={8}
                value={this.state.company_name}
                onChange={(a) => this.onChangeText("company_name",a)}
                err={s.e_company_name}
              />
                <CInput
                title="Place"
                fl
                ml={8}
                onChange={(a) => this.onChangeText("place",a)}
                value={this.state.place}
              />
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
            
            </div>
            <h4  class="card-title mg-b-2 mt-2 mb-4" style={{flex:1}}>configuration</h4>

            <div className='fl'>
                <Picker
                title="Project"
                list={PROJECT_OPTIONS}
                onSelect={(a) => this.onChangeText("project",a)}
                add_select
                fl
                value={s.project}
              />
                <Picker
                title="Employees"
                list={EMPLOYEES_OPTIONS}
                onSelect={(a) => this.onChangeText("employees",a)}
                add_select
                fl
                ml={8}
                value={s.employees}
              />
                <Picker
                title="Attendance"
                list={ATTENDANCE_OPTIONS}
                onSelect={(a) => this.onChangeText("attendance",a)}
                add_select
                value={s.attendance}
                fl
                ml={8}
              />
                <Picker
                    title="Party"
                    list={PARTY_OPTIONS}
                    onSelect={(a) => this.onChangeText("party",a)}
                    add_select
                value={s.party}

                    fl
                    ml={8}
              />
              
            </div>

            <div className='fl'>
                <Picker
                title="Expense"
                list={EXPENSE_OPTIONS}
                onSelect={(a) => this.onChangeText("expense",a)}
                add_select
                value={s.expense}

                fl
              />
                <Picker
                title="Account"
                list={ACCOUNT_OPTIONS}
                onSelect={(a) => this.onChangeText("account",a)}
                add_select
                value={s.account}
                fl
                ml={8}
              />
                <Picker
                title="Administration"
                list={ADMINISTRATION_OPTIONS}
                onSelect={(a) => this.onChangeText("administration",a)}
                add_select
                value={s.administration}
                fl
                ml={8}
              />
                <Picker
                title="customers"
                list={CUSTOMER_OPTIONS}
                onSelect={(a) => this.onChangeText("customers",a)}
                add_select
                value={s.customers}
                fl
                ml={8}
              />
              
            </div>

            <div className='fl'>
                <Picker
                title="Entries"
                list={ENTRIES_OPTIONS}
                onSelect={(a) => this.onChangeText("entries",a)}
                add_select
                value={s.entries}
                fl
              />
                <Picker
                title="Equipment"
                list={ENTRIES_OPTIONS}
                onSelect={(a) => this.onChangeText("equipment",a)}
                add_select
                value={s.equipment}
                fl
                ml={8}
              />
                  <Picker
                title="Items"
                list={ITEMS_OPTIONS}
                onSelect={(a) => this.onChangeText("item",a)}
                add_select
                value={s.item}
                fl
                ml={8}
              />
              
              <div style={{flex:1,marginLeft:24}} />
              
            </div>

            <Btn
                  wi={100}
                  mt={1}
                  title="SUBMIT"
                  style={{height:38}}
                  onClick={this.onSubmit}
                
                />
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
      inventory:state.inventory,
      party:state.party,
      work:state.work,
      account:state.account
    }
  }
export default connect(mapStateToProps)(Page);
