

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Deposits } from '../../actions/work';

import CTable from '../../components/Ctable';
import AddDeposit from './adddeposit';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_Deposits({limit:10},()=>{
        })
    }
    
	onData_CLick = (item)=>{
        this.props.history.push(`/deposit/${item.id}`);
	}
    onClickAdd = ()=>{

    }
    onFetch = (post ={})=>{
        this.props.Get_Deposits(post,()=>{});
    }
    render(){
  return (
     <>
        <div style={{}}>
			<CTable 
        fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"Project",key:"project_name"},{title:"Balance",key:"balance"}]}
        list={this.props.work.deposits.data}
        data={this.props.work.deposits}
        title="FD & BG"
			  onData_CLick={this.onData_CLick}
        onAddClick={this.showAddDeposit}
        addBtn="Add FD&BG"
        onFetch={this.onFetch}
			/>
      
        </div>
        <AddDeposit 
          show={call => this.showAddDeposit = call}
          onSuccess={this.onFetch}
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
export default connect(mapStateToProps,{Get_Deposits})(Page);
