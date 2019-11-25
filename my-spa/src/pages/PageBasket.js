import React, {PureComponent, Fragment} from 'react';
import ShoppingCart from '../Components/ShoppingCart'
//import Success from "../Components/Success";
import {
    //Router,
    Route,
    //Switch,
    // Redirect,
    withRouter
} from "react-router-dom";
import {shoppingCartThunkAC} from "../Redux/Thunk/fetchThunkCart";
import PropTypes from "prop-types";
import loaderIconGif from "../loader.gif";
import {connect} from "react-redux";

class PageBasket extends PureComponent  {

    static propTypes = {
        shoppingCart: PropTypes.object, //Redux
    }

    state = {
        shoppingCartProducts: this.props.shoppingCart.items,
    }


    componentWillMount() {
        console.log(`componentWillMount - PageBasket`);
        this.props.dispatch( shoppingCartThunkAC(this.props.dispatch));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - PageBasket`);
        if (this.props.shoppingCart.status === 3) {
            this.setState({
                    shoppingCartProducts:this.props.shoppingCart.items,
                }
            );
        }
    }

    render() {
        console.log(`PageBasket - RENDER`);
        const {shoppingCart} = this.props;
        console.log(shoppingCart);
        if ( shoppingCart.status<=1)
            return <img src={loaderIconGif} alt={`Загрузка данных`} />;

        if ( shoppingCart.status===2)
            return "ошибка загрузки данных";
        return (
            <Fragment>
                <Route exact path = {`/basket`}>
                    <ShoppingCart shoppingCart={shoppingCart.items} />
                </Route>
            </Fragment>

        );
    }

}

const mapStateToProps = function (state) {
    return {
        shoppingCart: state.shoppingCart,
    };
};
const withRouterPageBasket = withRouter(PageBasket);
export default connect(mapStateToProps)(withRouterPageBasket);

//export default withRouterPageBasket;

//export default PageBasket;

    