import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {appEvents} from "./events";


import './ShoppingCartItem.scss'
import './ShopCatalogItem.scss'

class ShoppingCartItem extends PureComponent {

    static propTypes = {
        item:PropTypes.object,
    };

    handleClickRemove = () => {
        const {item} = this.props;
        appEvents.emit('EhandleClickDeleteItem', item);
    }

    render() {
        console.log(`ShoppingCartItem - RENDER`);
        const { item} = this.props;
        return (
            <div className={`ShoppingCartItem`} >
                <div className={`block`}>
                    <img src={`/Images/Shop/${item.ImgSrc}`} alt=""/>
                    <h2>
                        <Link to={`/catalog/item-${item.id}`} className="SingleItemName">{item.Name}</Link>
                    </h2>
                    <div className="priceBlock">
                        <span className='itemPrice'>
                                <Fragment>
                                    Price: <span>{item.Price}</span> $
                                </Fragment>

                        </span>
                        <div className="buttonDelete">
                                <input type="button"
                                       className="inBasket"
                                       value={'Delete'}
                                       onClick={this.handleClickRemove}
                                />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ShoppingCartItem;