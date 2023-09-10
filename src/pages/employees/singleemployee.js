

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Works } from '../../actions/work';

import CTable from '../../components/Ctable';
import { Btn, Edit_Delete_Btns, get_date, LabelData } from '../../components/general';
import { Post } from '../../services/services';
import { Get_Employee_works } from "../../actions/employee";
import { CLRS } from '../../components/constants';
import AddEmployee from './addemployee';
import AskConfirm from '../../components/askConfirmModal';
import { toast } from 'react-toastify';
import store from '../../store';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        work:{},
        deposits:[],
        expenses:[],
        employee_works:[],
        employee_id:"",
        tab:"All"

      }
    }
    componentDidMount(){
      this.fetchData();
    }
    fetchData = ()=>{
      let url = this.props.location.pathname;
      url = url.split('/');
      if(url && url.length > 1){
          Post('/user/singleEmployee',{
              id:url[2]
          },(st,res)=>{
              this.setState({work:res.data,loading:false,employee_id:url[2]});
          });
          Get_Employee_works({
              employee_id:url[2],
              type:"all"
          },(works)=>{
              this.setState({employee_works:works})
          })
      }
    }
    
	onData_CLick = (item)=>{
	
    if(item.amount){
      this.props.history.push(`/paymentReceit/${item.id}`);
    }
	}

    onTabChange = (tab)=>{
        if(tab !== this.state.tab){
            this.setState({tab});
            Get_Employee_works({
                employee_id:this.state.employee_id,
                type:tab === "Works"?"work":tab === "Payments"?"pay":"all"
            },(works)=>{
                    this.setState({employee_works:works});
            })
        }
    }
    onDelete = ()=>{
      Post("/user/delete",{id:this.state.work.id},()=>{
        toast("Worker deleted successfully");
        this.props.history.goBack();
        store.dispatch({
                type:"DELETE_EMPLOYEE",
                payload:this.state.work.id,
        });
     });
    }
    onWorkEdit = (item) =>{
      const s = this.state;
      this.props.history.push({
        pathname: '/AddSingleAttendance',
        state: { data: {...item,employee_id:s.work.id,employee_name:s.work.name}, comeBack:true }
      });
    }
    onDeleteWork = (item) =>{
      const employee_works = this.state.employee_works.filter(li => li.id !== item.id || li.amount);
      this.setState({employee_works});
      Post("/employeework/delete",{id:item.id},()=>{
        toast("Work deleted successfully",{type:"success"});
      });
    }


  onClickAdd = ()=>{
    this.Show_Add();
  }
    render(){
      const s = this.state;
  return (
     <>
        <div style={{}}>
            <h2 style={{marginLeft:16,marginBottom:16}}>{s.work.name}</h2>
            <div className="col-xl-12">
				<div className="card" style={{padding:16}}  >
                  
                    <div className='fl' style={{}}>
                        <LabelData 
                            label="Designation"
                            data={s.work.desigination}
                            fl
                        />
                        <LabelData 
                            label="Contact Number"
                            data={s.work.mobile}
                            fl
                        />
                        <Edit_Delete_Btns
                          onEditPress={()=> this.Show_Edit(s.work)}
                          onDeletePress={this.show_delete_modal}
                        
                        />
                    </div>
                    <div className='fl' style={{}}>
                    <LabelData 
                        label="Balance"
                        data={s.work.balance}
                        mt={16}
                        fl
                    />
                     <LabelData 
                        label="Unit Charge"
                        data={s.work.rate}
                        mt={16}
                        mr={48}
                        fl
                    />
                    </div>

                </div>
            </div>

            <div className='fl' style={{marginBottom:16,marginLeft:12}}>
                <Btn onClick={()=> this.props.history.push({
                      pathname: '/AddSingleAttendance',
                      state: { employee: s.work, comeBack:true }
                    })}  
                  title="Add Work" wi={120} />
                <Btn
                onClick={()=> this.props.history.push({
                  pathname: '/out',
                  state: { employee: s.work, comeBack:true, type:"Employee" }
                })} 
                title="Add Payment" ml={8} wi={140} /> 
               
            </div>

       
          <CTable 
            fields= {[{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Project Name / Remarks",key:"name"},
           {title:"Quantity",key:"qty"},{title:"Unit Charge",key:"rate"},{title:"Amount",key:"total"},{title:"Actions",key:"Actions"}]}
            list={this.state.employee_works}
            title="Work History"
            onData_CLick={this.onData_CLick}
            onAddClick={this.Show_Add_Deposit}
            onFilter = {this.onTabChange}
            filter_list = {["All","Works","Payments"]}
            custome={{
               "name":(item)=>  <td >{item.total?item.name:item.remarks}</td>,
               "total":(item)=>  <td style={{color:item.total?CLRS.RED:CLRS.GREEN}} >{item.total?item.total:item.amount}</td>,
               "Actions":(item)=>  <td>
                 {item.total?
                 <Edit_Delete_Btns 
                    onEditPress={()=> this.onWorkEdit(item)}
                    onDeletePress={()=> this.show_work_delete(item)}
                 />:null}
               </td>,
            }}

          />


    

      

        </div>
        <AddEmployee 
      show={call => this.Show_Edit = call}
      onSuccess={this.fetchData}

    />
                <AskConfirm 
                show={call => this.show_delete_modal = call}
                onSubmit={this.onDelete}
    />
              <AskConfirm 
                show={call => this.show_work_delete = call}
                onSubmit={this.onDeleteWork}
    />
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      work:state.work,
    }
  }
export default connect(mapStateToProps,{Get_Works})(Page);
