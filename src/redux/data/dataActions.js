import {
    GET_ERROR,
    DEFAULT_STATE,
    GET_SMOSH_SORT_DATA,
    CLOSE_MESSAGE,
    SET_SELECTED,
    PREV_STATE,
    NEXT_STATE
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

/*    //////////////////////////////////////////////////////////////////// */


export const get_data_and_sort = () => (dispatch, getState) => {
    axios.get("https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json").then(res => {
        dispatch({
            type: GET_SMOSH_SORT_DATA,
            payload: primitivesSort(smoothing(res.data))
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

export const set_selected = (selected) => (dispatch, getState) => {
    dispatch({
        type: SET_SELECTED,
        payload: selected
    })
}

export const default_state = () => (dispatch, getState) => {
    dispatch({
        type: DEFAULT_STATE
    })
}

export const prev_state = () => (dispatch, getState) => {
    if (getState().data.head > 0)
        dispatch({
            type: PREV_STATE
        })
}

export const next_state = () => (dispatch, getState) => {
    if (getState().data.head + 1 < getState().data.size)
        dispatch({
            type: NEXT_STATE
        })
}