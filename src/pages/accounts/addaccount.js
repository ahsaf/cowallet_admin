

import React, { Component } from 'react';
import {CInput,get_error_string, Txt } from '../../components/general';
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
            balance:"0",
            loading:false,
            show_add:false,
            id:0
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
              id:client.id,
        });
        }else{
          this.setState({show_add:true,name:"",id:0});
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
                balance:Number(s.balance)?Number(s.balance):0,
                id:s.id
            }
            if(s.id){
                delete post.balance;
            }
            Post('/account/create',post,(st,res)=>{
                if(st){
                    if(s.id){
                        toast("Account updated successfully");
                    }else{
                        toast("Account added successfully");
                    }
                    this.clearState();
                }else{
                    this.setState({loading:false});
                    // Tost(Tost_Massages.wrong);
                }
            });
        }
    }
    clearState = ()=>{
        this.setState({ 
            name:"",
            id:0,
            balance:"0",
            show_add:false,
            loading:false
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
    <CModalTitle>{s.id?'Edit Account':'Add Account'}</CModalTitle>
  </CModalHeader>
  <CModalBody>
      <div className='fl'>
        <CInput 
            title="Name"
            value={s.name}
            onChange={this.onChange2.bind(this, 'name')}
            err={s.e_name}
            fl
        />
        {s.id?null:
        <CInput 
            title="Balance"
            fl
            ml={8}
            number
            value={s.balance}
            onChange={this.onChange2.bind(this, 'balance')}
        />}
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
    onClick={this.onSubmit} color="primary" >Submit</CButton>
  </CModalFooter>
 
</CModal>
        
    </>
  )
}
}

export default Page;
