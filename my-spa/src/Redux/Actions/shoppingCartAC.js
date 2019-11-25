const CART_LOADING='CART_LOADING';
const CART_ERROR='CART_ERROR';
const CART_SET='CART_SET';
const SHOPPING_CART_ADD='SHOPPING_CART_ADD';
const SHOPPING_CART_REMOVE='SHOPPING_CART_REMOVE';
const SHOPPING_CART_REMOVE_ALL='SHOPPING_CART_REMOVE_ALL';


const cartLoadingAC=function() {
    return {
       type: CART_LOADING,
    };
};

const cartErrorAC=function() {
    return {
        type: CART_ERROR,
    };
};

const cartSetAC=function(shoppingCart) {
    return {
        type: CART_SET,
        shoppingCart:shoppingCart,
    };
};


const shoppingCartAddAC=function(item) {
    return {
        type: SHOPPING_CART_ADD,
        item:item,
    };
}

const shoppingCartRemoveAC=function(delItem) {
    return {
        type: SHOPPING_CART_REMOVE,
        item:delItem,
    };
}


const shoppingCartRemoveAllAC=function() {
    return {
        type: SHOPPING_CART_REMOVE_ALL,
    };
}

export {
    cartLoadingAC,CART_LOADING,
    cartErrorAC,CART_ERROR,
    cartSetAC,CART_SET,
    shoppingCartAddAC, SHOPPING_CART_ADD,
    shoppingCartRemoveAC, SHOPPING_CART_REMOVE,
    shoppingCartRemoveAllAC, SHOPPING_CART_REMOVE_ALL,
}