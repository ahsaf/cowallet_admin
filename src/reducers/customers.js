

const initialState = {
    customers:{data:[]},
}
const customer_reducer = (state = initialState, action)=>{
    switch(action.type){
        case "GET_CUSTOMERS":
            return {
                ...state,
                customers:action.payload,
            }
         
            case "DELETE_CUSTOMER":
                return{
                    ...state,
                    customers:{...state.customers,data:state.customers.data.filter(li => li.id !== action.payload)}
                }
            default:
                return state;
    }
}

export default customer_reducer;