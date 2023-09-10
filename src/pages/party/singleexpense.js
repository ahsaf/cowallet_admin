

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Works } from '../../actions/work';

import CTable from '../../components/Ctable';
import { Btn, Edit_Delete_Btns, get_date, LabelData, Tost_Massages, Txt } from '../../components/general';
import { Post } from '../../services/services';
import { Get_Employee_works } from "../../actions/employee";
import { CLRS } from '../../components/constants';
import { Get_Party_Purchases } from '../../actions/party';
import ReactToPrint from 'react-to-print';
import AskConfirm from '../../components/askConfirmModal';
import { toast } from 'react-toastify';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        work:{},
        employee_works:[],
        employee_id:"",
        tab:"All",
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
  onPrint = ()=>{

  }
  onDeleteConfirm = ()=>{
    let url = this.props.location.pathname;
    url = url.split('/');
    const deleteNpoint = "/expense/delete"
    Post(deleteNpoint,{id:url[2]},(st,res)=>{
        if(st){
            toast("Purchase deleted successfully",{type:"success"});
            this.props.history.goBack();
        }else{
            toast(Tost_Massages.wrong,{type:"error"});
        }
       });
}

onEditClick = ()=>{
  this.props.history.push({
      pathname: '/add-purchase',
      state: { data: this.state.work,items:this.state.employee_works,comeBack:true, isSale:this.state.work.isSale?true:false }
  });
}
   

  onClickAdd = ()=>{
    this.Show_Add();
  }
    render(){
      const s = this.state;
      const headerComponent = ()=>{
        return(
          <div style={{padding:16}}  >
                      <div className='fl' style={{justifyContent:"flex-end"}}>
                        <Txt  a="r" s={45} w="700">INVOICE</Txt>
                      </div>
                     
                      <div className='fl' style={{}}>
                          <div className='fldc' style={{flex:1}}>
                              <Txt s={20}>{this.props.user?.user?.permissions?.company_name}</Txt>
                              <Txt>{this.props.user?.user?.permissions?.place}</Txt>
                              {/* <Txt>HIMALAYA</Txt> */}
                          </div>
                          <div className='fldc'>
                            <Txt>DATE: {get_date(s.work.date)}</Txt>
                            <Txt>INVOICE NO: {s.work.id}</Txt>
                          </div>
                      </div>
                      <div className='' style={{marginTop:16}}>
                      <div className='fldc' style={{flex:1}}>
                        <Txt w="500">Bill To:</Txt>
                        <Txt>{s.work.og_party_name}</Txt>
                        <Txt>{s.work.place}</Txt>
                      </div>
                      <div className='fldc' style={{}}>
                        <Txt w="500" mt={16}>Project</Txt>
                        <Txt>{s.work.project_name}</Txt>
                      </div>
                      </div>
                     
                  </div>
        )
      }
  return (
     <>
        <div style={{}}>
            <h2 style={{marginLeft:16,marginBottom:16}}>{s.work.name}</h2>
     

       
          <CTable 
            headerComponent={headerComponent}
            verticalBorder
            boxBorder
            ref={ref => this.print_ref = ref}
            fields= {[{title:"SL NO",key:"slno"},{title:"Description",key:"name"},{title:"Quantity",key:"qty"},{title:"Rate",key:"rate"},{title:"Total",key:"total"}]}
            list={[...this.state.employee_works,{
                tt:true,
                name:"Sub Total",
                total:s.work.total
            }]}
            onAddClick={this.Show_Add_Deposit}
            hide_Search
            hide_pagination
            custome={{
               "name":(item)=>  <td className='leftborder'  style={{fontWeight:item.tt?"bold":"normal"}}>{item.name}</td>,
               "total":(item)=>  <td className='leftborder' style={{fontWeight:item.tt?"bold":"normal"}} >₹{item.total?item.total:item.amount}</td>,
            }}
          /> 
          <div className='fl' style={{justifyContent:"space-between",paddingRight:16}}>
          <ReactToPrint
                trigger={() => {
                  return  (
                        <Btn
                          title="PRINT"
                          wi={100}
                          ml={12}
                      />
                      )
                }}
                content={() => this.print_ref}
              />
                <Edit_Delete_Btns 
                onDeletePress={this.show_delete}
                onEditPress={this.onEditClick}
                
                />
          </div>

        </div>
        <AskConfirm 
                show={call => this.show_delete = call}
                onSubmit={this.onDeleteConfirm}
    />
      
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      work:state.work,
      user:state.user
    }
  }
export default connect(mapStateToProps,{Get_Works})(Page);
