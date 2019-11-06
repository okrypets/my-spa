import { combineReducers } from 'redux'
import { connectRouter} from 'connected-react-router'
import basket from './basket'

export default (history) => combineReducers({
    router: connectRouter(history),
    basket
})