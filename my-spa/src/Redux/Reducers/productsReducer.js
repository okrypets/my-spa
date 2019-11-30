
import {PRODUCTS_LOADING, PRODUCTS_ERROR, PRODUCTS_SET,
    IS_PRODUCT_FAVORITE
} from '../Actions/productsAC';

const initState={
    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    data: null,
}

export default function productsReducer(state=initState,action) {

    switch (action.type) {

        case PRODUCTS_LOADING: {
            let newState;
            newState = {...state,
                status: 1,
                data:null
            };
            return newState;
        }

        case PRODUCTS_ERROR: {
            let newState;
            newState = {...state,
                status:2,
            };
            return newState;
        }

        case PRODUCTS_SET: {
            let newState;
            newState = {...state,
                status:3,
                data:action.products,
            };
            return newState;
        }

        case IS_PRODUCT_FAVORITE: {
            let itemIndex = state.data.findIndex(i => i.id === action.item.id);

            let newState;
            if (itemIndex === 0) {
                newState = {...state,
                status:state.status,
                data: [
                    action.item,
                    ...state.data.slice(1),
                ]
            };
            } else if (itemIndex === state.data.length-1) {
                newState = {...state,
                    status:state.status,
                    data: [
                        ...state.data.slice(0,state.data.length-1),
                        action.item
                    ]
                };

            } else {
                newState = {...state,
                    status:state.status,
                    data: [
                        ...state.data.slice(0,itemIndex),
                        action.item,
                        ...state.data.slice(itemIndex+1, state.data.length),
                    ]
                };
            }
            return newState;
        }
        default:
            return state;
    }
}