import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {productsThunkAC} from '../Thunk/fetchThunkProducts'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import {PRODUCTS_LOADING, PRODUCTS_SET} from "./productsAC";
import data from '../../../api/posts'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('products thunk action', () => {
    describe('async actions', () => {

        afterEach(() => {
            fetchMock.reset()
            fetchMock.restore()
        })


        it('creates PRODUCTS_SET when fetching products has been done', () => {
            fetchMock.getOnce(`http://localhost:3004/posts`, {
                headers: { 'content-type': 'application/json' },
                body: { data, status: 'ok' },
            })

            const expectedActions = [
                {
                    type: PRODUCTS_LOADING,
                },
                {
                    products: data,
                    type: PRODUCTS_SET,
                },
            ]

            const store = mockStore({});

            return store.dispatch(productsThunkAC()).then(() => {
                // ожидаем, что список всех экшенов полученный с помощью store.getActions()
                // будет равен нашему массиву expectedActions
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})
