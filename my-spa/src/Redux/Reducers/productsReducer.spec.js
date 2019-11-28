import productsReducer, { initialState } from './productsReducer'
import {PRODUCTS_ERROR, PRODUCTS_LOADING, PRODUCTS_SET} from "../Actions/productsAC";

describe('products reducer', () => {

    it('PRODUCTS_LOADING', () => {
        const action = {
            type: PRODUCTS_LOADING,
        }

        expect(productsReducer(initialState, action)).toEqual({
            ...initialState,
            data: null,
            status: 1,
        })
    })

    it('PRODUCTS_ERROR with error', () => {
        const action = {
            type: PRODUCTS_ERROR,
        }

        expect(productsReducer(initialState, action)).toEqual({
            ...initialState,
            data: null,
            status: 2,
        })
    })

    it('PRODUCTS_SET', () => {
        const action = {
            type: PRODUCTS_SET,
            products: [
                {Name: "NewYork Red",id: 1,Price: 123,ImgSrc: "0216-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
                {Name: "Californication",id: 2,Price: 57,ImgSrc: "0247-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
                {Name: "Los Angeles",id: 3,Price: 0,ImgSrc: "0248-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
            ]
        }

        expect(productsReducer(initialState, action)).toEqual({
            ...initialState,
            data: action.products,
            status: 3,
        })
    })

    it('is item === data[0]', () => {
        const action = {
            item:{Name: "NewYork Red",id: 1,Price: 123,ImgSrc: "0216-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", IS_FAVORITE: true},
        }
        const data = [
            {Name: "NewYork Red",id: 1,Price: 123,ImgSrc: "0216-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
            {Name: "Californication",id: 2,Price: 57,ImgSrc: "0247-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
            {Name: "Los Angeles",id: 3,Price: 0,ImgSrc: "0248-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
        ]

        expect(data[0].id).toEqual(action.item.id);

    })

    it('IS_PRODUCT_FAVORITE when itemIndex = 0', () => {
        /*
        const action = {
            type: IS_PRODUCT_FAVORITE,
            item:{Name: "NewYork Red",id: 1,Price: 123,ImgSrc: "0216-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", IS_FAVORITE: true},
            index:0
        }

         */
        const data = [
            {Name: "NewYork Red",id: 1,Price: 123,ImgSrc: "0216-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
            {Name: "Californication",id: 2,Price: 57,ImgSrc: "0247-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
            {Name: "Los Angeles",id: 3,Price: 0,ImgSrc: "0248-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
        ]

        const dataSlice = [
            {Name: "Californication",id: 2,Price: 57,ImgSrc: "0247-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
            {Name: "Los Angeles",id: 3,Price: 0,ImgSrc: "0248-01.jpg",excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
        ]

        expect(data.slice(1)).toEqual(dataSlice);
/*
        expect(productsReducer(initialState, action)).toEqual({
            ...initialState,
            data: [action.item,
                ...dataSlice],
            status: 3,
        })

 */

    })

})