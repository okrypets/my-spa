import {SHOPPING_CART_ADD, SHOPPING_CART_REMOVE, SHOPPING_CART_REMOVE_ALL} from "../Actions/shoppingCartAC";

const initState={
        items:[],
};

export default function shoppingCartReducer(state=initState, action) {
    switch (action.type) {

        case SHOPPING_CART_ADD: {
            console.log(action.item.id);
            let isInBasket = state.items.some(i => i.id === action.item.id);
            console.log(isInBasket);
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
                items: []
            };
            return newState;
        }

    default:
    return state;
    }
}
