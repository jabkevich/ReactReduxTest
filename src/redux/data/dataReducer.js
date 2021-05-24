import {
    GET_ERROR,
    DEFAULT_STATE,
    GET_SMOSH_SORT_DATA,
    CLOSE_MESSAGE,
    PREV_STATE,
    NEXT_STATE,
    SET_SELECTED
} from "./types";
const DEFAULT = "DEFAULT"
const max_head = 9

const default_state = {
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

const initialState = {
    head: 0,
    size: 1,
    state: [
        {
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
    ]
}



const setState = (state) => {
    return {
        ...state,
        data_from_res: state.data_from_res,
        data_smosh: state.data_smosh,
        data_sort: state.data_sort,
        data_ready: state.data_ready,
        error: state.error,
        success: state.success,
        selected: state.selected,
        cases: state.cases,
        idSelect: state.idSelect,
        idCases: state.idCases,
    }
}

const addState = (key, payload, state) => {
    if(key===DEFAULT){
        const new_state = [...state.state]
        new_state[state.head + 1] = payload
        if (state.head === max_head) new_state.shift()
        return new_state;
    }
    const new_state = [...state.state]
    new_state[state.head + 1] = setState(new_state[state.head])
    if (Array.isArray(new_state[state.head + 1][key]))
        new_state[state.head + 1][key] = [...new_state[state.head + 1][key], payload]
    else
        new_state[state.head + 1][key] = payload
    if (state.head === max_head) new_state.shift()
    return new_state;
}

export const data_reducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_STATE:
            return {
                ...state,
                head: state.head + 1
            }
        case PREV_STATE:
            return {
                ...state,
                head: state.head - 1
            }
        case SET_SELECTED:
            return {
                ...state,
                state: addState("selected", action.payload, state),
                head: state.head === max_head ? state.head : state.head + 1,
                size: state.size === max_head + 1 ? state.size : state.size + 1,
            }
        case GET_ERROR:
            return {
                ...state,
                error: true
            }
        case CLOSE_MESSAGE:
            return {
                ...state,
                error: false,
                success: false,
            }
        case DEFAULT_STATE:
            return {
                ...state,
                state:  addState(DEFAULT, default_state, state),
                head: state.head === max_head ? state.head : state.head + 1,
                size: state.size === max_head + 1 ? state.size : state.size + 1

            }
        case GET_SMOSH_SORT_DATA:
            return {
                ...state,
                state: addState("data_ready", action.payload, state),
                head: state.head === max_head ? state.head : state.head + 1,
                size: state.size === max_head + 1 ? state.size : state.size + 1,
                success: true
            }
        default:
            return state
    }
}