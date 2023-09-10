import React, { useEffect,useRef, useState } from "react";
import { CInput, Txt } from './general';
// import SelectSearch,{fuzzySearch} from 'react-select-search';
import Select from 'react-select'

const SearchPicker = ({title,onChange,value,field = "name",mt = 0,ml = 0,mr = 0,mb = 0,style,fl,list,value_field = "id",onEnterPress,focus,err,AddSelect,AddAll=false,onAddClick}) =>{
    let options = list;
    if(AddSelect){
        options = [{id:"Select",name:"Select"},...list];
    }
    if(AddAll){
        options = [{id:"All",name:"All"},...list];
    }
    const inref = useRef();
    const t_focus = () => {
        inref.current.focus();
    }
    options.map(it =>{
        it.label = it[field];
        it.value = it[value_field];
    })
    useEffect(()=>{
        if(focus){
            focus(()=>{
                t_focus(); 
            })
        }
    },[]);
    
    return(
        <div  style={{
            flex:fl?1:null,
            marginTop:mt,
            marginLeft:ml,
            marginRight:mr,
            marginBottom:mb,
            ...style
          }}>
            <div className="fl" style={{justifyContent:"space-between"}}>
                <p className="mg-b-5">{title}</p>
                {onAddClick?
                    <p onClick={onAddClick} className="mg-b-5 aligtnLeft addclicktext">+ Add New {title}</p>:null}
                </div>
            
            <Select 
                options={options} 
                onChange={onChange} 
                value={value}
                defaultValue={value} 
                styles={{
                    control:(provided)=>{
                        return {
                            ...provided,
                            borderRadius:0,
                            borderColor:err?"red":"rgba(0,0,200,0.2)",
                            borderWidth:0.5  
                        }
                    }
                }}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter') {
                            if(onEnterPress){
                                onEnterPress();
                            }
                      }  
                }}
                ref={inref}
                />
                 <Txt  s={12} c='r'>{err}</Txt>
        </div>
       
    );



    return(
        <form  
        style={{
            flex:fl?1:null,
            marginTop:mt,
            marginLeft:ml,
            marginRight:mr,
            marginBottom:mb,
            ...style
          }}
          onSubmit={()=> alert("AAAA")}
          >
              <CInput
                title={title}
                onChange={onChange}
                value={value}
                KeyDown={(e)=>{
                    if(e.key === 'Enter') {
                        // if(s.item === ''){
                        // }else{
                        // }
                      }
                }}
                
                list='id'
                />
                <datalist id='id' >
                    {list && list.length ?list.map(brnm => {
                        return (
                            <option key={brnm.id} value={brnm.id} >{brnm[field].substring(0, 40)}</option>
                        )
                    }):null}
                </datalist>
        </form>
        )
} 
export default SearchPicker;
