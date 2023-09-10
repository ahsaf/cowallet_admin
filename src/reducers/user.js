

const initialState = {
    users:{},
    admins:{},
    offers:[],
    acc_users:[],
    user:{},
    permissions:{},
    general:{},
    orders:[],
    delete_modal:false,
    loading:false,
    dashboard:{},
    roles:[]
}
const user_reducer = (state = initialState, action)=>{
    switch(action.type){
       
        case "LOGIN":
            return{
                ...state,
                user:action.payload,
                permissions:action.payload && action.payload.permissions?action.payload.permissions:{},
                loading:false
            }
        case "GET_GEN_DOC":
            return{
                ...state,
                general:action.payload,
            }
        case "GET_ROLES":
            return{
                ...state,
                roles:action.payload,
            }
        case "GET_DASHBOARD":
            return{
                ...state,
                dashboard:action.payload,
            }
            case "GET_USERS":
                return {
                    ...state,
                    users:action.payload,
                }
            case "GET_ADMINS":
                return {
                    ...state,
                    admins:action.payload,
                }
            case "DELETE_USER":
                return {
                    ...state,
                    users:{...state.users,data:state.users.data.filter(li => li.id !== action.payload)}
                }
            
     
            case 'SHOW_DELETE_MODAL':
                return{
                    ...state,
                    delete_modal:action.payload,                    
                }
            case "GET_USER_ORDERS":
                let old_items2 = action.payload; 
                if(action.data){
                    old_items2 = [...state.orders,...action.payload]
                }
                return {
                    ...state,
                    orders:old_items2,
                }
        default:
            return state;
    }
   
    
}

export default user_reducer;