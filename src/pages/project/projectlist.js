

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Works } from '../../actions/work';

import CTable from '../../components/Ctable';
import AddProject from './addproject';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_Works({
          limit:10
        },()=>{})
    }
    
	onData_CLick = (item)=>{
    this.props.history.push(`/project/${item.id}`);
	}

  onClickAdd = ()=>{
    this.Show_Add();
  }
  onFetch = (post = {limit:10})=>{
    this.props.Get_Works(post,()=>{});
  }

    render(){
      const s = this.state;
  return (
     <>
        <div style={{}}>
          <CTable 
            fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"Customer Name",key:"customer_name"}]}
            list={this.props.work.works.data}
            data={this.props.work.works}
            title="Projects"
            onData_CLick={this.onData_CLick}
            onFetch={this.onFetch}
            onAddClick={this.onClickAdd}
            addBtn="Add Project"

          />
        </div>
        <AddProject 
          show={call => this.Show_Add = call}
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
export default connect(mapStateToProps,{Get_Works})(Page);
