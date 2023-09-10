import {  Post } from '../services/services';

export const Get_Inventory = (post,cb)=> dispatch =>{
    Post("/item/list",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_INVENTORY",
                payload:res,
                data:post.data
            });
        }
        cb();
    })
}

