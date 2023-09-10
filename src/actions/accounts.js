import {Post } from '../services/services';

export const Get_Accounts = (post,cb)=> dispatch =>{
    Post("/account/list",{},(st,res)=>{
        if(st){
            dispatch({
                type:"GET_ACCOUNTS",
                payload:res.data,
            });
        }
        cb();
    })
}

export const Get_Account_Transactions = (post,cb) =>{
    Post("/account/transactions",post,(st,res)=>{
      
        if(st){
            cb(res.data);
        }else{
            cb([]);
        }
       
    })
}
