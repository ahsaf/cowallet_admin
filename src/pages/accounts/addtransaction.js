

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Parties } from '../../actions/party';
import { Get_Employees } from '../../actions/employee';
import { Get_Accounts } from '../../actions/accounts';

import CTable from '../../components/Ctable';
import { Post } from '../../services/services';
import { HAND_ACCOUNT } from '../../components/constants';

class Page extends Component {
    constructor(){
        super();
        this.state={
           to:{},
           e_to:"",
           account:HAND_ACCOUNT,
           to_type:"Employee",
           remarks:"",
           amount:"",
           e_amount:"",
           loading:false,
           date:new Date()
        }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
    componentDidMount(){
        this.props.Get_Employees({},()=>{});
        this.props.Get_Accounts({},()=>{});
        this.props.Get_Parties({},()=>{});
    }

    onSlectItem = (cus)=>{
        this.setState({to:cus,amount:String(cus.balance)})
     
    }
    // onAddnewCustomer = (name)=>{
    //     this.props.navigation.navigate("HomeStack",{params:{name},screen:"AddEmployee"})
    // }

    onSubmit = ()=>{
      const s = this.state;
      let e_to = s.to.id?false:"Choose one";
      let e_amount = s.amount && Number(s.amount) > 0?false:"Enter a valid amount";
      if(e_to || e_amount){
        this.setState({e_to,e_amount});
      }else{
        this.setState({loading:true});
        Post("/account/addtransaction",{
          to:s.to,
          account:s.account,
          to_type:s.to_type,
          amount:Number(s.amount),
          remarks:s.remarks,
          date:s.date
        },(st,res)=>{
          if(st){
            this.setState({loading:false});
            // Tost("Payment Saved Successfully");
            this.clear_state();
          }else{
            // Tost(Tost_Massages.wrong);
          }
        })
      }
    }
    clear_state = ()=>{
      this.setState({
        employee:{},
        e_employee:"",
        remarks:"",
        amount:"",
        e_amount:""
      })
    }
    onDateSelect = (date)=>{
      this.setState({date});
    }

    render(){
  return (
     <>
        <div style={{}}>
			<CTable 
			fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"Designation",key:"desigination"},{title:"Balance",key:"balance"}]}
			list={this.props.employee.employees}
			title="Employees"
			onData_CLick={this.onData_CLick}
			/>
        </div>
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        employee:state.employee,
    }
  }
export default connect(mapStateToProps,{Get_Parties,Get_Accounts,Get_Employees})(Page);
