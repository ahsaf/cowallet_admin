import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Works } from '../../actions/work';

import CTable from '../../components/Ctable';
import { CardTitle, get_date, LabelData, setNumberFormat, Txt, Edit_Delete_Btns, UnderLineText } from '../../components/general';
import { Post } from '../../services/services';
import { Get_Project_Expense, Get_Project_Incomes, Get_Project_Purchases} from '../../actions/party';
import { Get_Project_employee_works } from '../../actions/employee';
import { Get_Project_Equipments } from '../../actions/equipment';
import AddDeposit from '../deposit/adddeposit';
import StatisticsCard from './projectComponents/StatisticsCard';
import AssignTool from '../tools/assignTool';
import ReturnTool from '../tools/returnTool';
import AddProject from './addproject';
import AskConfirm from '../../components/askConfirmModal';
import store from '../../store';
import { toast } from 'react-toastify';
import { CLRS } from '../../components/constants';
import AddDocument from './addDocument';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        work:{},
        deposits:[],
        documents:[],
        expenses:[],
        purchases:[],
        income:[],
        employee_works:[],
        project_id:"",
        equipments:[],
        projectReportUrl:"",
        reportLoading:false
      }
    }
    componentDidMount(){
        let url = this.props.location.pathname;
        url = url.split('/');
        if(url && url.length > 1){
            this.fetchProjectDetails();
            Get_Project_Expense({
                project_id:url[2],
                limit:5
            },(list)=>{
                this.setState({expenses:list.data});
            })
            Get_Project_Incomes({
                project_id:url[2],
                limit:5
            },(list)=>{
                this.setState({income:list.data});
            })
            Get_Project_employee_works({
                project_id:url[2],
                limit:5
            },(list)=>{
                this.setState({employee_works:list.data});
            })
            Get_Project_Purchases({
                project_id:url[2],
                limit:5
            },(list)=>{
                this.setState({purchases:list.data});
            })
           this.get_tools();
        }
    }
    fetchProjectDetails = ()=>{
        let url = this.props.location.pathname;
        url = url.split('/');
        Post('/project/single',{
            id:url[2]
        },(st,res)=>{
            this.setState({work:res.data,loading:false,documents:res.documents,deposits:res.deposits,project_id:url[2]});
        });
    }
    get_tools = ()=>{
        let url = this.props.location.pathname;
        url = url.split('/');
        Get_Project_Equipments({
            project_id:url[2],
            limit:50
        },(list)=>{
            this.setState({equipments:list});
        })
    }

	onSingleExpenseClick = (item)=>{
        this.props.history.push(`/expense/${item.id}`);   
	}
    onSinglePurchaseClick = (item)=>{
        this.props.history.push(`/purchase/${item.id}`);
	}
    onSingleBillClick = (item)=>{
        this.props.history.push(`/sale/${item.id}`);
	}
  onClickAdd = ()=>{
    this.Show_Add();
  }
  onAddLabourWork = ()=>{
    this.props.history.push({
        pathname: '/AddSingleAttendance',
        state: { project: this.state.work, comeBack:true }
      });
  }
  onAddExpense = ()=>{
    this.props.history.push({
        pathname: '/add-expense',
        state: { project: this.state.work, comeBack:true }
      });
  }
  onAddPurchase = ()=>{
    this.props.history.push({
        pathname: '/add-purchase',
        state: { project: this.state.work, comeBack:true }
      });
  }
  onAddSale = ()=>{
    this.props.history.push({
        pathname: '/add-sale',
        state: { project: this.state.work, comeBack:true }
      });
  }
  onDelete = ()=>{
    Post("/project/delete",{id:this.state.work.id},()=>{
        toast("Project deleted successfully");
        this.props.history.goBack();
        store.dispatch({
                type:"DELETE_PROJECT",
                payload:this.state.work.id,
        });
     });  
  }
  onProjectReportDownload = () =>{
    if(this.state.projectReportUrl){
        window.open(this.state.projectReportUrl, '_blank', 'noopener,noreferrer');
    }else{
        this.getProjectReport((url)=>{
            window.open(url, '_blank', 'noopener,noreferrer');
        })
    }
   
  }
   getProjectReport = (cb)=>{
    this.setState({reportLoading:true})
    Post("/project/projectReportPdf",{
        "project_id":this.state.work.id
    },(st,res)=>{
        this.setState({reportLoading:false})
        if(st && res && res.status === "Success" && res.url){
            this.setState({projectReportUrl:res.url});
            cb(res.url);
        }
    });
}

    render(){
      const s = this.state;
      const work = this.state.work?this.state.work:{};
      const profit = work.total_income -work.total_expense;
      const permissions = this.props.user.user && this.props.user.user.permissions?this.props.user.user.permissions:{};
  return (
     <>
        <div style={{}}>
            <div className='fl' style={{justifyContent:"flex-end",alignItems:"flex-end",marginBottom:16}}>
                <h2 style={{marginLeft:16,flex:1}}>{s.work.name}</h2>
                <div style={{marginRight:16,marginBottom:12}}>
                    <UnderLineText onClick={this.onAddLabourWork} value="Add Labour Work" />
                    <UnderLineText ml={16} onClick={this.onAddExpense} value="Add Expense" />
                    <UnderLineText ml={16} onClick={this.onAddPurchase} value="Add Purchase" />
                    <UnderLineText ml={16} onClick={this.onAddSale} value="Add Sale" />
                </div>
            </div>
            
            <div className='fl mb-2 ml-2 mr-2' >
                <StatisticsCard icon={require("../../assets/img/income.png")} title="Total Income" value={work.total_income} />
                <StatisticsCard icon={require("../../assets/img/expense.png")} title="Total Expense" value={work.total_expense} />
                <StatisticsCard icon={require("../../assets/img/profit.png")} title="Profit" value={profit} />
            </div>

            <div className='fl'>
                    <div style={{flex:2}}>
                        <CTable 
                            fields= {[{title:"Date",key:"date"},{title:"Description",key:"remarks"},{title:"Amount",key:"amount",money:true}]}
                            list={this.state.expenses}
                            title="Expenses"
                            hide_pagination
                            on_view_all_press ={()=> this.props.history.push(`/project/${s.project_id}/expenses`)}
                            hide_Search
                            onData_CLick={this.onSingleExpenseClick}
                         />
                        <CTable 
                            fields= {[{title:"Date",key:"date"},{title:"Party Name",key:"party_name"},{title:"Remarks",key:"description"},{title:"Amount",key:"total",money:true}]}
                            list={this.state.purchases}
                            title="Purchases"
                            hide_pagination
                            on_view_all_press ={()=> this.props.history.push(`/project/${s.project_id}/purchases`)}
                            hide_Search
                            onData_CLick={this.onSinglePurchaseClick}
                         />
                        <CTable 
                           fields= {[{title:"Date",key:"date"},{title:"Worker",key:"name"},
                           {title:"Designation",key:"desigination"},{title:"Quantity",key:"qty"},{title:"Unit Charge",key:"rate",money:true},{title:"Amount",key:"total",money:true}]}
                            list={this.state.employee_works}
                            title="Labour"
                            hide_pagination
                            hide_Search
                            onAddClick={this.onClickAdd}
                            on_view_all_press ={()=> this.props.history.push(`/project/${s.project_id}/labour`)}
                         />

                        <CTable 
                            fields= {[{title:"Date",key:"date"},
                            {title:"Remarks",key:"description"},{title:"Amount",key:"total",money:true}]}
                            list={this.state.income}
                            title="Income"
                            hide_pagination
                            hide_Search
                            onData_CLick={this.onSingleBillClick}
                            on_view_all_press ={()=> this.props.history.push(`/project/${s.project_id}/sales`)}
                         />

                    </div>
                    
                    <div style={{flex:1,paddingRight:16,marginLeft:8}}>
                        <div style={{backgroundColor:"#FFF",padding:8,borderRadius:6}}>
                            <div className='fl'> 
                                <CardTitle fl title="About" />
                                <Edit_Delete_Btns style={{marginTop:8}} onEditPress={() => this.EditProject(s.work)} onDeletePress={this.show_delete_modal}  />
                            </div>
                            
                        <LabelData 
                            label="Description"
                            data={s.work.description}
                            mt={12}
                        />
                          <LabelData 
                            label="Customer Name"
                            data={s.work.customer_name}
                            fl
                            mt={12}
                        />
                        <LabelData 
                            label="Customer Mobile"
                            data={s.work.customer_phone}
                            fl
                            mt={12}
                        />
                         <LabelData 
                            label="Estimated Amount"
                            data={s.work.estimated_amount}
                            fl
                            mt={12}
                        />
                          {s.work.tender_end && s.work.tender?
                        <LabelData 
                            label="Agreement Date"
                            data={get_date(s.work.tender_start)}
                            fl
                            mt={12}

                        />:null}
                        {s.work.tender_end && s.work.tender?
                        <LabelData 
                            label="Completion Date"
                            data={get_date(s.work.tender_end)}
                            fl
                            mt={12}

                        />:null}
                        {s.work.tender_time?
                        <LabelData 
                            label="Completion Time"
                            data={`${s.work.tender_time} Months`}
                            fl
                            mt={12}
                        />:null}
                        {s.work.dlp_period?
                        <LabelData 
                            label="DLP Period"
                            data={`${s.work.dlp_period} Years`}
                            fl
                            mt={12}

                        />:null}
                         <LabelData 
                            label="Project Created At"
                            data={get_date(s.work.created_at)}
                            fl
                            mt={12}
                            />
                        {s.work.completed_date?
                        <LabelData 
                            label="Proejct Completion Date"
                            data={get_date(s.work.completed_date)}
                            fl
                            mt={12}
                        />:null}
                              {s.work.dlp_end_date?
                        <LabelData 
                            label="DLP End Date"
                            data={get_date(s.work.dlp_end_date)}
                            fl
                            mt={12}
                        />:null}
                        </div>
                        <div style={{backgroundColor:"#FFF",padding:8,borderRadius:6,marginTop:16}}>
                            <CardTitle mb={8} title="Project Report" />
                            {this.state.reportLoading ? <label className='' >Generating...</label>:
                            <label className='point viewAllLabel' onClick={this.onProjectReportDownload}>View/Download</label>}
                            </div>


                            {permissions.project === "Service"?null:
                        <div style={{backgroundColor:"#FFF",padding:8,borderRadius:6,marginTop:16}}>
                            <CardTitle mb={8} title="FD & BG" />
                                {s.deposits.map(it =>{
                                    return(
                                        <div className='fl' style={{borderBottom:"solid 1px #aaa"}}>
                                        <Txt fl>{it.name}</Txt>
                                        <Txt> {setNumberFormat(it.balance)}</Txt>
                                        </div>
                                    )
                                })}    
                            </div>
                            
                            }


                            <div style={{backgroundColor:"#FFF",padding:8,borderRadius:6,marginTop:16}}>
                            <CardTitle mb={8} title="Tools" addBtn="Add Tool" 
                                onAddClick={this.Show_Assign_Tool}
                            />
                                {s.equipments.map(it =>{
                                    return(
                                        <div className='fl' style={{borderBottom:"solid 1px #eee",marginBottom:8,paddingBottom:8}}>
                                        <Txt fl>{it.name}</Txt>
                                        <Txt>{it.count}</Txt>
                                            {/* <Txt c="blue" onClick={() => this.onReturnTool(it)}>Return</Txt> */}
                                            <i onClick={() => this.onReturnTool(it)} style={{color:CLRS.NEWBLUE}} className="side-menu__icon fe fe-arrow-up-left point"></i>
                                        </div>
                                    )
                                })}    
                            </div>

                            <div style={{backgroundColor:"#FFF",padding:8,borderRadius:6,marginTop:16}}>
                            <CardTitle mb={8} title="Documents" addBtn="+ Upload" 
                                onAddClick={this.Show_Docu_Add}
                            />
                                {s.documents.map(it =>{
                                    return(
                                        <div className='fl' style={{borderBottom:"solid 1px #eee",marginBottom:8,paddingBottom:8}}>
                                        <Txt fl>{it.name}</Txt>
                                        <Txt>{it.count}</Txt>
                                            {/* <Txt c="blue" onClick={() => this.onReturnTool(it)}>Return</Txt> */}
                                            <i onClick={() => this.onReturnTool(it)} style={{color:CLRS.NEWBLUE}} className="side-menu__icon fe fe-arrow-up-left point"></i>
                                        </div>
                                    )
                                })}    
                            </div>
                         

                    </div>
            </div>
        </div>
        <AddDeposit
            show={call => this.Show_Add_Deposit = call}
            project_id={s.project_id}
        />
        <AssignTool 
            show={call => this.Show_Assign_Tool = call}
            project_id={s.project_id}     
            from_project  
            onSuccess={this.get_tools}
        />
        <ReturnTool 
            show={call => this.onReturnTool = call}
            onSuccess={this.get_tools}
        />
        <AddProject 
            show={call => this.EditProject = call}
            onSuccess={this.fetchProjectDetails}
        /> 
        <AddDocument 
            show={call => this.Show_Docu_Add = call}
            onSuccess={this.fetchProjectDetails}
        /> 
               <AskConfirm 
                show={call => this.show_delete_modal = call}
                onSubmit={this.onDelete}
    />
        
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      work:state.work,
      user:state.user,
    }
  }
export default connect(mapStateToProps,{Get_Works})(Page);