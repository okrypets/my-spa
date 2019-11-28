import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {shoppingCartThunkAC} from '../Thunk/fetchThunkCart'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import items from '../../../api/shoppingCart'
import {
    CART_ERROR,
    CART_LOADING,
    CART_SET,
} from "./shoppingCartAC";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shoppingCart thunk action', () => {
    describe('actions', () => {

        afterEach(() => {
            fetchMock.reset()
            fetchMock.restore()
        })


        it('creates CART_SET when fetching products has been done', () => {
            fetchMock.getOnce(`http://localhost:3004/shoppingCart`, {
                headers: { 'content-type': 'application/json' },
                body: { items, status: 'ok' },
            })

            const expectedActions = [
                {
                    type: CART_LOADING,
                },
                {
                    type: CART_ERROR,
                },
                {
                    shoppingCart: items,
                    type: CART_SET,
                }
            ]

            const store = mockStore({});

            return store.dispatch(shoppingCartThunkAC()).then(() => {
                // ожидаем, что список всех экшенов полученный с помощью store.getActions()
                // будет равен нашему массиву expectedActions
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})