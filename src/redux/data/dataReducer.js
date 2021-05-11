import {GET_DATA, GET_ERROR, SMOH_DATA, SORT_PRIMITIVE_DATA, GET_SMOSH_SORT_DATA, CLOSE_MESSAGE} from "./types";

const initialState = {
    data_from_res: null,
    data_smosh: null,
    data_sort: null,
    data_ready: null,
    error: null,
    success: null
}

export const data_reducer = (state=initialState, action)=>{
    switch (action.type){
        case GET_DATA:
            return{
                ...state,
                data_from_res: action.payload
            }
        case GET_ERROR:
            return{
                ...state,
                error: true
            }
        case CLOSE_MESSAGE:
            return{
                ...state,
                error:false,
                success: false,
            }
        case SMOH_DATA:
            return{
                ...state,
                data_smosh: action.payload
            }
        case SORT_PRIMITIVE_DATA:
            return{
                ...state,
                data_sort: action.payload
            }
        case GET_SMOSH_SORT_DATA:
            return{
                ...state,
                data_ready: action.payload,
                success: true
            }
        default:
            return state
    }
}