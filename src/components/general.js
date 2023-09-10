import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { CLRS } from './constants';
import { CircularProgress } from "@material-ui/core";
import '../styles/commonStyles.css';
import store from '../store';
// import { CStyles } from '../styles/styles';

export const Txt = (p) => {
    return (
        <label
            onClick={p.onClick?p.onClick:null}
            style={{
                fontSize: p.s ? p.s : 14,
                color:p.c === "pr"?CLRS.PRIMARY:p.c === "sc"?CLRS.SECONDARY:p.c === "thrd"?"#777":p.c === "r"?CLRS.RED:p.c === "w"?"#fff":p.c === "green"?CLRS.GREEN:p.c?p.c:"#000",
                marginBottom: p.mb ? p.mb : 0,
                marginTop: p.mt ? p.mt : 0,
                marginRight: p.mr ? p.mr : 0,
                marginLeft: p.ml ? p.ml : 0,
                textAlign: p.a === 'c' ? 'center' : p.a === 'r' ? 'right' : 'auto',
                flex: p.fl ? 1 : null,
                fontWeight:p.w?p.w:"400",
                cursor:p.point?"pointer":"default",
                textDecoration:p.underline?"underline":"none",
                ...p.style
            }} 
            >
            {p.children}
        </label>
    )
}

export const UnitsList = [{id:"Hour",name:"Hour"},{id:"Day",name:"Day"}];
export const Btn = ({onClick,loading,disabled,wi,style,ml,mb,mt,mr,title,primary}) => {
    return (
      <button 
      onClick={onClick} 
      disabled={loading ? true : disabled}
      style={{
        width: wi ? wi : null,
        marginLeft: ml ?ml : 0, marginTop: mt ? mt : 0, marginBottom: mb ? mb : 0, marginRight: mr ? mr : 0,
        ...style
      }}
      className={`btn btn-${primary?"primary":"secondary"} btn-block`} >
        {loading?
        <CircularProgress 
          size={16} 
          style={{ color: "#fff" }}
        />
        :title}
    </button>
    )
}

export const CInput = (p) =>{
  const inref = useRef();
  const t_focus = () => {
      inref.current.focus();
  }
  useEffect(()=>{
      if(p.focus){
          p.focus(()=>{
              t_focus(); 
          })
      }
  },[]);

  return(
              <div className ="form-group mg-b-0"
              style={{
                flex:p.fl?1:null,
                marginTop: p.mt ? p.mt : 0,
                marginLeft: p.ml ? p.ml : 0,
                marginRight: p.mr ? p.mr : 0,
                marginBottom: p.mb ? p.mb : 0,
                ...p.style
              }}
              
              >
										<p className="mg-b-5">{p.title}</p>
                <input
                
                value={p.value}
                disabled={p.dis}
                  type={p.date?"date":p.number?'number':p.date?'date':p.password?"password":p.file?'file':'text'}
                  maxLength={p.length}
                ref={inref}
                onChange={(e)=> {
                    let text = e.target.value
                    p.onChange(text);
                        }}  
                     placeholder={p.placeholder} 

                className="form-control"
                style={{border:p.err?"red 1px solid":""}} 
                list={p.list}
                onKeyDown={(e)=>{
                  if(e.key === 'Enter') {
                          if(p.onEnterPress){
                              p.onEnterPress();
                          }
                    }  
              }}
                
                />
             <Txt  s={12} c='r'>{p.err}</Txt>

              </div>
  )
}


export const LabelData = (p)=>{

  return(
    <div style={{
      flex:p.fl?1:null,
      marginTop: p.mt ? p.mt : 0,
      marginLeft: p.ml ? p.ml : 0,
      marginRight: p.mr ? p.mr : 0,
      marginBottom: p.mb ? p.mb : 0,
      ...p.style
    }}>
      <lable style={{color:'#777',fontSize:12}}>{p.label}</lable><br />
      <lable style={{fontSize:14,fontWeight:500,color:CLRS.MATTBLACK}}>{String(p.data)?p.data:"-"}</lable>
      {p.click_sub?
      <lable
      onClick={p.onClick_Sub}
      className='point' style={{fontSize:12,marginLeft:8,color:CLRS.Blue}}>{p.click_sub}</lable>:null}
    </div>
  )
}

