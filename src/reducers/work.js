

const initialState = {
    works:{data:[]},
    deposits:{data:[]},
}
const work_reducer = (state = initialState, action)=>{
    switch(action.type){
            case "GET_WORKS":
                return {
                    ...state,
                    works:action.payload,
                }
                case "DELETE_PROJECT":
                    return{
                        ...state,
                        works:{...state.works,data:state.works.data.filter(li => li.id !== action.payload)}
                    }
                case "GET_DEPOSITS":
                    return {
                        ...state,
                        deposits:action.payload,
                    }
            default:
                return state;
    }
}

export default work_reducer;