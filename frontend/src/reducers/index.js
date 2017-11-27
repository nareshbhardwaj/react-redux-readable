import { combineReducers } from 'redux'
import categoryreducer from "./categoryreducer";
import commentreducer from "./commentreducer";
import postreducer from "./postreducer";

export default combineReducers({
    categoryreducer,
    commentreducer,
    postreducer
})