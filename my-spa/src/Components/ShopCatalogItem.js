import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link } from "react-router-dom";
import IconStar from './IconStar'
import {appEvents} from "./events";

import './ShopCatalogItem.scss';
import {
    CATALOG_ITEM,
    SINGLE_ITEM,
} from '../pages/PageShop'

const IS_FAVORITE = "IS_FAVORITE";
const CANT_ORDER= "Can't Order";
const IN_CART= "Just in the Cart";
const ADD_IN_CART= "Add to Sopping Cart";


class  ShopCatalogItem extends PureComponent {

    static propTypes = {
        item:PropTypes.object,
        showMode: PropTypes.string,
        cartMode: PropTypes.string,
        colorFavorite: PropTypes.bool,
        cartValue: PropTypes.string,
        inShoppingCart: PropTypes.array,
    };

    state = {
        isFavorite: this.props.item.IS_FAVORITE,
        inCart: false,
        colorFavorite: this.props.colorFavorite,
        cartValue: '',
    };

    componentDidUpdate(prevProps, prevState, Snapshot) {
        console.log(`componentDidUpdate`)
        const {item, inShoppingCart} = this.props;
        for (let i = 0; i < inShoppingCart.length; i++) {
            if (inShoppingCart[i].id === item.id) {
                this.setState({
                    inCart: true,
                });
            }
        }
        this.getValue()
    }

    componentDidMount() {
        console.log(`componentDidMount`)
        const {item, inShoppingCart} = this.props;
        for (let i = 0; i < inShoppingCart.length; i++) {
            if (inShoppingCart[i].id === item.id) {
                this.setState({
                    inCart: true,
                });
            }
        }
        //const {item} = this.props;
        const {isFavorite, inCart} = this.state;
        if (item.Price === 0 && !isFavorite) {
            this.setState({
                cartValue: CANT_ORDER,
            });
        } else if (inCart) {
            this.setState({
                cartValue: IN_CART,
            });
        } else {
            this.setState({
                cartValue: ADD_IN_CART,
            });
        }
    }

    isFavoriteItemHandleClick = () => {
        this.state.isFavorite ?
            this.favoriteDisable()
            :
            this.favoriteActive()

    };
    favoriteActive = () => {
        this.setState({
            isFavorite: true,
        }, () => this.isFavoriteItem(this.state.isFavorite));

    };
    favoriteDisable = () => {
        this.setState({
            isFavorite: false,
        }, () => this.isFavoriteItem(this.state.isFavorite))
    };

    isFavoriteItem = () => {
        const {item} = this.props;
        const {isFavorite} = this.state;
        let newItem = {...item};
        if (isFavorite) {
            newItem[IS_FAVORITE] = isFavorite;
        } else {
            delete newItem[IS_FAVORITE];
        }
        appEvents.emit('EisFavoriteItemOnChange', newItem);
    };

    handleClickAddToCart = () => {
        console.log(`handleClickAddToCart`)
        const {item} = this.props;
        appEvents.emit('EhandleClickAddToCart', item);
        this.setState({
            inCart: true,
        });
        //this.getValue();
    }
    getValue= () => {
        console.log(`getValue`);
        const {item} = this.props;
        const {isFavorite, inCart} = this.state;
        if (item.Price === 0 && !isFavorite) {
            this.setState({
                cartValue: CANT_ORDER,
            });
        } else if (inCart) {
            this.setState({
                cartValue: IN_CART,
            });
        } else {
            this.setState({
                cartValue: ADD_IN_CART,
            });
        }

    }


    render() {
        const {showMode, colorFavorite} = this.props;
        let item = this.props.item;
        const {isFavorite, inCart, cartValue} = this.state;
        return (
            <div className={`ShopCatalogItem ${isFavorite ? 'active' : ''} ${showMode === SINGLE_ITEM ? 'single' : ''} `} key={item.id} >
                <div className={`block`} style={ isFavorite && colorFavorite ? {backgroundColor: '#ff4b46'} : {}}>
                    <img src={`/Images/Shop/${item.ImgSrc}`} alt=""/>
                    <div className={`itemInfo`} >
                        <h2>
                            {showMode === SINGLE_ITEM ?
                                item.Name
                                : <Link to={`/catalog/item-${item.id}`} className="SingleItemName">{item.Name}</Link>
                            }
                        </h2>

                        <div className="priceBlock">
                            <span className='itemPrice'>
                                {item.Price === 0 ?
                                    <span>Available only if isFavorite</span>
                                    :
                                    <Fragment>
                                        Price: <span>{item.Price}</span> $
                                    </Fragment>
                                }
                            </span>
                            <div className="buttonBlock">

                                    <input type="button"
                                           className="inBasket"
                                           defaultValue={cartValue}
                                           disabled={inCart || (!item.Price && !isFavorite)}
                                           onClick={this.handleClickAddToCart}
                                    />

                            </div>
                        </div>
                        {showMode === SINGLE_ITEM &&
                        <div>
                            <span>{item.excerpt}</span>
                        </div>
                        }
                    </div>
                </div>
                {showMode === CATALOG_ITEM &&
                    <div className="favorite">
                        <button className={`favoriteButton ${isFavorite ? 'active' : ''}`} onClick={this.isFavoriteItemHandleClick}>
                            <IconStar
                                isActive = {isFavorite}/>
                        </button>
                    </div>
                }

            </div>
        )
    }
}
export {IS_FAVORITE};
export default ShopCatalogItem;