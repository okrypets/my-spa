
import {PRODUCTS_LOADING, PRODUCTS_ERROR, PRODUCTS_SET,
    //IS_PRODUCT_FAVORITE
} from '../Actions/productsAC';

const initState={
    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    data: null,
}

export default function productsReducer(state=initState,action) {
    switch (action.type) {

        case PRODUCTS_LOADING: {
            console.log('action:',action);
            console.log('state до обработки редьюсером:',state);
            let newState = {...state,
                status:1,
                data:null
            };
            console.log('state после обработки редьюсером:',newState);
            return newState;
        }

        case PRODUCTS_ERROR: {
            console.log('action:',action);
            console.log('state до обработки редьюсером:',state);
            let newState = {...state,
                status:2,
                data:null,
            };
            console.log('state после обработки редьюсером:',newState);
            return newState;
        }

        case PRODUCTS_SET: {
            console.log('action:',action);
            console.log('state до обработки редьюсером:',state);
            let newState = {...state,
                status:3,
                data:action.products,
            };
            console.log('state после обработки редьюсером:',newState);
            return newState;
        }
/*
        case IS_PRODUCT_FAVORITE: {
            console.log('action:',action);
            console.log('state до обработки редьюсером:',state);
            let newState = {...state,
                status:3,
                data: [
                    ...state.data,
                    {...state.item,
                        [action.item]: state.data[action.item],
                    [action.isFavorite]: state.data[action.isFavorite]
                    }
                ]
            };
            console.log('state после обработки редьюсером:',newState);
            return newState;
        }

 */

        default:
            return state;
    }
}