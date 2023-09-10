

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Expenses } from '../../actions/party';

import CTable from '../../components/Ctable';



class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_Expenses({limit:10},()=>{})
    }
	onData_CLick = (item)=>{
        this.props.history.push(`/expense/${item.id}`);
	}
    onClickAdd = ()=>{
      this.props.history.push("/add-expense");
    }
    onFetch = (post)=>{
        this.props.Get_Expenses(post,()=>{});
    }
    render(){
        
  return (
     <>
        <div style={{}}>
			<CTable 
                fields= {[{title:"SL NO",key:"slno"},{title:"Party Name",key:"party_name"},{title:"Project Name",key:"project_name"},{title:"Amount",key:"total"}]}
                list={this.props.party.expenses.data}
                data={this.props.party.expenses}
                title="Expenses"
                onData_CLick={this.onData_CLick}
                onAddClick={this.onClickAdd}
                addBtn="Add Expense"
                onFetch={this.onFetch}
                

			/>
        </div>
        
     
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        party:state.party,
    }
  }
export default connect(mapStateToProps,{Get_Expenses})(Page);