export const LabelDataBold = (p)=>{

  return(
    <div style={{
      flex:p.fl?1:null,
      marginTop: p.mt ? p.mt : 0,
      marginLeft: p.ml ? p.ml : 0,
      marginRight: p.mr ? p.mr : 0,
      marginBottom: p.mb ? p.mb : 0,
      ...p.style
    }}>
     	<p className="mg-b-5" style={{marginBottom:10}}>{p.label}</p>
      <lable style={{fontSize:14,fontWeight:500,color:CLRS.MATTBLACK}}>{p.money?setNumberFormat(p.data):String(p.data)?p.data:"-"}</lable>
    </div>
  )
}

export const Picker = (p)=>{
  return(
    <div
    
    style={{
        flex:p.fl?1:null,
        marginTop: p.mt ? p.mt : 0,
        marginLeft: p.ml ? p.ml : 0,
        marginRight: p.mr ? p.mr : 0,
        marginBottom: p.mb ? p.mb : 0,
        ...p.style
    }}>
        {/* <Txt mb={4}>{p.title}</Txt> */}
        <p className="mg-b-10" style={{marginBottom:5}}>{p.title}</p>

    <select
            className="form-control select2-no-search"
            value={p.value}
            onChange={e => {
                p.onSelect(e.target.value);
               }}
              // style={{width:p.style.width?p.style.width:'auto'}}
          >
            {p.add_all?<option>All</option>:null}
            {p.add_select?<option>Select</option>:null}
              {p.list.map(it =>{
                  if(p.field){
                    return(
                        <option value={it[p.value_field]}>{it[p.field]}</option>
                      )
                  }else{
                    return(
                        <option>{it}</option>
                      )
                  }
                 
              })}
               
              
          </select>
          {p.hide_error?null:
          <Txt s={12} c='r'>{p.err}</Txt>}
            </div>
  )
}

export const HAND_ACCOUNT = {
  name:"CASH",
  id:"hand"
}

export const Loading = ()=>{
    // return(
    //     <View style={{flex:1,alignItems:'center',justifyContent:'center',height:windowHeight}}>
    //         <ActivityIndicator style={{marginBottom:60}} size={"large"} color={CLRS.PRIMARY} />
    //     </View>   
    // )
}



export const  get_profile_name = (name) => {
    if (!name) return "";
    var parts = name.split(" ");
    var result = parts.map(function (p) { return p.charAt(0).toLocaleUpperCase(); }).join("");
    return result.substring(0, 2);
}

export const get_error_string = (str, label, min) => {
    if (str) {
      if (str === "") {
        return `${label} required`;
      } else {
        if (str.length < min) {
          return `${label} should be minimum ${min} character`;
        } else {
          return false;
        }
      }
    } else {
      return `${label} required`;
    }
  };

export const CheckBox = (p)=>{
  return(
    <div 
    style={{
      flex:p.fl?1:null,
      marginTop: p.mt ? p.mt : 0,
      marginLeft: p.ml ? p.ml : 0,
      marginRight: p.mr ? p.mr : 0,
      marginBottom: p.mb ? p.mb : 0,
      ...p.style
  }}
    >
					<label class="ckbox"><input onChange={p.onChange} checked={p.value?true:false} type="checkbox" /><span>{p.title}</span></label>
		</div>
  )
}



export const get_date = (date,format)=>{
    if(format){
      return moment(date).format(format)
    }else{
      return moment(date).format('DD MMM YYYY')
    }
  }

  
  
export const Tost_Massages = {
    No_net: 'You are not connected to the internet',
    wrong: 'Something went wrong please try again later',
    trans_error: 'Transaction failed, please try again',
    no_data_found: 'No Data Found',
}

export const setNumberFormat = (numb)=>{
  if(Number(numb)){
    numb = Number(numb);
    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }
      return ("₹ " + separator(numb)) ;
  }
  return "₹ 0";
}

