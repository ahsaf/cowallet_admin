

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Get_Works } from '../../actions/work';
import CTable from '../../components/Ctable';
import { Btn, Edit_Delete_Btns, get_date, setNumberFormat, Tost_Massages, Txt } from '../../components/general';
import { Post } from '../../services/services';
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
        tab:"All"

      }
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData = ()=>{
        let url = this.props.location.pathname;
        url = url.split('/');
        if(url && url.length > 1){
            Post('/account/singleTransaction',{
                id:url[2]
            },(st,res)=>{
                this.setState({work:res.data,loading:false});
            })
        }
    }
    
	onData_CLick = (item)=>{
		alert(item.id)
	}
    onEditClick = ()=>{
        this.props.history.push({
            pathname: '/edit-transaction',
            state: { data: this.state.work, comeBack:true }
        });
    }


    onDeleteConfirm = ()=>{
        let url = this.props.location.pathname;
        url = url.split('/');
        Post("/account/deleteTransaction",{id:url[2]},(st,res)=>{
            if(st){
                toast("Transaction deleted successfully",{type:"success"});
                this.props.history.goBack();
            }else{
                toast(Tost_Massages.wrong,{type:"error"});
            }
           });
    
    }
  onClickAdd = ()=>{
    this.Show_Add();
  }
    render(){
      const s = this.state;
      console.log(s.work)
  return (
     <>
        <div style={{}}>

            <div 
                 ref={ref => this.print_ref = ref}
            className='card' style={{padding:16,marginRight:16}}>
                <div style={{border:"1px solid rgba(0,0,200,0.2)",padding:16}}>
                    <div className='fl'>
                        <div className='fldc' style={{flex:1}}>
                            <Txt  s={28} w="500">PAYMENT RECEIPT</Txt>
                            <Txt   >ATAAT</Txt>
                            <Txt   >Kottakkal</Txt>
                        </div>
                       
                        <div style={{width:200}}>
                            <div className='fl'>
                                <Txt fl>No</Txt>
                                <Txt fl>: {s.work.id}</Txt>
                            </div>
                            <div className='fl'>
                                <Txt fl >Date</Txt>
                                <Txt fl >: {get_date(s.work.date)}</Txt>
                            </div>
                        </div>
                    </div>
                    <div className='fl topborder' style={{marginTop:8,paddingTop:16}}>
                        <div className='fldc' style={{flex:1}}>
                            <Txt c="thrd">Receved From</Txt>
                            <Txt>{s.work.user_from_name}</Txt>
                        </div>
                        <div style={{width:200}} className='fldc'>
                            <Txt>Amount</Txt>
                            <Txt s={34} w="500"> {setNumberFormat(s.work.amount)} </Txt>
                        </div>
                       
                        
                    </div>

                    <div className='fl ' style={{marginTop:8,paddingTop:16}}>
                        <div className='fldc' style={{flex:1}}>
                            <Txt c="thrd">Payed To</Txt>
                            <Txt>{s.work.user_to_name}</Txt>
                        </div>
                      
                       
                        
                    </div>
                    {s.work.project_name?
                    <div className='fl ' style={{marginTop:8,paddingTop:16}}>
                        <div className='fldc' style={{flex:1}}>
                            <Txt c="thrd">Project</Txt>
                            <Txt>{s.work.project_name}</Txt>
                        </div>
                    </div>:null}
                    <div className='fl ' style={{marginTop:8,paddingTop:16}}>
                        <div className='fldc' style={{flex:1}}>
                            <Txt c="thrd">Payment For</Txt>
                            <Txt>{s.work.remarks?s.work.remarks:"-"}</Txt>
                        </div>
                        <div style={{width:200}} className='fldc'>
                            <Txt mt={16} c="thrd">Authorised Signatory</Txt>
                            <Txt s={34} w="500">  </Txt>
                        </div>
                    </div>
                </div>
            </div>
     

       
          {/* <CTable 
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
          />  */}
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
