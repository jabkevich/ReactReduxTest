import {
    GET_DATA,
    GET_ERROR,
    SMOH_DATA,
    SORT_PRIMITIVE_DATA,
    DEFAULT_STATE,
    GET_SMOSH_SORT_DATA,
    CLOSE_MESSAGE,
    ADD_STATE,
    PREV_STATE,
    NEXT_STATE,
    SET_CASES,
    SET_SELECTED
} from "./types";


const initialState = {
    data_from_res: null,
    data_smosh: null,
    data_sort: null,
    data_ready: null,
    error: null,
    success: null,
    selected: [],
    cases: null,
    idSelect: "DEFAULT",
    idCases: "DEFAULT",
    states: [
        {
            data_from_res: null,
            data_smosh: null,
            data_sort: null,
            data_ready: null,
            selected: null,
            cases: null,
            idSelect: "DEFAULT",
            idCases: "DEFAULT",
        }
    ],
    head: 0,
    size: 0
}


const setState = (state, plus) =>{
    return{
        ...state,
        data_from_res: state.states[state.head + plus].data_from_res,
        data_smosh: state.states[state.head + plus].data_smosh,
        data_sort: state.states[state.head + plus].data_sort,
        data_ready: state.states[state.head + plus].data_ready,
        selected: state.states[state.head + plus].selected,
        cases: state.states[state.head + plus].cases,
        idSelect: state.states[state.head + plus].idSelect,
        idCases: state.states[state.head + plus].idCases,
        head: state.head+plus,
    }
}

export const data_reducer = (state=initialState, action)=>{
    switch (action.type){
        case NEXT_STATE:
            return setState(state, 1)
        case PREV_STATE:
            return setState(state, -1)
        case ADD_STATE:
            const states = [...state.states]
            let headplus
            if(state.head+1 === 10){
                states.shift()
                states[state.head] = action.payload
                headplus = 0
            }else{
                states[state.head+1] = action.payload
                headplus = 1
            }
            return {
                ...state,
                states: states,
                head: state.head+headplus,
                size: state.head+headplus
            }
        case SET_CASES:
            console.log(action.payload.idCases)
            return {
                ...state,
                cases: action.payload.cases,
                idCases: action.payload.idCases,
                idSelect: "DEFAULT",
                selected: null

            }
        case SET_SELECTED:
            return {
                ...state,
                selected: [...state.selected, action.payload.selected],
                idSelect: action.payload.idSelect
            }
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
        case DEFAULT_STATE:
            return{
                ...state,
                data_from_res: null,
                data_smosh: null,
                data_sort: null,
                data_ready: null,
                error: null,
                success: null,
                selected: [],
                cases: null,
                idSelect: "DEFAULT",
                idCases: "DEFAULT",
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