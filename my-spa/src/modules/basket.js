export const BASKET_ITEMS = 'basket/INCREMENT_REQUESTED';

const initialState = {
    basketItems: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BASKET_ITEMS:
            return {
                ...state,
            }
        default:
            return state
    }
}
export const basket_items = () => {
    return dispatch => {
        dispatch({
            type: BASKET_ITEMS
        })

    }
}