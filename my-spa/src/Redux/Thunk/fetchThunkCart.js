import isoFetch from 'isomorphic-fetch';

import { cartLoadingAC, cartErrorAC, cartSetAC,
    //shoppingCartAddAC,
    //shoppingCartRemoveAC,
    //shoppingCartRemoveAllAC
} from "../Actions/shoppingCartAC";



function shoppingCartThunkAC(dispatch) {
    // Как и любой action creator, productsThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.

    return function() {
        dispatch( cartLoadingAC() );
        isoFetch("http://localhost:3004/shoppingCart")
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then( (items) => {
                dispatch( cartSetAC(items) );
            })
            .catch( (error) => {
                console.error(error);
                dispatch( cartErrorAC() );
            })
        ;
    }

}
export {shoppingCartThunkAC};


 // Добравление товара в корзину
function shoppingCartAddThunkAC(item) {
    //let item = shoppingCartAddAC();
    return function() {
        //dispatch( cartLoadingAC() );
        isoFetch("http://localhost:3004/shoppingCart", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        })
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            //.then( (item) => {
            //    shoppingCartAddAC(item);
            //})
            .catch( (error) => {
                console.error(error);
                //dispatch( cartErrorAC() );
            })
        ;
    }

}

export {shoppingCartAddThunkAC};


// Удаление товара из корзины
function shoppingCartDELETEThunkAC(delItem) {
    //let delItem = delItem.id;
    return function() {
        //dispatch(cartSetAC());

        isoFetch("http://localhost:3004/shoppingCart/"+delItem.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            //param: {item}
            //body: JSON.stringify(items)
        })
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            //.then( (delItem) => {
                //dispatch( shoppingCartAddAC(item) );
              //  shoppingCartRemoveAC(delItem);
            //})
            .catch( (error) => {
                console.error(error);
                //dispatch( cartErrorAC() );
            })
        ;
    }

}

export {shoppingCartDELETEThunkAC};

// Удаление товара из корзины
function shoppingCartPUTThunkAC(shoppingCart) {
    console.log(shoppingCart);
    //let amptyShoppingCart = [];
    return function() {
        for (let i = 0; i <shoppingCart.items.length; i++ ) {
            isoFetch("http://localhost:3004/shoppingCart/" + shoppingCart.items[i].id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            })
                .then( (response) => { // response - HTTP-ответ
                    if (!response.ok) {
                        let Err=new Error("fetch error " + response.status);
                        Err.userMessage="Ошибка связи";
                        throw Err;
                    }
                    else
                        return response.json();
                })
                .catch( (error) => {
                    console.error(error);
                })
            ;
        }

    }

}

export {shoppingCartPUTThunkAC};