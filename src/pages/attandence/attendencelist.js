

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_FullAttendece } from '../../actions/employee';

import CTable from '../../components/Ctable';



class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_FullAttendece({limit:10},()=>{})
    }
	onData_CLick = (item)=>{
        this.props.history.push(`/party/${item.id}`);
	}
    onClickAdd = ()=>{
      this.props.history.push("/AddSingleAttendance");
    }
    onFetch = (post)=>{
        this.props.Get_FullAttendece(post,()=>{});
    }
    render(){
        
  return (
     <>
        <div style={{}}>
			    <CTable 
              fields={[{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Employee",key:"employee_name"},{title:"Project Name",key:"name"},
              {title:"Quantity",key:"qty"},{title:"Unit Charge",key:"rate"},{title:"Amount",key:"total"}]}
              list={this.props.employee.fullworks.data}
              data={this.props.employee.fullworks}
              title="LABOUR WORKS"
              onAddClick={this.onClickAdd}
              addBtn="Add Labour Work"
              onFetch={this.onFetch}
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
export default connect(mapStateToProps,{Get_FullAttendece})(Page);
