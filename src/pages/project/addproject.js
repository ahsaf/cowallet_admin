

import React, { Component } from 'react';
import {Btn, CheckPositiveNumberReturnZero, CInput,get_date,get_error_string, setSearchPickerDefaulValue, Tost_Massages, Txt } from '../../components/general';
import { Post } from '../../services/services';
import {
    CButton,CModalHeader,CModalTitle,CModal,CModalBody,CModalFooter,CSwitch
    } from '@coreui/react'
import SearchPicker from '../../components/SearchPicker';
import { Get_Customers } from '../../actions/customer'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import AddCustomer from '../customers/addcustomer';
import moment from 'moment';
class Page extends Component {
    constructor(){
        super();
        this.state={
            name:"",
            e_name:"",
            description:"",
            customer:{},
            e_customer:"",
            loading:false,
            project:{},
            tender:false,
            tender_start:get_date(new Date(),"YYYY-MM-DD"),
            tender_end:"",
            estimated_amount:"",
            show_add:false,
            hide_cus:false,
            tender_time:"",
             dlp_period:""
        }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
    onChange2 = (n,v)=>{
        this.setState({[n]:v});
      }
    onPayedTick = (current)=>{
        if(current){
          this.setState({tender:false})
        }else{
          this.setState({tender:true})
        }
    }
    componentDidMount(){
        if(this.props.show){
            this.props.show(this.show_modal);
        }
        this.props.Get_Customers({},()=>{});
    }
    onAddCustomer = (newCus)=>{
      if(newCus){
        this.setState({
          customer:setSearchPickerDefaulValue(newCus)
        })
      }
        this.props.Get_Customers({},()=>{})
    }
    show_modal = (client)=>{
        if(client){
          this.setState({
              show_add:true,
              name:client.name,
              description:client.description,
              id:client.id,
              tender:client.tender,
              estimated_amount:client.estimated_amount,
              tender_start:get_date(client.tender_start,"YYYY-MM-DD"),
              tender_end:get_date(client.tender_end,"YYYY-MM-DD"),
              customer:{name:client.customer_name,id:client.customer_id,value:client.customer_id,label:client.customer_name},
              hide_cus:true,
              tender_time:String(client.tender_time),
               dlp_period:client.dlp_period?String(client.dlp_period):"",
        },()=>{ this.setState({hide_cus:false})})
        }else{
          this.setState({
            show_add:true,
            name:"",
            e_name:"",
            description:"",
            customer:{},
            e_customer:"",
            loading:false,
            project:{},
            tender:false,
            tender_start:get_date(new Date(),"YYYY-MM-DD"),
            tender_end:"",
            estimated_amount:"",
             tender_time:"",
             dlp_period:""
           })
        }
      
      }
    onSubmit = ()=>{
        const s = this.state;
        const e_name = get_error_string(s.name,"Name",3);
        this.setState({e_name})
        if(!e_name){
            this.setState({loading:true});
            const post = {
                name:s.name,
                description:s.description,
                tender:s.tender,
                tender_start:s.tender_start,
                tender_end:s.tender_end,
                customer:s.customer,
                estimated_amount:Number(s.estimated_amount),
                id:s.id,
                dlp_period:CheckPositiveNumberReturnZero(s.dlp_period),
                tender_time:s.tender_time,
            }
            Post("/project/create",post,(st,res)=>{
                if(st && res && res.status === "Success"){
                    this.setState({loading:false,show_add:false});
                    if(s.id){
                      toast("Project updated successfully",{type:"success"});
                    }else{
                      toast("Project added successfully",{type:"success"});
                    }
                    this.clearState();
                    if(this.props.onSuccess){
                      this.props.onSuccess();
                    }
                    
                }else if(st && res && res.status === "err" && res.msg && res.msg.details && res.msg.details.length){
                     toast(res.msg.details[0].message,{type:"error"});
                    this.setState({loading:false});
                }else{
                    this.setState({loading:false});
                    toast(Tost_Massages.wrong,{type:"error"});
                }
            })
        }
    }
clearState = ()=>{
    this.setState({name:"",
    e_name:"",
    description:"",
    customer_name:"",
    customer_phone:"",
})
}

onTenderTimeChange = (name,value)=>{
        if(value && Number(value) && Number(value) > 0){
            let endDate = moment(this.state.tender_start).add(Number(value),'months');
            this.setState({tender_time:value,tender_end:endDate});
        }else{
            this.setState({tender_time:""})
        }
}
   
    render(){
		const s = this.state;
        const p = this.props;
  return (
     <>
<CModal 
  show={this.state.show_add} 
  onClose={() => this.setState({show_add:false})}
  size="lg"
>
  <CModalHeader closeButton>
    <CModalTitle>{s.id?'Edit Project':'Add Project'}</CModalTitle>
  </CModalHeader>
  <CModalBody>
  <CInput 
            title="Name"
            value={s.name}
            onChange={this.onChange2.bind(this, 'name')}
            err={s.e_name}
         />
                                           <CInput 
                                        title="Description"
                                        value={s.description}
                                        onChange={this.onChange2.bind(this, 'description')}
                                        />
  <div className='fl'>
  
    <SearchPicker
        title="Customer"
        list={this.props.customer?.customers?.data}
        onChange={(a)=> this.onChangeText("customer",a)}
        fl
        onAddClick={this.showAddCustomer}
        err={this.state.e_customer}
        focus={call => this.focusCustomer = call}
        onEnterPress={this.focusEstimation}
        value={this.state.customer}
    
    />
                  <CInput 
                                        title="Estimated Amount"
                                        number
                                        fl
                                        ml={8}
                                        focus={call => this.focusEstimation = call}
                                        value={s.estimated_amount}
                                        onChange={this.onChange2.bind(this, 'estimated_amount')}

                                        />                             
        </div>
        <div  style={{display:'flex',alignItems:'center',flex:1,marginLeft:0,marginBottom:16}}>
            <Txt>Tender</Txt>
            <CSwitch 
            className={'mx-1'} 
            // shape="pill" 
            variant={'3d'} 
            size={"sm"} 
            color={'primary'} 
            checked={s.tender} value={s.tender} style={{marginLeft:16}} onChange={(e)=> this.setState({tender:e.target.checked})} />
            </div>
            {s.tender?
            <div>
             
           
        <div className='fl'>
        <CInput 
            title="Agreement Date"
            date
            fl
            focus={call => this.focusTenderStart = call}
            value={s.tender_start}
            onChange={this.onChange2.bind(this, 'tender_start')}
          /> 
          <CInput 
            title="Agreement time (Months)"
            // date
            fl
            ml={8}
            focus={call => this.focusTenderEnd = call}
            value={s.tender_time}
            number
            onChange={this.onTenderTimeChange.bind(this, 'tender_time')}
            /> 
 </div>
  <div className='fl'>
     <CInput 
            title="DLP Period (Years)"
            // date
            fl
            value={s.dlp_period}
            number
            onChange={this.onChange2.bind(this, 'dlp_period')}
            /> 
    <Txt fl  ml={8} >Completion Date: {s.tender_end && s.tender_time?get_date(s.tender_end,"DD MMM YYYY"): "-"}</Txt>
</div>
        </div>:null}
   

  </CModalBody>
  <CModalFooter>
      {/* {s.loading?
      <Btn_loading mr={8} mt={4} />:null} */}
    <CButton color="secondary" 
    onClick={()=>{
       this.clear_state();
    }}
    
    >Clear</CButton>{' '}
       <Btn 
      title={"Submit"}
      primary
      wi={100}
      onClick={this.onSubmit}
      loading={s.loading}
      />
  </CModalFooter>
 
</CModal>
<AddCustomer 
            show={call => this.showAddCustomer = call}
            onSuccess={this.onAddCustomer}
        />
    </>
  )
}
}
const mapStateToProps =(state) =>{
  return{
    customer:state.customer,
  }
}
export default connect(mapStateToProps,{Get_Customers})(Page);
