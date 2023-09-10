import { Get_data_by_id,Get_filter_data_obj,Delete_Doc, Update, Create, Get_Server_time, Post } from '../services/services';
import { get_company_id  }from './user';
export const add_employee = (post,cb)=>{
    const new_data = {
        name:post.name,
    }
}


export const Get_Employees = (post,cb)=> dispatch =>{
   Post("/user/employees",post,(st,res)=>{
       if(st){
        dispatch({
            type:"GET_EMPLOYEES",
            payload:res,
            data:post
        });
       }
        cb();
    })
}

export const Get_FullAttendece = (post,cb)=> dispatch =>{
    Post("/employeework/attendecelist",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_ATTENDENCE",
                payload:res,
                data:post.data
            });
        }
        cb();
    })
}


export const Get_Employee_works = (post,cb)=>{
    Post("/employeework/singleemployeeworks",post,(st,res)=>{
        if(st){
            cb(res.data);
        }else{
            cb([]);
        }
    })
}


export const Get_Project_employee_works = (post,cb) =>{
    Post("/project/projectEmployeeWorks",post,(st,res)=>{
        if(st){
            cb(res);
        }else{
            cb([]);
        }
       
    }) 
}   