export const CardTitle = ({title,fl,mt,ml,mr,mb,style,addBtn,onAddClick})=>{
  return(
    <div className='fl-justify-center ' style={{
      flex:fl?1:null,
      marginTop: mt ? mt : 0,
      marginLeft: ml ? ml : 0,
      marginRight: mr ? mr : 0,
      marginBottom: mb ? mb : 0,
      ...style
    }}>
      <h4  class="card-title mg-b-2 mt-2 fl-1" style={{flex:1}} >{title}</h4>
      {addBtn?
      <label className='point viewAllLabel' onClick={onAddClick}>{addBtn}</label>
      :null}
    </div>
  
  )
}
export const CheckPositiveNumberReturnZero = (value) =>{
  if(value && Number(value) && Number(value) > 0){
    return Number(value);
  }
  return 0;
}

export const Check_Positive_Number_Error = (value,name)=>{
  if(value && Number(value) && Number(value) > 0){
    return false;
  }
  if(name){
    if(value){
      return `${name} should be a positive number`;
    }
    return `${name} required`;
  }
  if(value){
    return "Value should be a positive number";
  }
  return `Value required`;
}
export const Check_OBJ_Required_Error = (obj,feild,name) => {
   if(obj && obj[feild]){
     if(obj[feild] === "Select"){
      return `${name} required`
     }
     return false;
   }
   if(name){
     return `${name} required`
   }
   return "Value required"
} 

export const Edit_Delete_Btns = ({onEditPress,onDeletePress,style})=>{
  return (
    <div style={style}>
       {onEditPress?
      <i className="side-menu__icon fe fe-edit point " onClick={onEditPress} style={{color:"#000",marginLeft:8,fontSize:16}}></i>:null}
      {onDeletePress?
      <i className="side-menu__icon fe fe-trash point " onClick={onDeletePress} style={{color:"#000",marginLeft:8,fontSize:16}}></i>:null}
    </div>
  )
}

export const RadioBtn = ({onClick,active = false,title = "",style = {}})=>{
  return(
    <div onClick={onClick} className='fl' style={{alignItems:"center",...style}}>
      <div  style={{width:16,height:16,borderRadius:200, border:active?'5px blue solid':'2px #aaa solid'}}   />
      <Txt ml={6}>{title}</Txt>
    </div>
  )
}

export const RadioBtnCollection = ({title,list = [],onSelect,value,style})=>{
  return(
    <div className='fl' style={style} >
    <Txt>{title}</Txt>
    {list.map(it =>{
      return(
        <RadioBtn key={it.value} onClick={() => onSelect(it)} style={{marginLeft:8}} title={it.title} active={value === it.value} />  
      )
    })}
  </div>
  )
}

export const ReportDownloadComponent  = () =>{
  return(
    <div className='fl' style={{marginLeft:20,marginTop:16}}>
      <Txt  c="blue" style={{textDecoration:"underline"}} >Print</Txt>
      <Txt c="blue" style={{textDecoration:"underline"}} ml={8}>Export</Txt>
    </div>
  )
}


export const GetItemID = (item)=>{
  return item && item.id && item.id !== "Select"?item.id:0;
}

export const GetAccountID = (item)=>{
  if(item && item.id === "hand"){
    return store.getState().user.user.id
  }
  return item && item.id && item.id !== "Select"?item.id:0;
}

export const setSearchPickerDefaulValue = (value) =>{
  if(value && value.id){
    return { id:value.id,name:value.name,label:value.name, value:value.id };
  }
  return {};
}
export const setSearchPickerDefaulValueForAccount = (value) =>{
  if(value && value.id){
    return { id:value.id,name:value.name,label:value.name, value:value.id };
  }
  return {};
}

export const getDefaultLocationParams = (props) =>{
  if(props && props.location && props.location.state){
    return {
      comeBack: props.location.state.comeBack?true:false
     }
  }
  return {
    comeBack:false
   }
}

export const UnderLineText = (props)=>{
  return(
    <Txt  onClick={props.onClick} {...props} style={{
      color: "#0000AA",
      fontSize: 12,
      textDecoration: "underline",
    }} point  >{props.value}</Txt>
  )
}

