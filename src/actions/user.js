
import { GetAuthApi, Post } from '../services/services';

import store from '../store';

export const login = (post,cb)=> dispatch =>{
    Post("/user/login",post,(st,res)=>{
        if(st){
            if(res.status === "Success"){
                dispatch({
                    type:"LOGIN",
                    payload:res,
                });
                // localStorage.setItem('user', JSON.stringify({
                //     token:res.token, uid: res.id
                // }))
                localStorage.setItem('token',res.token);
                // .then(tt => {
                    cb(true);
                // }).catch(e =>{
                    // cb(false)
                // });
            }else{
                cb(false)
            }
        }else{
            cb(false)
        }
    })
}

export const Update_user =(post) => dispatch =>{
    dispatch({
        type:'LOGIN',
        payload:post
    });
}

export const get_company_id = ()=>{
    if(store.getState().user.user.role === "Admin" || store.getState().user.user.role === "SuperAdmin"){
        return store.getState().user.user.id;
    }else if(store.getState().user.user.company_id){
        return store.getState().user.user.company_id;
    }
    return "ERROR";
}

export const Get_Users = (post,cb)=> dispatch =>{
    Post("/admin/users",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_USERS",
                payload:res,
            });
        }
        cb();
    })
}

export const Get_Admins = (post,cb)=> dispatch =>{
    Post("/admin/admins",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_ADMINS",
                payload:res
            });
        }
        cb();
    })
}

export const Get_Dashboard = ()=> dispatch =>{
    GetAuthApi("/general/dashboard",(st,res)=>{
        if(st){
            dispatch({
                type:"GET_DASHBOARD",
                payload:res.data?res.data:{},
            });
        }
    })
}
export const Get_Roles = ()=> dispatch =>{
    GetAuthApi("/admin/roles",(st,res)=>{
        if(st){
            dispatch({
                type:"GET_ROLES",
                payload:res.data?res.data:[],
            });
        }
    })
}

