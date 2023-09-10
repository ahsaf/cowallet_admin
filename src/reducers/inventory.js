

const initialState = {
    inventory:{data:[]},
}
const inventory_reducer = (state = initialState, action)=>{
    switch(action.type){
        case "GET_INVENTORY":
            return {
                ...state,
                parties:action.payload,
            }
            case "DELETE_INVENTORY":
                return {
                    ...state,
                    inventory:state.inventory.filter(li => li.id !== action.payload.id)
                }
            default:
                return state;
    }
}

export default inventory_reducer;

