

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Employees } from '../../actions/employee';

import CTable from '../../components/Ctable';
import { Get_Accounts }from '../../actions/accounts'
import { Btn } from '../../components/general';

import AddAccount from '../accounts/addaccount';



class Page extends Component {
    constructor(){
      super();
      this.state = {
          
      }
    }
    componentDidMount(){
        this.props.Get_Accounts({},()=>{

        })
    }
	onData_CLick = (item)=>{
    this.props.history.push(`/account/${item.id}`);
	}
  onClickAdd = ()=>{
    this.Show_Add();
  }
    render(){
        const aa = ["sadas","asdasd","sda","asdasd","sadasdasd","asdadasd"]
  return (
     <>
        <div style={{}}>
            
            <Btn
                title="Add Account"   
                wi={150}
                style={{position:"absolute",right:16,top:76}}
                onClick={this.Show_Add_Account}
            />
            <div  className="row row-sm" style={{marginTop:130}}>
                    <div onClick={this.onData_CLick.bind(this, {id:"hand"})} className="col-xl-3 col-lg-6 col-sm-6 col-md-6">
                        <div className="card text-center">
                            <div className="card-body ">
                                <div className="feature widget-2 text-center mt-0 mb-3">
                                    <i className="ti-bar-chart project bg-primary-transparent mx-auto text-primary "></i>
                                </div>
                                <h6 className="mb-1 text-muted">CASH</h6>
                                <h3 className="font-weight-semibold">₹{this.props.user.user.balance}</h3>
                            </div>
                        </div>
                    </div>
                {this.props.account.list.map(item =>{
                    return(
                        <div onClick={this.onData_CLick.bind(this, {id:item.id})} key={item.id} className="col-xl-3 col-lg-6 col-sm-6 col-md-6">
                        <div className="card text-center">
                            <div className="card-body ">
                                <div className="feature widget-2 text-center mt-0 mb-3">
                                    <i className="ti-bar-chart project bg-primary-transparent mx-auto text-primary "></i>
                                </div>
                                <h6 className="mb-1 text-muted">{item.name}</h6>
                                <h3 className="font-weight-semibold">₹{item.balance}</h3>
                            </div>
                        </div>
                    </div>
                    )
                })}
             
            </div>
        </div>

            <AddAccount
            show={call => this.Show_Add_Account = call}
            
            />
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        account:state.account,
        user:state.user
    }
  }
export default connect(mapStateToProps,{Get_Accounts})(Page);
