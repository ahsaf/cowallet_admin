

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Get_All_Purchase } from '../../actions/party';
import CTable from '../../components/Ctable';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_All_Purchase({
          limit:10
        },()=>{})
    }
    
	onData_CLick = (item)=>{
        this.props.history.push(`/purchase/${item.id}`);
	}

    onClickAdd = ()=>{
        this.props.history.push(`/add-purchase`);
    }
    onFetch = (post = {limit:10})=>{
        this.props.Get_All_Purchase(post,()=>{});
    }

    render(){
      const s = this.state;
  return (
     <>
        <div style={{}}>
          <CTable 
            fields= {[{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Description",key:"description"},{title:"Project",key:"project_name"},{title:"Amount",key:"total",money:true}]}
            list={this.props.party.all_purchase.data}
            data={this.props.party.all_purchase}
            title="Purchases"
            onData_CLick={this.onData_CLick}
            onFetch={this.onFetch}
            onAddClick={this.onClickAdd}
            addBtn="Add Purchase"
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
export default connect(mapStateToProps,{Get_All_Purchase})(Page);
