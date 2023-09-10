

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Employees } from '../../actions/employee';

import CTable from '../../components/Ctable';
import AddEmployee from './addemployee';



class Page extends Component {
    constructor(){
      super();
      this.state = {
          
      }
    }
    componentDidMount(){
        this.props.Get_Employees({limit:10},()=>{});
    }
	onData_CLick = (item)=>{
    this.props.history.push(`/employee/${item.id}`);
	}
  onClickAdd = ()=>{
    this.Show_Add();
  }
  onFetch = (post)=>{
    this.props.Get_Employees(post,()=>{});
  }
    render(){
  return (
     <>
        <div style={{}}>
			<CTable 
          fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"Designation",key:"desigination"},{title:"Balance",key:"balance"}]}
          list={this.props.employee.employees.data}
          data={this.props.employee.employees}
          title="Employees"
          addBtn="Add Employee"
          onData_CLick={this.onData_CLick}
          onAddClick={this.onClickAdd}
          onFetch={this.onFetch}

			/>
        </div>

        <AddEmployee 
      show={call => this.Show_Add = call}

    />
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        employee:state.employee,
    }
  }
export default connect(mapStateToProps,{Get_Employees})(Page);
