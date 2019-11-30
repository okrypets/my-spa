import React from 'react'
import PageShop from './PageShop'
import { shallow, mount } from 'enzyme'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe('PageShop container', () => {
    const props = {
        products: {
            data: [],
            status: null,
        },
        //productsThunkAC: () => {}, // нам не важно как выглядит функция на самом деле
    }


    describe('PageShop container init', () =>{
        const setRouteLeaveHook =jest.fn();
        const pageShop = shallow(<Provider store={store}><PageShop {...props} params={{router: setRouteLeaveHook}}/></Provider>)

        it('not render div[class="PageShop"]', () => {
            expect(pageShop.find('div[class="PageShop"]')).toHaveLength(0) // .find + поиск по тэгу
        })

        it('not render ShopCatalog component', () => {
            expect(pageShop.find('ShopCatalog')).toHaveLength(0) // .find + поиск по имени компонента
        })
    })

    describe('PageShop isLoading status 1', () => {
        const props = {
            products: {
                data: [],
                status: 1,
            },
            //productsThunkAC: () => {}, // нам не важно как выглядит функция на самом деле
        }

        const setRouteLeaveHook =jest.fn();
        const pageShop = shallow(<Provider store={store}><PageShop props={props} params={{router: setRouteLeaveHook}}/></Provider>)
        //pageShop.update();

        //it('renders preloader img', () => {
        //    expect(pageShop.find('img')).toEqual('<img src="../loader.gif" alt="Загрузка данных">')
        //})

        //it('renders only one img', () => {
        //    expect(pageShop.find('img').length).toEqual(1)
        //})

        it('not render  ShopCatalog component', () => {
            expect(pageShop.find('ShopCatalog')).toHaveLength(0)
        })
    })
});