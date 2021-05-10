import {GET_DATA, GET_ERROR, SMOH_DATA, SORT_PRIMITIVE_DATA} from "./types";
import axios from "axios";


function primitivesSort(array){
    let newArray = []
    let k = 0;
    const primitives = {}
    for(let i =0; i< array.length; i++){
        if (!(typeof array[i] in primitives))
            primitives[typeof array[i]] = k++
        if(!Array.isArray(newArray[primitives[typeof array[i]]]))
            newArray[primitives[typeof array[i]]]=[]
        newArray[primitives[typeof array[i]]].push(array[i])
    }
    console.log("2")
    return newArray
}

function smoothingArr(objs, newObject){
    for(let i = 0; i<objs.length; i++){
        if(Array.isArray(objs[i])){
            smoothingArr(objs[i], newObject)
        }else{
            newObject.push(objs[i])
        }
    }
    return newObject
}

function smoothing(objs){
    let newArray = []
    if(!Array.isArray(objs)){
        let obj
        for (obj in objs) {
            if(objs.hasOwnProperty(obj)){
                newArray = smoothingArr(objs[obj], newArray)
            }
        }
    }else{
        newArray = smoothingArr(objs, newArray)
    }
    return newArray
}


export const get_data = () =>dispatch=>{
    axios.get("https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json").then(res=>{
        dispatch({
            type: GET_DATA,
            payload: res.data
        })
    }).catch(e=>{
        dispatch({
            type: GET_ERROR,
            payload: e.data
        })
    })
}

export const smoothing_data = () => (dispatch, getState) =>{
    dispatch({
        type: SMOH_DATA,
        payload: smoothing(getState().data.data)
    })
}


export const sort_primitive_data = () => (dispatch, getState) =>{
    dispatch({
        type: SORT_PRIMITIVE_DATA,
        payload: primitivesSort(getState().data.data1)
    })
}