import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link } from "react-router-dom";
import IconStar from './IconStar'
import {appEvents} from "./events";

import './ShopCatalogItem.scss';
import {
    //CATALOG_ITEM,
    SINGLE_ITEM,
} from '../pages/PageShop'

const IS_FAVORITE = "IS_FAVORITE";

class  ShopCatalogItem extends PureComponent {

    static propTypes = {
        item:PropTypes.object,
        showMode: PropTypes.string,
        cartMode: PropTypes.string,

    };

    state = {
        isFavorite: this.props.item.IS_FAVORITE,
        inCart: false,
    };

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
        //let newItem = {...item};
        if (isFavorite) {
            item[IS_FAVORITE] = isFavorite;
        } else {
            delete item[IS_FAVORITE];
        }
        console.log(item[IS_FAVORITE]);
        appEvents.emit('EisFavoriteItemOnChange', item);
    };


    handleClickAddToCart = () => {
        console.log(`handleClickAddToCart`);
        const {item} = this.props;
        appEvents.emit('EhandleClickAddToCart', item);
        this.setState({
            inCart: true,
        })
    }


    render() {
        console.log("ShopCatalogItem - render");
        const {showMode} = this.props;
        //console.log(this.props.match);
        let item = this.props.item;
        const {isFavorite} = this.state;

        return (
            <div className={`ShopCatalogItem ${isFavorite ? 'active' : ''}`} key={item.id}>
                <div className={`block`}>
                    <img src={`/Images/Shop/${item.ImgSrc}`} alt=""/>
                    <div className={`itemInfo`} >
                        <h2>
                            <Link to={`/catalog/item-${item.id}`} className="SingleItemName">{item.Name}</Link>
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
                                           value={!item.Price && !isFavorite ? "can't Order" : 'Add to Sopping Cart'}
                                           disabled={!item.Price && !isFavorite}
                                           onClick={this.handleClickAddToCart}
                                    />

                            </div>
                        </div>
                    </div>
                </div>

                {showMode === SINGLE_ITEM &&
                    <div>
                        <span>{item.excerpt}</span>
                    </div>
                }
                <div className="favorite">
                    <button className={`favoriteButton ${isFavorite ? 'active' : ''}`} onClick={this.isFavoriteItemHandleClick}>
                        <IconStar
                                  isActive = {isFavorite}/>
                    </button>
                </div>
            </div>
        )
    }
}
/*
const mapStateToProps = function (store) {
    return {
        //isFavorite:store.isFavorite,
        //item:store.item,
        products: store.products,
    };
};

//const withRouterPageShop = withRouter(PageShop);
export default connect(mapStateToProps)(ShopCatalogItem);
 */
export {IS_FAVORITE};
export default ShopCatalogItem;

/*

<input type="number"
                                   defaultValue={1}
                                   disabled={!item.Price && !isFavorite}
                                   onChange={this.setCountOnChange}
                            />

    const mapDispatchToProps = dispatch => bindActionCreators({
       // changePage: () => push(`/SingleItem`)
    }, dispatch);

    export default connect(
        null,
        mapDispatchToProps
    )(ShopCatalogItem)
*/

/*
<button onClick={() => props.changePage()}>Go to about page via redux</button>





*/




//export default withRouter(ShopCatalogItem);