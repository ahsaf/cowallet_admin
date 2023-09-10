
import React, { Component } from 'react';

import {
  CButton,CModalHeader,CModalTitle,CModal,CModalBody,CModalFooter
} from '@coreui/react'
import { CInput } from './general';
class AskConfirm extends Component {
      constructor(){
        super();
        this.state ={
          show_add:false,
          msg:'',
          success:false,
          item:{},
          remark:"",
          show_remark:false
        }
      }
    componentDidMount(){
      if(this.props.show){
      this.props.show(this.show_modal);
      }
    }
   
show_modal = (item,success,msg,post)=>{
  if(post){
    this.setState({show_add:true,msg,success,item,remark:"",show_remark:post.show_remark?true:false})
  }else{
    this.setState({show_add:true,msg,success,item,remark:"",show_remark:false})
  }

}
onChange2 = (n,v)=>{
  this.setState({[n]:v});
}
    render(){
  return (
    <>
<CModal 
  show={this.state.show_add} 
  onClose={() => this.setState({show_add:false})}
  
>
  <CModalHeader closeButton>
    <CModalTitle>Are You Sure?</CModalTitle>
  </CModalHeader>
  <CModalBody>
  <div style={{display:'flex'}}>
      <p>{this.state.msg?this.state.msg:''}</p>
      {this.state.show_remark?
      <CInput
          fl
          title="Remark"
          value={this.state.remark}
          onChange={this.onChange2.bind(this, 'remark')}
          
          />:null}
  </div>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" 
    onClick={() => this.setState({show_add:false})}
    
    >{this.state.success?"No":"Cancel"}</CButton>{' '}

    <CButton onClick={()=>{
this.props.onSubmit(this.state.item,{remark:this.state.remark});
this.setState({show_add:false})
    }} color={this.state.success?"success":'danger'} >{this.state.success?"Yes":"Delete"}</CButton>
  </CModalFooter>
 
</CModal>



    </>
  )
}
}

export default AskConfirm;







  