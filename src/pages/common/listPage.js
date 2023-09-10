

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Get_Project_employee_works } from '../../actions/employee';
import { Get_Project_Expense, Get_Project_Purchases,Get_Project_Incomes } from '../../actions/party';


import CTable from '../../components/Ctable';
import { Post } from '../../services/services';

const CommonListTypes = {
  expense:{
    fields:[{title:"Date",key:"date"},{title:"Description",key:"remarks"},{title:"Amount",key:"amount",money:true}],
    add_btn:"Add Expense",
    title:"Project Expenses"
  },
  purchase:{
    fields:[{title:"Date",key:"date"},{title:"Party Name",key:"party_name"},{title:"Remarks",key:"description"},{title:"Amount",key:"total",money:true}],
    add_btn:"Add Purchase",
    title:"Project Purchases"
  },
  income:{
    fields:[{title:"Date",key:"date"},{title:"Remarks",key:"description"},{title:"Amount",key:"total",money:true}],
    add_btn:"Add Bill",
    title:"Project Bills"
  },
  employee:{
    fields:[{title:"Date",key:"date"},{title:"Worker",key:"name"},
    {title:"Designation",key:"desigination"},{title:"Quantity",key:"qty"},{title:"Unit Charge",key:"rate",money:true},{title:"Amount",key:"total",money:true}],
    add_btn:"Add Labour Work",
    title:"Project Labour"
  }
}


class Page extends Component {
    constructor(){
      super();
      this.state = {
        type:"",
        project_id:"",
        project_name:"",
        loading:true,
        list:{data:[]}
      }
    }
    componentDidMount(){
      let url = this.props.location.pathname;
      url = url.split('/');
      if(url.length > 3){
          this.setState({
            project_id:url[2],
            type:url[3],
          });
          this.fetchData();
      }
    }
    fetchData = ()=>{
      let url = this.props.location.pathname;
      url = url.split('/');
      if(url[3] === "expenses"){
        Get_Project_Expense({
          project_id:url[2],
          limit:10
        },(res)=>{
          this.setState({list:res});
        });
      }else if(url[3] === "purchases"){
        Get_Project_Purchases({
          project_id:url[2],
          limit:10
        },(res)=>{
          this.setState({list:res});
        });
      }else if(url[3] === "labour"){
        Get_Project_employee_works({
          project_id:url[2],
          limit:10
        },(res)=>{
          this.setState({list:res});
        });
      }else if(url[3] === "sales"){
        Get_Project_Incomes({
          project_id:url[2],
          limit:10
        },(res)=>{
          this.setState({list:res});
        });
      }
    }
    

  onClickAdd = ()=>{
    const s = this.state;
    if(s.type === "expenses"){
      this.props.history.push({
        pathname: '/add-expense',
        state: { project: this.state.work, comeBack:true }
      });
    }else if(s.type === "purchases"){
      this.props.history.push({
        pathname: '/add-purchase',
        state: { project: this.state.work, comeBack:true }
      });
    }else if(s.type === "sales"){
      this.props.history.push({
        pathname: '/add-sale',
        state: { project: this.state.work, comeBack:true }
      });
    }else{
      this.props.history.push({
        pathname: '/AddSingleAttendance',
        state: { project: this.state.work, comeBack:true }
      });
    }
  }
  onFetch = (post)=>{
      
  }
  onData_CLick = (item)=>{
    const s = this.state;
    if(s.type === "expenses"){
      this.props.history.push(`/expense/${item.id}`); 
    }else if(s.type === "purchases"){
      this.props.history.push(`/purchase/${item.id}`); 
    }else if(s.type === "sales"){
      this.props.history.push(`/sale/${item.id}`); 
    }
  }



    render(){
      const s = this.state;
      const CurrentType =s.type === "expenses"?CommonListTypes.expense:s.type === "purchases"?CommonListTypes.purchase:s.type ==="labour"?CommonListTypes.employee :s.type ==="sales"?CommonListTypes.income: CommonListTypes.expense;
  return (
     <>
        <div style={{}}>
          <CTable 
            fields= {CurrentType.fields}
            list={s.list?.data}
            data={s.list}
            title={CurrentType.title}
            onData_CLick={this.onData_CLick}
            onFetch={this.onFetch}
            // onAddClick={this.onClickAdd}
            // addBtn={CurrentType.add_btn}

          />
        </div>
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      work:state.work,
    }
  }
export default connect(mapStateToProps)(Page);
