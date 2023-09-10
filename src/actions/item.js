import {  Post } from '../services/services';


export const Get_Items = (post,cb)=> dispatch =>{
   Post("/item/list",post,(st,res)=>{
       if(st){
        dispatch({
            type:"GET_ITEMS",
            payload:res,
        });
       }
        cb();
    })
}

export const Get_Item_Sales = (post,cb) =>{
    Post("/item/sales",post,(st,res)=>{
        if(st){
            cb(res.data);
        }else{
            cb([]);
        }
     })
 }

 export const Get_Item_Employee_Works = (post,cb) =>{
    Post("/item/employee_works",post,(st,res)=>{
        if(st){
            cb(res.data);
        }else{
            cb([]);
        }
     })
 }
 export const Get_Item_Expenses = (post,cb) =>{
    Post("/item/expenses",post,(st,res)=>{
        if(st){
            cb(res.data);
        }else{
            cb([]);
        }
     })
 }
