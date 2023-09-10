

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_All_Expenses } from '../../actions/party';

import CTable from '../../components/Ctable';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_All_Expenses({
          limit:10
        },()=>{})
    }
    
	onData_CLick = (item)=>{
    this.props.history.push(`/expense/${item.id}`);
	}

  onClickAdd = ()=>{
    this.props.history.push(`/add-expense`);
  }
  onFetch = (post = {limit:10})=>{
    this.props.Get_All_Expenses(post,()=>{});
  }

    render(){
      const s = this.state;
  return (
     <>
        <div style={{}}>
          <CTable 
            fields= {[{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Description",key:"remarks"},{title:"Amount",key:"amount",money:true}]}
            list={this.props.party.all_expense.data}
            data={this.props.party.all_expense}
            title="Expense"
            onData_CLick={this.onData_CLick}
            onFetch={this.onFetch}
            onAddClick={this.onClickAdd}
            addBtn="Add Expense"

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
export default connect(mapStateToProps,{Get_All_Expenses})(Page);
