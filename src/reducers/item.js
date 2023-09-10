

const initialState = {
    list:{data:[{name:"JCB",rate:200,id:1,unit:"Hour"}]},
}
const item_reducer = (state = initialState, action)=>{
    switch(action.type){
            case "GET_ITEMS":
                return {
                    ...state,
                    list:action.payload,
                }
            default:
                return state;
    }
}

export default item_reducer;