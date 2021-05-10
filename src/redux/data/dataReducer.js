import {GET_DATA, GET_ERROR, SMOH_DATA, SORT_PRIMITIVE_DATA} from "./types";

const initialState = {
    data: null,
    data1: null,
    data2: null,
    error: null
}

export const data_reducer = (state=initialState, action)=>{
    switch (action.type){
        case GET_DATA:
            return{
                ...state,
                data: action.payload
            }
        case GET_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case SMOH_DATA:
            return{
                ...state,
                data1: action.payload
            }
        case SORT_PRIMITIVE_DATA:
            return{
                ...state,
                data2: action.payload
            }
        default:
            return state
    }
}