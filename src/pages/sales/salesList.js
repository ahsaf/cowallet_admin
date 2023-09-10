

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Get_All_Sales } from '../../actions/party';
import CTable from '../../components/Ctable';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_All_Sales({
          limit:10,
          project_id:1
        },()=>{})
    }
    
	onData_CLick = (item)=>{
    this.props.history.push(`/sale/${item.id}`);
	}

  onClickAdd = ()=>{
    this.props.history.push(`/add-sale`);
  }
  onFetch = (post = {limit:10})=>{
    this.props.Get_All_Sales(post,()=>{});
  }

    render(){
      const s = this.state;
  return (
     <>
        <div style={{}}>
          <CTable 
            fields= {[{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Description",key:"description"},{title:"Project",key:"project_name"},{title:"Amount",key:"total",money:true}]}
            list={this.props.party.all_sales.data}
            data={this.props.party.all_sales}
            title="Payments"
            onData_CLick={this.onData_CLick}
            onFetch={this.onFetch}
            onAddClick={this.onClickAdd}
            addBtn="Generate Bill"

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
export default connect(mapStateToProps,{Get_All_Sales})(Page);
