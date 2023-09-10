

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Inventory } from '../../actions/inventory';

import CTable from '../../components/Ctable';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_Inventory({limit:10},()=>{

        });
    }
	onData_CLick = (item)=>{
        this.props.history.push(`/party/${item.id}`);
	}
  onClickAdd = ()=>{
    this.props.history.push("/add-inventory");
  }
  onFetch = (post)=>{
    this.props.Get_Inventory(post,()=>{});
  }
    render(){
  return (
     <>
        <div style={{}}>
        <CTable 
          fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"}]}
          list={this.props.inventory.inventory.data}
          data={this.props.inventory.inventory}
          title="Inventory"
          onData_CLick={this.onData_CLick}
          onAddClick={this.onClickAdd}
          addBtn="Add Inventory"
          onFetch={this.onFetch}

        />
        </div>
        
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        inventory:state.inventory,
    }
  }
export default connect(mapStateToProps,{Get_Inventory})(Page);
