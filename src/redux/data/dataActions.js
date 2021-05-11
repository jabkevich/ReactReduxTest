import {
    GET_DATA,
    GET_ERROR,
    SMOH_DATA,
    SORT_PRIMITIVE_DATA,
    DEFAULT_STATE,
    GET_SMOSH_SORT_DATA,
    CLOSE_MESSAGE,
    ADD_STATE,
    SET_SELECTED,
    SET_CASES, PREV_STATE, NEXT_STATE
} from "./types";
import axios from "axios";


function primitivesSort(array) {
    let newArray = []
    let k = 0;
    const primitives = {}
    for (let i = 0; i < array.length; i++) {
        if (!(typeof array[i] in primitives))
            primitives[typeof array[i]] = k++
        if (!Array.isArray(newArray[primitives[typeof array[i]]]))
            newArray[primitives[typeof array[i]]] = []
        newArray[primitives[typeof array[i]]].push(array[i])
    }
    return newArray
}

function smoothingArr(objs, newObject) {
    for (let i = 0; i < objs.length; i++) {
        if (Array.isArray(objs[i])) {
            smoothingArr(objs[i], newObject)
        } else {
            newObject.push(objs[i])
        }
    }
    return newObject
}

function smoothing(objs) {
    let newArray = []
    if (!Array.isArray(objs)) {
        let obj
        for (obj in objs) {
            if (objs.hasOwnProperty(obj)) {
                newArray = smoothingArr(objs[obj], newArray)
            }
        }
    } else {
        newArray = smoothingArr(objs, newArray)
    }
    return newArray
}


// export const get_data = () =>dispatch=>{
//     axios.get("https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json").then(res=>{
//         dispatch({
//             type: GET_DATA,
//             payload: res.data
//         })
//     }).catch(e=>{
//         dispatch({
//             type: GET_ERROR,
//             payload: e.data
//         })
//     })
// }

// export const smoothing_data = () => (dispatch, getState) =>{
//     dispatch({
//         type: SMOH_DATA,
//         payload: smoothing(getState().data.data)
//     })
// }
//
//
// export const sort_primitive_data = () => (dispatch, getState) =>{
//     dispatch({
//         type: SORT_PRIMITIVE_DATA,
//         payload: primitivesSort(getState().data.data1)
//     })
// }


export const get_data_and_sort = (url) => (dispatch, getState) => {
    axios.get(url ? url : "https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json").then(res => {
        dispatch({
            type: GET_SMOSH_SORT_DATA,
            payload: primitivesSort(smoothing(res.data))
        })
        dispatch({
            type: ADD_STATE,
            payload: add_state(getState)
        })
    }).catch(e => {
        console.log(e)
        dispatch({
            type: GET_ERROR,
            payload: true
        })
    })
    setTimeout(() => dispatch({
        type: CLOSE_MESSAGE,
        payload: false
    }), 5000)
}

export const set_selected = (selected, idSelect) => (dispatch, getState) => {
    dispatch({
        type: SET_SELECTED,
        payload: {selected, idSelect}
    })
    dispatch({
        type: ADD_STATE,
        payload: add_state(getState)
    })
}
export const set_cases = (cases, idCases) => (dispatch, getState) => {
    dispatch({
        type: SET_CASES,
        payload: {cases, idCases}
    })
    dispatch({
        type: ADD_STATE,
        payload: add_state(getState)
    })
}
export const default_state = () => (dispatch, getState) => {
    dispatch({
        type: DEFAULT_STATE
    })
    dispatch({
        type: ADD_STATE,
        payload: add_state(getState)
    })
}
const add_state = getState => {
    const state = {
        data_from_res: getState().data.data_from_res,
        data_smosh: getState().data.data_smosh,
        data_sort: getState().data.data_sort,
        data_ready: getState().data.data_ready,
        error: getState().data.error,
        success: getState().data.success,
        selected: getState().data.selected,
        cases: getState().data.cases,
        idSelect: getState().data.idSelect,
        idCases: getState().data.idCases,
    }
    return state
}

export const prev_state = () => (dispatch, getState) => {
    if (getState().data.head > 0)
        dispatch({
            type: PREV_STATE
        })
}

export const next_state = () => (dispatch, getState) => {
    if (getState().data.head < getState().data.size)
        dispatch({
            type: NEXT_STATE
        })
}