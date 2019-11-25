import isoFetch from 'isomorphic-fetch';

import { productsLoadingAC, productsErrorAC, productsSetAC } from "../Actions/productsAC";
//import {shoppingCartAddAC} from '../Actions/shoppingCartAC'

/*
function productsThunkAC(dispatch) {
    // Как и любой action creator, productsThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function() {
        dispatch( productsLoadingAC() );
        isoFetch("http://localhost:3004/posts")
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then( (data) => {
                dispatch( productsSetAC(data) );
            })
            .catch( (error) => {
                console.error(error);
                dispatch( productsErrorAC() );
            })
        ;
    }

}

export {productsThunkAC};


 */

export const productsThunkAC = () => async (dispatch) => {
    dispatch(productsLoadingAC());
    try {

        const response = await isoFetch(`http://localhost:3004/posts`
            , {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    body: JSON.stringify(dispatch)
                }
            }

        );

        if (!response.ok) {
            dispatch(productsErrorAC());
        }
        const data = await response.json();
        dispatch(productsSetAC(data));
    } catch (error) {
        throw error;
    }
};


/*
export const shoppingCartPOSTThunkAC = (shoppingCart) => async (dispatch) => {
    //dispatch(productsLoadingAC());
    try {

        const response = await isoFetch(`http://localhost:3004/shoppingCart`
            , {
                method: "post",
                headers: {
                    //Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(shoppingCart)
            }

        );

        if (!response.ok) {
            console.log("throwing Error");
            //dispatch(productsErrorAC());
            //throw new Error("fetch error " + response.status);
        }
        //const shoppingCart = await response.json();

        console.log("Products success post", shoppingCart);
        dispatch(shoppingCartAddAC(shoppingCart));
    } catch (error) {
        //this.fetchError(error.message);
        console.log("throwing Error", error);
        //dispatch(productsErrorAC());
        throw error;
    }
};



 */
