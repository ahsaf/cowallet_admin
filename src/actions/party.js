import {  Post } from '../services/services';
import { get_company_id  }from './user';
export const add_employee = (post,cb)=>{
    const new_data = {
        name:post.name,
    }
}


export const Get_Parties = (post,cb)=> dispatch =>{
    Post("/user/parties",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_PARTIES",
                payload:res,
                data:post.data
            });
        }
        cb();
    })
}
export const Get_Expenses = (post,cb)=> dispatch =>{
    Post("/expense/expenses",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_EXPENSES",
                payload:res,
                data:post.data
            });
        }
        cb();
    })
}

export const Get_All_Expenses = (post,cb)=> dispatch =>{
    Post("/expense/all-expenses",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_ALL_EXPENSES",
                payload:res,
                data:post.data
            });
        }
        cb();
    })
}

export const Get_All_Purchase = (post,cb)=> dispatch =>{
    Post("/expense/all-purchases",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_ALL_PURCHASE",
                payload:res,
                data:post.data
            });
        }
        cb();
    })
}


export const Get_All_Sales = (post,cb)=> dispatch =>{
    Post("/expense/all-sales",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_ALL_SALES",
                payload:res,
                data:post.data
            });
        }
        cb();
    })
}

export const Get_Project_Incomes = (post,cb) =>{
    Post("/project/projectIncomes",post,(st,res)=>{
        if(st){
            cb(res);
        }else{
            cb([]);
        }
       
    }) 
}   


export const Get_Party_Purchases = (post,cb)=>{
    Post("/expense/singlepartyexpense",post,(st,res)=>{
        if(st){
            cb(res.data);
        }else{
            cb([]);
        }
    })
}




export const Get_Project_Expense = (post,cb) =>{
    Post("/project/projectExpenses",post,(st,res)=>{
        if(st){
            cb(res);
        }else{
            cb([]);
        }
    }) 
}   

export const Get_Project_Purchases = (post,cb) =>{
    Post("/project/projectPurchases",post,(st,res)=>{
        if(st){
            cb(res);
        }else{
            cb([]);
        }
    }) 
}   


export const Get_Payments = (post,cb)=> dispatch =>{
    Post("/expense/payments",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_PAYMENTS",
                payload:res,
            });
        }
        cb();
    })
}