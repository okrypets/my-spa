import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import IconStar from './IconStar'
import {appEvents} from "./events";
//import {isProductFavoriteAC} from "../Redux/Actions/productsAC";

import './ShopCatalogItem.scss';


class  ShopCatalogItem extends PureComponent {

    static propTypes = {
        item:PropTypes.object.isRequired,
        //match: PropTypes.object
        isFavorite: PropTypes.bool,

    };

    state = {
        isFavorite: false,

    }

    isFavoriteItemHandleClick = () => {
        this.state.isFavorite ? this.favoriteDisable()
            :
            this.favoriteActive()
    }
    favoriteActive = () => {
        this.setState({
            isFavorite: true,
        }, () => this.isFavoriteItem(this.state.isFavorite));

        //this.props.dispatch( isProductFavoriteAC(this.props.item,true) );
    }
    favoriteDisable = () => {
        this.setState({
            isFavorite: false,
        }, () => this.isFavoriteItem(this.state.isFavorite))
        //this.props.dispatch( isProductFavoriteAC(this.props.item,false) );
    }

    isFavoriteItem = () => {
        let newItem = this.props.item;
        newItem["isFavorite"] = this.state.isFavorite;
        //console.log(newItem);
        appEvents.emit('EisFavoriteItemOnChange', newItem);
    }


    render() {
        console.log("ShopCatalogItem - render");
        //console.log(this.props.match);
        let item = this.props.item;
        const {isFavorite} = this.state;

        return (
            <div className={`ShopCatalogItem ${isFavorite ? 'active' : ''}`} key={item.id}>
                <img src={`/Images/Shop/${item.ImgSrc}`} alt=""/>

                <h2>
                    <Link to={`/catalog/${item.id}`} className="SingleItemName">{item.Name}</Link>
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
                        <input type="number" defaultValue={1}/>
                        <input  type="button"
                                className="inBasket"
                                value="Купить"
                                disabled={!item.Price && !isFavorite}
                        />
                    </div>
                </div>
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
export default withRouter(ShopCatalogItem);