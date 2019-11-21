import { combineReducers } from 'redux'
import { connectRouter} from 'connected-react-router'
import productsReducer from "./productsReducer";
//import paginationReducer from "./paginationReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    products: productsReducer,
    //pagination: paginationReducer
})