

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Works } from '../../actions/work';

import CTable from '../../components/Ctable';
import { get_date, LabelData } from '../../components/general';
import { Post } from '../../services/services';
import { Get_Employee_works } from "../../actions/employee";
import { CLRS } from '../../components/constants';
import { Get_Party_Purchases } from '../../actions/party';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        work:{},
        employee_works:[],
        employee_id:"",
        tab:"All"

      }
    }
    componentDidMount(){
        let url = this.props.location.pathname;
        url = url.split('/');
        if(url && url.length > 1){
            Post('/expense/singleexpense',{
                expense_id:url[2]
            },(st,res)=>{
                this.setState({work:res.data,loading:false,employee_id:url[2],
                    employee_works:res.items
                });
            });
        }
    }
    
	onData_CLick = (item)=>{
		alert(item.id)
	}

   

  onClickAdd = ()=>{
    this.Show_Add();
  }
    render(){
      const s = this.state;
  return (
     <>
        <div style={{}}>
            <h2 style={{marginLeft:16,marginBottom:16}}>{s.work.name}</h2>
            <div className="col-xl-12">
				<div className="card" style={{padding:16}}  >
                    <div className='fl' style={{}}>
                        <LabelData 
                            label="Project"
                            data={s.work.project_name}
                            fl
                        />
                        <LabelData 
                            label="Date"
                            data={get_date(s.work.date)}
                            fl
                        />
                    </div>
                    <div className='fl' style={{marginTop:16}}>
                        <LabelData 
                            label="Party Name"
                            data={s.work.party_name}
                            fl
                        />
                        <LabelData 
                            label="Party Place"
                            data={s.work.place}
                            fl
                        />
                    </div>
                </div>
            </div>

       
          <CTable 
            fields= {[{title:"SL NO",key:"slno"},{title:"Item",key:"name"},{title:"Quantity",key:"qty"},{title:"Rate",key:"rate"},{title:"Total",key:"total"}]}
            list={[...this.state.employee_works,{
                tt:true,
                name:"Sub Total",
                total:s.work.total
            }]}
            hide_Search
            hide_pagination
            title="Paymnet Details"
            onAddClick={this.Show_Add_Deposit}
            custome={{
               "name":(item)=>  <td  style={{fontWeight:item.tt?"bold":"normal"}}>{item.name}</td>,
               "total":(item)=>  <td style={{fontWeight:item.tt?"bold":"normal"}} >₹{item.total?item.total:item.amount}</td>,
            }

            }

          />


    

      

        </div>
      
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
