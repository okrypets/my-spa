import React from 'react'
import ShopCatalog from './ShopCatalog'
import { shallow, mount } from 'enzyme'
import {CATALOG_ITEM} from "../pages/PageShop";
import productsData from '../../api/posts'

describe('ShopCatalog container', () => {
    describe('ShopCatalog container init', () =>{
        const props = {
            search: '',
            currentPage:1,
            products: productsData,
            showMode: CATALOG_ITEM,
        }
        const setRouteLeaveHook =jest.fn();

        const shopCatalog = shallow(<ShopCatalog.WrappedComponent {...props} params={{router:
            setRouteLeaveHook}}/>)


        it('renders only one div.ShopCatalog', () => {
            expect(shopCatalog.find('div.ShopCatalog').length).toEqual(1)
        })

        it('renders only one div.sortingBlock', () => {
            expect(shopCatalog.find('Sorting')).toHaveLength(1);
        })

        it('renders only one div.ShopCatalogItem', () => {
            expect(shopCatalog.find('ShopCatalogItem')).toHaveLength(1)
        })

    })
})