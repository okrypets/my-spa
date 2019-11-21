const PRODUCTS_LOADING='PRODUCTS_LOADING';
const PRODUCTS_ERROR='PRODUCTS_ERROR';
const PRODUCTS_SET='PRODUCTS_SET';
const IS_PRODUCT_FAVORITE = 'IS_PRODUCT_FAVORITE';

const productsLoadingAC=function() {
    return {
        type: PRODUCTS_LOADING,
    };
}

const productsErrorAC=function() {
    return {
        type: PRODUCTS_ERROR,
    };
}

const productsSetAC=function(products) {
    return {
        type: PRODUCTS_SET,
        products:products,
    };
}

const isProductFavoriteAC=function(item) {
    return {
        type: IS_PRODUCT_FAVORITE,
        item:item,
    };
}


export {
    productsLoadingAC,PRODUCTS_LOADING,
    productsErrorAC,PRODUCTS_ERROR,
    productsSetAC,PRODUCTS_SET,
    isProductFavoriteAC, IS_PRODUCT_FAVORITE,
}
