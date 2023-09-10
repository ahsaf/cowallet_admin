

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Customers } from '../../actions/customer';

import CTable from '../../components/Ctable';
import AddCustomer from './addcustomer';



class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_Customers({limit:10},()=>{

        })
    }
	onData_CLick = (item)=>{
    this.props.history.push(`/customer/${item.id}`);
	}
  onClickAdd = ()=>{
    this.Show_Add();
  }
  onFetch = (post)=>{
    this.props.Get_Customers(post,()=>{});
  }
    render(){
  return (
     <>
        <div style={{}}>
			<CTable 
			fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"Place",key:"place"},{title:"Balance",key:"balance"}]}
			list={this.props.customer.customers.data}
			data={this.props.customer.customers}
			title="Customers"
			onData_CLick={this.onData_CLick}
      onAddClick={this.onClickAdd}
      addBtn="Add Customer"
      onFetch={this.onFetch}


			/>
        </div>
        
        <AddCustomer 
            show={call => this.Show_Add = call}
            onSuccess={() => this.onFetch({limit:10})}
        />
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        customer:state.customer,
    }
  }
export default connect(mapStateToProps,{Get_Customers})(Page);
