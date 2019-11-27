import {SHOPPING_CART_ADD, SHOPPING_CART_REMOVE, SHOPPING_CART_REMOVE_ALL, CART_LOADING, CART_ERROR, CART_SET} from "../Actions/shoppingCartAC";
//import {PRODUCTS_ERROR, PRODUCTS_LOADING, PRODUCTS_SET} from "../Actions/productsAC";

const initState={
        status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
        items: null,
};

export default function shoppingCartReducer(state=initState, action) {
    switch (action.type) {

        case CART_LOADING: {
            //console.log('action:',action);
            //console.log('state до обработки редьюсером:',state);
            let newState;
            newState = {...state,
                status:1,
                items:null
            };
            //console.log('state после обработки редьюсером:',newState);
            return newState;
        }

        case CART_ERROR: {
            //console.log('action:',action);
            //console.log('state до обработки редьюсером:',state);
            let newState;
            newState = {...state,
                status:2,
                items:null,
            };
            //console.log('state после обработки редьюсером:',newState);
            return newState;
        }

        case CART_SET: {
            //console.log('action:',action);
            //console.log('state до обработки редьюсером:',state);
            let newState;
            newState = {...state,
                status:3,
                items:action.shoppingCart,
            };
            //console.log('state после обработки редьюсером:',newState);
            return newState;
        }

        case SHOPPING_CART_ADD: {
            //console.log(action.item.id);
            let isInBasket = state.items.some(i => i.id === action.item.id);
            //console.log(isInBasket);
            let newState;
            if (!isInBasket || state.items.length === 0) {
                newState = {...state,
                    items: [...state.items,
                        action.item
                    ]
                };
            } else {
                newState = {...state,
                    items: [...state.items]
                };
            }
            return newState;
        }

        case SHOPPING_CART_REMOVE: {
            console.log(SHOPPING_CART_REMOVE);
            let deletedItem = state.items.filter(i => i.id !== action.item.id);
            let newState;
            newState = {...state,
                items: [...deletedItem]
            };
            return newState;
        }
        case SHOPPING_CART_REMOVE_ALL: {
            console.log(SHOPPING_CART_REMOVE_ALL);
            //let deletedItem = state.items.filter(i => i.id !== action.item.id);
            let newState;
            newState = {...state,
                items: null
            };
            return newState;
        }

    default:
    return state;
    }
}
