const SHOPPING_CART_ADD='SHOPPING_CART_ADD';
const SHOPPING_CART_REMOVE='SHOPPING_CART_REMOVE';
const SHOPPING_CART_REMOVE_ALL='SHOPPING_CART_REMOVE_ALL';


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
    shoppingCartAddAC, SHOPPING_CART_ADD,
    shoppingCartRemoveAC, SHOPPING_CART_REMOVE,
    shoppingCartRemoveAllAC, SHOPPING_CART_REMOVE_ALL,
}