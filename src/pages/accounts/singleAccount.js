

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Works } from '../../actions/work';

import CTable from '../../components/Ctable';
import { get_date, LabelData, Edit_Delete_Btns } from '../../components/general';
import { Post } from '../../services/services';
import { Get_Employee_works } from "../../actions/employee";
import { CLRS } from '../../components/constants';
import { Get_Party_Purchases } from '../../actions/party';
import { Get_Account_Transactions } from '../../actions/accounts';
import AskConfirm from '../../components/askConfirmModal';
import store from '../../store';
import EditAccount from './addaccount';
import { toast } from 'react-toastify';
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
          Post('/account/single',{
              account_id:url[2]
          },(st,res)=>{
              this.setState({work:res.data?res.data:{},loading:false,employee_id:url[2]});
          });
          Get_Account_Transactions({
              account_id:url[2],
          },(works)=>{
              this.setState({employee_works:works})
          })
      }
    }
    onDelete = ()=>{
      Post("/user/delete",{id:this.state.work.id},()=>{
        toast("Account deleted successfully");
        this.props.history.goBack();
        store.dispatch({
                type:"DELETE_ACCOUNT",
                payload:this.state.work.id,
        });
     });
    }
	
  onData_CLick = (item)=>{
    if(item.amount){
      this.props.history.push(`/paymentReceit/${item.id}`);
    }
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
                <div className='fl'>
                    <LabelData 
                        label="Balance"
                        data={s.work.balance}
                        fl
                    />
                   <Edit_Delete_Btns
                            onEditPress={()=> this.edit_account(s.work)}
                            onDeletePress={this.show_delete_modal}
                    />
                </div>
                </div>
               
            </div>

       
          <CTable 
            fields= {[{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Type",key:"type"},{title:"Remarks",key:"name"},{title:"Amount",key:"total"}]}
            list={this.state.employee_works}
            title="Transaction History"
            onAddClick={this.Show_Add_Deposit}
            onFilter = {this.onTabChange}
            onData_CLick={this.onData_CLick}
            filter_list = {["All","Purchases","Payments"]}
            custome={{
               "name":(item)=>  <td >{item.total?item.name:item.remarks}</td>,
               "total":(item)=>  <td style={{color:item.total?CLRS.RED:CLRS.GREEN}} >{item.total?item.total:item.amount}</td>,
            }

            }

          />


    

      

        </div>
        <EditAccount 
            show={call => this.edit_account = call}
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
