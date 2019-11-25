import { combineReducers } from 'redux'
import { connectRouter} from 'connected-react-router'
import productsReducer from "./productsReducer";
import shoppingCartReducer from "./shoppingCartReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    products: productsReducer,
    shoppingCart: shoppingCartReducer,
})