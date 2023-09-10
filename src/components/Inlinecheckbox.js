import React from 'react';

import {
  CFormGroup,
  CLabel,
  CInputCheckbox
  } from '@coreui/react'
import { Txt } from './general';

    
 const In_line_check_box = (p) =>{
      return(
        <div 
       className="fl"
       style={{marginTop:8}}
        >
        <Txt style={{flex:2}} >{p.name}</Txt>
    
          <CFormGroup 
          onChange={(e)=>{
            p.onChange("view",p.view);
          }}
          style={{flex:1,margin:0,padding:0,paddingLeft:35,marginRight:-35}} variant="custom-checkbox">
            <CInputCheckbox custom id={`${p.name}1`} name={`${p.name}1`} value={p.view} checked={p.view} />
            <CLabel variant="custom-checkbox" htmlFor={`${p.name}1`} ></CLabel>
          </CFormGroup>
    
          <CFormGroup 
            onChange={(e)=>{
            p.onChange("add",p.add);
          }}
          style={{flex:1,margin:0,padding:0,paddingLeft:35,marginRight:-35}} variant="custom-checkbox">
            <CInputCheckbox custom id={`${p.name}2`} name={`${p.name}2`} value={p.add} checked={p.add} />
            <CLabel variant="custom-checkbox" htmlFor={`${p.name}2`} ></CLabel>
          </CFormGroup>
    
          <CFormGroup 
             onChange={(e)=>{
              p.onChange("edit",p.edit);
            }}
          variant="custom-checkbox" style={{flex:1,margin:0,padding:0,paddingLeft:35,marginRight:-35}}>
            <CInputCheckbox custom id={`${p.name}3`} name={`${p.name}3`} value={p.edit} checked={p.edit} />
            <CLabel variant="custom-checkbox" htmlFor={`${p.name}3`}></CLabel>
          </CFormGroup>
    
          <CFormGroup 
          
          onChange={(e)=>{
            p.onChange("delete",p.delete);
          }}
          variant="custom-checkbox" style={{flex:1,margin:0,padding:0,paddingLeft:35,marginRight:-35}}>
            <CInputCheckbox custom id={`${p.name}4`} name={`${p.name}4`} value={p.delete} checked={p.delete} />
            <CLabel variant="custom-checkbox" htmlFor={`${p.name}4`} ></CLabel>
          </CFormGroup>
        
      </div>
      )
    }

    export default In_line_check_box;