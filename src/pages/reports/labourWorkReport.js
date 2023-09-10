

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CTable from '../../components/Ctable';
import { Btn, CardTitle, CInput, get_date, RadioBtnCollection, Tost_Massages, Txt, ReportDownloadComponent } from '../../components/general';
import SearchPicker from '../../components/SearchPicker';
import { Get_Works } from '../../actions/work';
import { Get_Employees } from '../../actions/employee';
import { Post } from '../../services/services';
import ReactToPrint from 'react-to-print';
class Page extends Component {
    constructor(){
      super();
      this.state = {
            report:[],
            dateFrom:get_date(new Date(),"YYYY-MM-DD"),
            dateTo:get_date(new Date(),"YYYY-MM-DD"),
            e_dateFrom:"",
            e_dateTo:"",
            type:"Summary",
            worker:{id:"All",name:"All"},
            project:{id:"All",name:"All"},
            list:[],
            total_worked:0,
            total_payed:0,
            projects:[],
            employees:[],
            type:"Summary",//"Summary" // "List"
            summary:[],
            res_type:"",
            include_payments:true,
            msg:""
      }
    }
    componentDidMount(){
        this.props.Get_Works({},()=>{})
        this.props.Get_Employees({},()=>{})
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    } 
    onGenerate = ()=>{
        const s = this.state;
        if(s.dateFrom > s.dateTo){
            this.setState({e_dateFrom:"Date from should be lessthan date to",msg:""})
        }else{
        this.setState({loading:true,msg:""});
        const post ={
            "date_from":s.dateFrom,
            "date_to":s.dateTo,
            "type":s.type,
            "include_payments":s.include_payments,
            project:s.project,
            employee:s.worker
        }
        Post("/report/employeeWork",post,(st,res)=>{
            console.log("RES: ", res)
            if(st){
                
                if(res.type === "Summary"){
                    this.setState({
                        total_worked:res.total_worked,  
                        total_payed:res.total_payed,  
                        projects:Object.values(res.projects),
                        res_type:"Summary",
                        msg:res.total_worked ? "":Tost_Massages.no_data_found, 
                        loading:false
                    })
                }else if(res.type === "List"){
                    this.setState({
                        total_worked:res.total_worked,  
                        total_payed:res.total_payed,  
                        employees:Object.values(res.employees),
                        msg:res.total_worked ? "":Tost_Massages.no_data_found,
                        res_type:"List",
                        loading:false
                    })
                }else if(res.type === "Details"){
                    this.setState({
                        list:res.data,
                        msg:res.data && res.data.length ?"":Tost_Massages.no_data_found, 
                        res_type:"Details",
                        loading:false
                    })
                }else{
                this.setState({loading:false})
                }
                // this.setState({list:res.data})
            }else{
                this.setState({loading:false})
            }
        });
    }
}

    render(){
        const s = this.state;
  return (
     <>
        <div style={{}}>
            <div style={{flex:1,paddingRight:16,marginLeft:8}}>
                <div style={{backgroundColor:"#FFF",padding:8,borderRadius:6}}>
                    <div className='fl'> 
                        <CardTitle fl title="Labour Report" />
                    </div>
                    <RadioBtnCollection 
                    title={"Type"}
                    list={[
                        {title:"Summary",value:"Summary"},
                        {title:"List",value:"List"},
                        {title:"Details",value:"Details"},
                    ]}
                    onSelect={(val) => this.setState({type:val.value})}
                    style={{marginTop:8,marginBottom:8}}
                    value={s.type}
                    />
                    <div className='fl'>
                    <SearchPicker
                        title="Worker"
                        list={this.props.employee.employees.data}
                        onChange={(a)=> this.onChangeText("worker",a)}
                        value={this.state.worker}
                        fl
                        AddAll
                    />    
                     <SearchPicker
                        title="Project"
                        list={this.props.work.works.data}
                        onChange={(a)=> this.onChangeText("project",a)}
                        value={this.state.project}
                        fl
                        ml={8}
                        AddAll
                    />  
                    </div>  
                    <div className='fl'>
                    <CInput 
                        title="Date From"
                        fl
                        date
                        value={s.dateFrom}
                        onChange={this.onChangeText.bind(this, 'dateFrom')}
                        err={s.e_dateFrom}
                        onEnterPress={this.focusEndDate}
                    />
                    <CInput 
                        title="Date To"
                        date
                        fl
                        value={s.dateTo}
                        ml={8}
                        onChange={this.onChangeText.bind(this, 'dateTo')}
                        err={s.e_dateTo}
                        focus={call => this.focusEndDate = call}
                    />
                    </div>
                    <div className='fl' style={{alignItems:"center"}}>
                        <Btn wi={100} loading={s.loading} onClick={this.onGenerate} title={"Generate"} />
                        <Txt c="r" ml={8}>{this.state.msg}</Txt>
                    </div>
                  
                </div>
            </div>
            {s.msg?null:s.res_type?
            <div style={{marginTop:16,marginLeft:16}}>
            <ReactToPrint
                          trigger={() => {
                            return  (
                                <Txt  c="blue" point style={{textDecoration:"underline"}} >Print</Txt>
                                )
                          }}
                          content={() => this.print_ref}
                        />

            {/* <Txt  c="blue" ml={16} point style={{textDecoration:"underline"}} >Export</Txt> */}
            </div>:null}

            <div  ref={ref => this.print_ref = ref} style={{marginTop:24}}>

                {s.msg?null:s.res_type === "Summary"?
                <div         >
                <CTable 
                   fields= {[{title:"SL NO",key:"slno"},{title:"Project",key:"name"},{title:"Total",key:"total"}]}
                   list={[...this.state.projects,{name:"Sub Total",total:this.state.total_worked,id:"total",add_blank_top:true,tt:true,boldText:true},{name:"Total Payed",total:this.state.total_payed,id:"total1",tt:true,boldText:true}]}
                   title="Result"
                   hide_Search
                   hide_pagination
                   style={{marginTop:40}}
                   
                      
               /> 
               </div>:s.res_type === "List"?
                <div>
                <CTable 
                   fields= {[{title:"SL NO",key:"slno"},{title:"Worker",key:"name"},{title:"Total",key:"total"},{title:"Payed",key:"payed"}]}
                   list={[...this.state.employees,{name:"Sub Total",total:this.state.total_worked,payed:this.state.total_payed,id:"total",add_blank_top:true,tt:true,boldText:true}]}
                   title="Result"
                   hide_Search
                   hide_pagination
                   style={{marginTop:40}}
               /> 
               </div>
                :s.res_type === "Details"?        
                <CTable 
                    fields={[{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Name",key:"name"},{title:"Desigination",key:"desigination"},{title:"Project / Remarks",key:"project_name"},{title:"Unit Charge",key:"rate"},{title:"Quantity",key:"qty"},{title:"Amount",key:"total"}]}
                    list={this.state.list}
                    custome={{
                        "total":(item) =>  <td style={{color:item.total?'green':'red'}}>{item.total?item.total:item.amount}</td>,
                        "project_name":(item) =>  <td>{item.total?item.project_name:item.remarks}</td>
                    }}
                    title="Result"
                    hide_Search
                    hide_pagination
                    style={{marginTop:40}}
                />:null}
            </div>
        </div>
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        employee:state.employee,
        work:state.work,
        
    }
  }
export default connect(mapStateToProps,{Get_Works,Get_Employees})(Page);
