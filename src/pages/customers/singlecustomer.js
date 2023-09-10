

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Works } from '../../actions/work';

import CTable from '../../components/Ctable';
import { Btn, Edit_Delete_Btns, get_date, LabelData } from '../../components/general';
import { Post } from '../../services/services';
import { Get_Employee_works } from "../../actions/employee";
import { CLRS } from '../../components/constants';
import { Get_Party_Purchases } from '../../actions/party';
import AddCustomer from './addcustomer';
import { toast } from 'react-toastify';
import store from '../../store';
import AskConfirm from '../../components/askConfirmModal';



class Page extends Component {
    constructor(){
      super();
      this.state = {
        work:{},
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
          Post('/user/singleParty',{
              id:url[2]
          },(st,res)=>{
              this.setState({work:res.data,loading:false,employee_id:url[2]});
          });
          Get_Party_Purchases({
              party_id:url[2],
              type:"all"
          },(works)=>{
              this.setState({employee_works:works})
          })
      }
    }
    
	// onData_CLick = (item)=>{
  //       this.props.history.push(`/sale/${item.id}`);
	// }
  onData_CLick = (item)=>{
    if(item.amount){
      this.props.history.push(`/paymentReceit/${item.id}`);
    }else{
      this.props.history.push(`/sale/${item.id}`);
    }
	}

  onDelete = ()=>{
    Post("/user/delete",{id:this.state.work.id},()=>{
      toast("Customer deleted successfully");
      this.props.history.goBack();
      store.dispatch({
              type:"DELETE_CUSTOMER",
              payload:this.state.work.id,
      });
   });
  }

    onTabChange = (tab)=>{
        if(tab !== this.state.tab){
            this.setState({tab});
            Get_Party_Purchases({
                party_id:this.state.employee_id,
                type:tab === "Purchases"?"purchase":tab === "Payments"?"pay":"all"
            },(works)=>{
                    this.setState({employee_works:works});
            })
        }
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
                            label="Place"
                            data={s.work.place}
                            fl
                        />
                        <LabelData 
                            label="Contact Number"
                            data={s.work.mobile}
                            fl
                        />
                        <Edit_Delete_Btns
                              onEditPress={()=> this.edit_customer(s.work)}
                              onDeletePress={this.show_delete_modal}
                        />
                    </div>
                    <LabelData 
                        label="Balance"
                        data={s.work.balance}
                        mt={16}
                    />
                </div>
            </div>
            <div className='fl' style={{marginBottom:16,marginLeft:12}}>
                <Btn onClick={()=> this.props.history.push({
                      pathname: '/add-sale',
                      state: { party: s.work, comeBack:true }
                    })}  
                  title="Add Payment" wi={120} />
                <Btn
                onClick={()=> this.props.history.push({
                  pathname: '/in',
                  state: { party: s.work, comeBack:true, }
                })} 
                title="Add Payment" ml={8} wi={140} /> 
               
            </div>
       
          <CTable 
            fields= {[{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Project Name / Remarks",key:"name"},{title:"Amount",key:"total"}]}
            list={this.state.employee_works}
            title="Sales History"
            onData_CLick={this.onData_CLick}
            onAddClick={this.Show_Add_Deposit}
            onFilter = {this.onTabChange}
            filter_list = {["All","Purchases","Payments"]}
            custome={{
               "name":(item)=>  <td >{item.total?item.name:item.remarks}</td>,
               "total":(item)=>  <td style={{color:item.total?CLRS.RED:CLRS.GREEN}} >{item.total?item.total:item.amount}</td>,
            }

            }

          />
        </div>
        <AddCustomer 
            show={call => this.edit_customer = call}
            onSuccess={this.fetchData}
        />
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
      work:state.work,
    }
  }
export default connect(mapStateToProps,{Get_Works})(Page);
