

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
            unit_price:"",
            designation:"",
            loading:false,
            employee:{},
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
          console.log("CLIENTS: ", client)
          this.setState({
              show_add:true,
              name:client.name,
              mobile:client.mobile,
              balance:client.balance,
              id:client.id,
              unit_price:client.rate,
              designation:client.desigination
        });
        }else{
          this.setState({show_add:true})
          this.clear_state();
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
                designation:s.designation,
                balance:s.balance,
                mobile:s.mobile,
                rate:Number(s.unit_price) && Number(s.unit_price)> 0?Number(s.unit_price):0,
                id:s.id,
            }
            Post("/user/create_employee",post,(st,res)=>{
                if(st){
                    this.setState({loading:false,show_add:false});
                    if(this.props.onSuccess){
                      this.props.onSuccess();
                    }

                    if(s.id){
                      toast("Worker updated successfully",{type:"success"});
                    }else{
                      toast("Worker added successfully",{type:"success"});
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
                    }

                    this.clearState();
                }else{
                    this.setState({loading:false});
                    toast(Tost_Massages.wrong,{type:"error"});
                }
            })
        }
    }
    clearState = ()=>{
        this.setState({ 
            name:"",
            e_name:"",
            mobile:"",
            balance:"0",
            unit_price:"",
            designation:"",
        })
    }
   
    render(){
		const s = this.state;
        const p = this.props;
  return (
     <>
        {/* <div style={{}}>
        <div class="col-md-12 col-xl-12 col-xs-12 col-sm-12">
						<div class="card">
							<div class="card-body">
								<div class="main-content-label mg-b-5">
                                Add Project
								</div>
								<div class="row row-sm">
									<div class="col-lg">
                                    <CInput 
                                        title="Name"
               
                                        />
									</div>
								</div>
							</div>
						</div>
					</div>

	           <h1></h1>
               
              

        </div> */}

<CModal 
  show={this.state.show_add} 
  onClose={() => this.setState({show_add:false})}
  size="lg"
>
  <CModalHeader closeButton>
    <CModalTitle>{s.id?'Edit Employee':'Add Employee'}</CModalTitle>
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
            <CInput 
                    title="Designation"
                    value={s.designation}
                    ml={8}
                    fl
                    onChange={this.onChange2.bind(this, 'designation')}
        />
        </div>
       
                            <div className='fl'>
                            <CInput 
                                title="Unit Charge"
                                fl
                                value={s.unit_price}
                              
                                number
                                onChange={this.onChange2.bind(this, 'unit_price')}
                                        />
                                     {/* <CInput 
                                    title="Balance"
                                    fl
                               
                                    value={s.balance}
                                    onChange={this.onChange2.bind(this, 'balance')}
                                    /> */}
                                      <CInput 
                title="Mobile"
                fl
                value={s.mobile}
                number
                ml={8}
                onChange={this.onChange2.bind(this, 'mobile')}
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

    <Btn 
    loading={s.loading}
    wi={100}
    onClick={this.onSubmit} color="primary" primary title="Submit" />
  </CModalFooter>
 
</CModal>
        
    </>
  )
}
}

export default Page;
