

import React, { Component } from 'react';
import {Btn, CInput,get_error_string, Tost_Massages, Txt } from '../../components/general';
import { Post } from '../../services/services';
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
            mobile:"",
            balance:"0",
            place:"",
            loading:false,
            id:"",
            show_add:false
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
    }
    show_modal = (client)=>{
      if(client){
        this.setState({
            show_add:true,
            name:client.name,
            e_name:"",
            mobile:client.mobile,
            balance:client.balance,
            place:client.place,
            loading:false,
            id:client.id,
      })
      }else{
        this.setState({show_add:true,
          name:"",
          e_name:"",
          mobile:"",
          balance:"0",
          place:"",
          loading:false,
          id:"",
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
                place:s.place,
                mobile:s.mobile,
                balance:Number(s.balance)?Number(s.balance):0,
                opening_balance:Number(s.balance)?Number(s.balance):0,
                id:s.id
            }
            Post('/user/create_customer',post,(st,res)=>{
              console.log("RES ADD EMP: ", res)
                if(st){
                  if(s.id){
                    toast("Customer updated successfully",{type:"success"});
                  }else{
                    toast("Customer added successfully",{type:"success"});
                  }
                  if(this.props.onSuccess){
                    if(res.data && res.data.insertId){
                      this.props.onSuccess({
                        id:res.data.insertId,
                        name:s.name
                      });
                    }else{
                      this.props.onSuccess();
                    }
                 
                  }
                    this.clearState();
                }else{
                    this.setState({loading:false});
                    toast(Tost_Massages.wrong,{type:"error"});
                }
            });
        }
    }
clearState = ()=>{
    this.setState({
            name:"",
            e_name:"",
            mobile:"",
            balance:"0",
            place:"",
            show_add:false
        })
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
    <CModalTitle>{s.id?'Edit Customer':'Add Customer'}</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <div className='fl'>
        <CInput 
            title="Name"
            value={s.name}
            onChange={this.onChange2.bind(this, 'name')}
            err={s.e_name}
            onEnterPress={this.focusPlace}
            fl
        />
        <CInput 
                    title="Place"
                    value={s.place}
                    onChange={this.onChange2.bind(this, 'place')}
                    fl
                    focus={call => this.focusPlace = call}
                    onEnterPress={this.focusMobile}
                    ml={8}
                    

        />
        </div>
        <CInput 
                title="Mobile"
                fl
                value={s.mobile}
                onChange={this.onChange2.bind(this, 'mobile')}
                focus={call => this.focusMobile = call}
                onEnterPress={this.onSubmit}
        />
                         
        {/* <CInput 
            title="Balance"
            fl
            number
            value={s.balance}
            onChange={this.onChange2.bind(this, 'balance')}
        /> */}

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
    wi={100}
    loading={s.loading}
    title="Submit"
    primary
    onClick={this.onSubmit}
    />
  </CModalFooter>
 
</CModal>
        
    </>
  )
}
}

export default Page;
