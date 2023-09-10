

import React, { Component } from 'react';
import {Check_Positive_Number_Error, CInput,get_error_string, Txt } from '../../components/general';
import {
    CButton,CModalHeader,CModalTitle,CModal,CModalBody,CModalFooter,CSwitch
    } from '@coreui/react'
import { toast } from 'react-toastify';
class Page extends Component {
    constructor(){
        super();
        this.state={
            name:"",
            e_name:"",
            amount:"",
            e_amount:"",
            qty:"",
            e_qty:"",
            loading:false,
            show_add:false,
            id:0
        }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
  
    componentDidMount(){
        if(this.props.show){
            this.props.show(this.show_modal);
        }
    }
    show_modal = (client)=>{
        if(client){
          this.setState({
              show_add:true,
              name:client.item,
              id:client.id,
              e_name:"",
              amount:client.amount,
              e_amount:"",
              qty:client.qty,
              e_qty:"",
        });
        }
      }
    onSubmit = ()=>{
        const s = this.state;
        let e_amount = Check_Positive_Number_Error(s.amount,"Amount");
        let e_qty =Check_Positive_Number_Error(s.qty,"Quantity");
        let e_name = get_error_string(s.name,"Item name",1);
        if(e_amount || e_name || e_qty ){
          this.setState({e_name,e_amount,e_qty});
        }else{
        this.setState({show_add:false});
        this.props.onSubmit({
            name:s.name,
            amount:s.amount,
            qty:s.qty,
            id:s.id
        });
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
    <CModalTitle>{s.id?'Edit Account':'Add Account'}</CModalTitle>
  </CModalHeader>
  <CModalBody>
      <div className='fl'>
        <CInput
                title="Item Name"
                fl
                onChange={(a) => this.onChangeText("name",a)}
                value={this.state.name}
                err={this.state.e_name}
                onEnterPress={this.focusUnitPrice}
              />
           <CInput
                title="Amount"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("amount",a)}
                value={this.state.amount}
                err={this.state.e_amount}
                focus={call => this.focusUnitPrice = call}
                onEnterPress={this.focusQTY}

              />
         <CInput
                title="Quantity"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("qty",a)}
                value={this.state.qty}
                err={this.state.e_qty}
                focus={call => this.focusQTY = call}
                onEnterPress={this.onSubmit}

              />
        </div>

  </CModalBody>
  <CModalFooter>
      {/* {s.loading?
      <Btn_loading mr={8} mt={4} />:null} */}
    <CButton color="secondary" 
    onClick={()=>{
       this.clear_state();
    }}
    >Clear</CButton>{' '}
    <CButton 
    disabled={s.loading}
    onClick={this.onSubmit} color="primary" >Save</CButton>
  </CModalFooter>
 
</CModal>
        
    </>
  )
}
}

export default Page;
