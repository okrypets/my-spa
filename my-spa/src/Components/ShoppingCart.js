import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import ShoppingCartItem from "./ShoppingCartItem";
import CheckOut from './CheckOut';
import {appEvents} from "./events";
import './ShoppingCart.scss'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ShoppingCart extends PureComponent {

    static propTypes = {
        shoppingCart: PropTypes.array,
        success:PropTypes.bool,
        history: PropTypes.object.isRequired,
    }

    state = {
        shoppingCartProducts: this.props.shoppingCart,
        success:true,
    }

    componentDidMount() {
        appEvents.addListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.addListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);
    }

    componentWillUnmount() {
        appEvents.removeListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.removeListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);
    }


    deleteItemFromShoppingCart = (delItem) => {
        const {shoppingCartProducts} = this.state;
        let newshoppingCartProducts = [...shoppingCartProducts].filter(i => i.id !== delItem.id);
        this.setState({
            shoppingCartProducts: newshoppingCartProducts,
        });
    }

    deleteAllFromShoppingCartAfterSubmit =() => {
        this.setState({
            shoppingCartProducts: [],
            success:true,
        }, () => this.successSubmit());
    }

    successSubmit = () => {
        const {success} = this.state;
        const {history} = this.props;
        success &&
            history.push(`/success`);
    }

    render() {
        console.log(`ShoppingCart - RENDER`);
        const {shoppingCartProducts} = this.state;

        return(

            <div className={`ShoppingCart`}>
                {shoppingCartProducts.length > 0 &&
                <Fragment>
                    <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnter={false}
                    transitionLeave={true}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        shoppingCartProducts.map((item) => {
                                return <ShoppingCartItem
                                    key={item.id}
                                    item={item}
                                />
                            }
                        )
                    }
                    </ReactCSSTransitionGroup>
                    <CheckOut />
                </Fragment>
                    }
                {shoppingCartProducts.length === 0 &&
                    <h1>ShopCart is Empty</h1>
                }
            </div>
        );
    }

}

export default ShoppingCart;