import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ShoppingCartItem from "./ShoppingCartItem";
import {connect} from "react-redux";
import CheckOut from './CheckOut';
import {appEvents} from "./events";
import './ShoppingCart.scss'
import {shoppingCartRemoveAC, shoppingCartRemoveAllAC } from "../Redux/Actions/shoppingCartAC";
//import ReactTransitionGroup from 'react-addons-transition-group' // ES6
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ShoppingCart extends PureComponent {

    static propTypes = {
        shoppingCart: PropTypes.object,
        success:PropTypes.bool,
        history: PropTypes.object.isRequired,
    }

    state = {
        shoppingCartProducts: this.props.shoppingCart.items,
        success:true,
    }

    componentDidMount() {
        console.log(`componentDidMount - ShoppingCart`);
        appEvents.addListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.addListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);
    }

    componentWillUnmount() {
        console.log(`componentWillUnmount - ShoppingCart`);
        appEvents.removeListener('EhandleClickDeleteItem',this.deleteItemFromShoppingCart);
        appEvents.removeListener('EdeleteAllFromShoppingCart',this.deleteAllFromShoppingCartAfterSubmit);
    }

    deleteItemFromShoppingCart = (delItem) => {
        console.log(`deleteItemFromShoppingCart - PageShop`);
        this.props.dispatch( shoppingCartRemoveAC(delItem));
        const {shoppingCartProducts} = this.state;
        let newshoppingCartProducts = [...shoppingCartProducts].filter(i => i.id !== delItem.id);
        this.setState({
            shoppingCartProducts: newshoppingCartProducts,
        })
    }

    deleteAllFromShoppingCartAfterSubmit =() => {
        console.log(`deleteAllFromShoppingCartAfterSubmit`);
        this.props.dispatch( shoppingCartRemoveAllAC());
        this.setState({
            shoppingCartProducts: [],
            success:true,
        }, () => this.successSubmit());
        console.log(this.state.shoppingCartProducts);
        console.log(this.state.success);
    }

    successSubmit = () => {
        console.log(`successSubmit`);
        const {success} = this.state;
        const {history} = this.props;
        success &&
            history.push(`/success`);
    }

    render() {
        console.log(`ShoppingCart - RENDER`);
        const {shoppingCartProducts} = this.state;
        console.log(shoppingCartProducts);


        return(
            <div className={`ShoppingCart`}>

                {
                    shoppingCartProducts.length > 0 ?
                        shoppingCartProducts.map((item) => {
                            return <ReactCSSTransitionGroup
                                    transitionName="example"
                                    transitionEnter={false}
                                    transitionLeave={true}
                                    transitionEnterTimeout={5000}
                                    transitionLeaveTimeout={3000}>
                                        <ShoppingCartItem
                                            key={item.id}
                                            item={item}
                                        />
                                    </ReactCSSTransitionGroup>
                        }
                    )
                        :
                        <h1>ShopCart is Empty</h1>
                }
                {shoppingCartProducts.length > 0 && <CheckOut />}

            </div>
        );
    }

}

const mapStateToProps = function (state) {
    return {
        shoppingCart: state.shoppingCart,
    };
};
//const withRouterPageShop = withRouter(PageShop);
export default connect(mapStateToProps)(ShoppingCart);
//export default ShoppingCart