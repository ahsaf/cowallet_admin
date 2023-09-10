
import {  Post } from '../services/services';

export const add_employee = (post,cb)=>{
    const new_data = {
        name:post.name,
    }
}


export const Get_Customers = (post,cb)=> dispatch =>{
    Post("/user/customers",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_CUSTOMERS",
                payload:res,
            });
        }
        cb();
    })
}


