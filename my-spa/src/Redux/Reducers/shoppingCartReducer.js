import {SHOPPING_CART_ADD, SHOPPING_CART_REMOVE, SHOPPING_CART_REMOVE_ALL, CART_LOADING, CART_ERROR, CART_SET} from "../Actions/shoppingCartAC";
//import {PRODUCTS_ERROR, PRODUCTS_LOADING, PRODUCTS_SET} from "../Actions/productsAC";

const initState={
        status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
        items: null,
};

export default function shoppingCartReducer(state=initState, action) {
    switch (action.type) {

        case CART_LOADING: {
            let newState;
            newState = {...state,
                status:1,
                items:null
            };
            return newState;
        }

        case CART_ERROR: {
            let newState;
            newState = {...state,
                status:2,
                items:null,
            };
            return newState;
        }

        case CART_SET: {
            let newState;
            newState = {...state,
                status:3,
                items:action.shoppingCart,
            };
            return newState;
        }

        case SHOPPING_CART_ADD: {
            let newState;
            newState = {...state,
                items: [...state.items,
                    action.item
                ]
            };

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
