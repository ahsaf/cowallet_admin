

const initialState = {
    employees:{ data:[]},
    all_employees:[],
    fullworks:{data:[]}
}
const employee_reducer = (state = initialState, action)=>{
    switch(action.type){
            case "GET_EMPLOYEES":
                return {
                    ...state,
                    employees:action.payload,
                }
            case "GET_ATTENDENCE":
                return {
                    ...state,
                    fullworks:action.payload,
                }
            case "DELETE_EMPLOYEE":
                return{
                    ...state,
                    employees:{...state.employees,data:state.employees.data.filter(li => li.id !== action.payload)}
                }
            case "GET_ALL_EMPLOYEES":
                return {
                    ...state,
                    all_employees:action.payload
                }
            default:
                return state;
    }
}

export default employee_reducer;