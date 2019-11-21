import {PAGINATION_STATE} from "../Actions/paginationAC";

const initState={
        pagination:{
            currentPage:1,
        }
};

export default function paginationReducer(state=initState,action) {
    switch (action.type) {

        case PAGINATION_STATE: {
            let newState = {...state,
                pagination: {...state.pagination,
                    currentPage: action.currentPage,
                    currentProducts: action.currentProducts
                }
            };
            return newState;
        }
    default:
    return state;
    }
}
