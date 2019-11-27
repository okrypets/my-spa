import isoFetch from 'isomorphic-fetch';

import { productsLoadingAC, productsErrorAC, productsSetAC } from "../Actions/productsAC";
//import {shoppingCartAddAC} from '../Actions/shoppingCartAC'



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

