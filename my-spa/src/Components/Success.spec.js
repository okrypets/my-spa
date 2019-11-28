import React from 'react'
import Success from './Success'
import { shallow} from 'enzyme'

describe('Success container', () => {
    describe('Success container init', () =>{

        const setRouteLeaveHook =jest.fn();

        const success = shallow(<Success.WrappedComponent params={{router:
            setRouteLeaveHook}}/>)


        it('renders only one h1', () => {
            expect(success.find('h1').length).toEqual(1)
        })

        it('renders h1 with text', () => {
            expect(success.find('h1').text()).toEqual('Success! Shopping Cart is empty. Thanks!')
        })
    })
})