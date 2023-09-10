

const initialState = {
    list:[],
}
const party_reducer = (state = initialState, action)=>{
    switch(action.type){
           
            case "DELETE_PARTY":
                return {
                    ...state,
                    list:state.list.filter(li => li.id !== action.payload.id)
                }
            case "DELETE_ACCOUNT":
                return {
                    ...state,
                    list:state.list.filter(li => li.id !== action.payload)
                }
            case "GET_ACCOUNTS":
                return {
                    ...state,
                    list:action.payload
                }
            default:
                return state;
    }
}

export default party_reducer;