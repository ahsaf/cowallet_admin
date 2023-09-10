import {  Post } from '../services/services';


export const Get_Equipments = (post,cb)=> dispatch =>{
   Post("/equipment/list",post,(st,res)=>{
       if(st){
        dispatch({
            type:"GET_EQUIPMENTS",
            payload:res,
        });
       }
        cb();
    })
}
export const Get_All_Equipments_Mapping = (post,cb)=> dispatch =>{
    Post("/equipment/GetAllProjectMapping",post,(st,res)=>{
        if(st){
         dispatch({
             type:"GET_ALL_EQUIPMENTS_MAPPING",
             payload:res.data,
         });
        }
         cb();
     })
 }
 export const Delete_Tool = (id)=> dispatch =>{
    Post("/equipment/delete",{id:id},(st,res)=>{});
    dispatch({
        type:"DELETE_TOOL",
        payload:id,
    });
 }
 

export const Get_Project_Equipments = (post,cb) =>{
    Post("/equipment/project_equipment_list",post,(st,res)=>{
        if(st){
            cb(res.data);
        }else{
            cb([]);
        }
     })
 }
