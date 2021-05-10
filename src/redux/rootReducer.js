import {combineReducers} from "redux";
import {data_reducer} from "./data/dataReducer";

export const rootReducer = combineReducers({
    data: data_reducer
})