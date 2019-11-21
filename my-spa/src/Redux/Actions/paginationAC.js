//import PropTypes from "prop-types";
//const PAGINATION_CREATE='PAGINATION_CREATE';
const PAGINATION_STATE='PAGINATION_STATE';
/*
const paginationCreate=function(paginationCreate) {
    return {
        type: PAGINATION_CREATE,
        paginationCreate
    };
}

 */

const paginationStateAC=function(currentPageState, currentProductsState ) {
    return {
        type: PAGINATION_STATE,
        currentPage:currentPageState,
        currentProducts:currentProductsState
    };
}

export {
    //paginationStateAC, PAGINATION_STATE
}