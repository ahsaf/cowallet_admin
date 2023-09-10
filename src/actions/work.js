import { Post } from '../services/services';

export const Get_Works = (post,cb)=> dispatch =>{
        console.log("called")
        Post("/project/list",post,(st,res)=>{
            if(st){
                dispatch({
                    type:"GET_WORKS",
                    payload:res,
                });
            }
            cb(res);
        })
}



export const Add_Work = (post,cb) =>{
    Post("",post,cb);
}

export const Get_Deposits = (post,cb)=> dispatch =>{
    Post("/project/deposits",post,(st,res)=>{
        if(st){
            dispatch({
                type:"GET_DEPOSITS",
                payload:res,
            });
        }
        cb();
    })
}