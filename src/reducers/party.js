

const initialState = {
    parties:{data:[]},
    expenses:{data:[]},
    all_expense:{data:[]},
    all_purchase:{data:[]},
    all_sales:{data:[]},
    payments:{data:[]},
    all_parties:[]
}
const party_reducer = (state = initialState, action)=>{
    switch(action.type){
            case "GET_PARTIES":
                return {
                    ...state,
                    parties:action.payload,
                }
            case "GET_EXPENSES":
                return {
                    ...state,
                    expenses:action.payload,
                }
            case "GET_ALL_PURCHASE":
                return {
                    ...state,
                    all_purchase:action.payload,
                }
            case "GET_ALL_SALES":
                return {
                    ...state,
                    all_sales:action.payload,
                }
            case "GET_ALL_EXPENSES":
                return {
                    ...state,
                    all_expense:action.payload,
                }
            case "GET_PAYMENTS":
                return {
                    ...state,
                    payments:action.payload,
                }
            case "GET_ALL_PARTIES":
                return {
                    ...state,
                    all_parties:action.payload
                }
            case "DELETE_PARTY":
                return{
                    ...state,
                    parties:{...state.parties,data:state.parties.data.filter(li => li.id !== action.payload)}
                }
            default:
                return state;
    }
}

export default party_reducer;