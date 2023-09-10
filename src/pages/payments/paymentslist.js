

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Payments } from '../../actions/party';
import { CLRS } from '../../components/constants';

import CTable from '../../components/Ctable';



class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_Payments({limit:10},()=>{})
    }
	onData_CLick = (item)=>{
        this.props.history.push(`/party/${item.id}`);
	}
    onClickAdd = ()=>{
      this.props.history.push("/add-attendance");
    }
    onFetch = (post)=>{
        this.props.Get_Payments(post,()=>{});
    }
    render(){
        // const fields = [{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"From",key:"user_from_name"},{title:"To",key:"user_to_name"},
        // {title:"Type",key:"type"},{title:"Remarks",key:"remarks"},{title:"Amount",key:"amount"}]    
        const fields = [{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Party",key:"party"},
        {title:"Description",key:"remarks"},{title:"You Gave",key:"yougave"},{title:"You got",key:"yougot"}] ;
        const custome = {
            "party":(item, index)=> <td key={index}>{item.type === "PartyCollection" || item.type === "Collection"?item.user_from_name:item.user_to_name}</td>,
            "yougave":(item, index)=> <td key={index} style={{color:CLRS.RED}}>{item.type === "PartyCollection"  || item.type === "Collection"?"":item.amount}</td>,
            "yougot":(item, index)=> <td key={index} style={{color:CLRS.GREEN}}>{item.type === "PartyCollection"  || item.type === "Collection"?item.amount:""}</td>,
        }  
  return (
     <>
        <div style={{}}>
			<CTable 
                 fields= {fields}
                list={this.props.party.payments.data}
                data={this.props.party.payments}
                title="Entries"
                // onData_CLick={this.onData_CLick}
                onAddClick={this.onClickAdd}
                // addBtn="Add Attendance"
                onFetch={this.onFetch}
                custome={custome}
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
export default connect(mapStateToProps,{Get_Payments})(Page);
