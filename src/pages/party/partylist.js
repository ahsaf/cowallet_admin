

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Parties } from '../../actions/party';

import CTable from '../../components/Ctable';
import AddParty from './addparty';



class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.props.Get_Parties({limit:10},()=>{

        })
    }
	onData_CLick = (item)=>{
    this.props.history.push(`/party/${item.id}`);
	}
  onClickAdd = ()=>{
    this.Show_Add();
  }
  onFetch = (post)=>{
    this.props.Get_Parties(post,()=>{});
  }
    render(){
  return (
     <>
        <div style={{}}>
			<CTable 
			fields= {[{title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"Place",key:"place"},{title:"Balance",key:"balance"}]}
			list={this.props.party.parties.data}
			data={this.props.party.parties}
			title="Parties"
			onData_CLick={this.onData_CLick}
      onAddClick={this.onClickAdd}
      addBtn="Add Party"
      onFetch={this.onFetch}


			/>
        </div>
        
        <AddParty 
            show={call => this.Show_Add = call}
        />
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        party:state.party,
    }
  }
export default connect(mapStateToProps,{Get_Parties})(Page);
