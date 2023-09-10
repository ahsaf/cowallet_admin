

const initialState = {
    list:{data:[]},
    allEquipmentMapping:[]
}
const equipment_reducer = (state = initialState, action)=>{
    switch(action.type){
            case "GET_EQUIPMENTS":
                return {
                    ...state,
                    list:action.payload,
                }
            case "GET_ALL_EQUIPMENTS_MAPPING":
                return {
                    ...state,
                    allEquipmentMapping:action.payload,
                }
            case "DELETE_TOOL":
                return {
                    ...state,
                    list:{...state.list,data:state.list.data.filter(li => li.id !== action.payload)}
                }
            default:
                return state;
    }
}

export default equipment_reducer;