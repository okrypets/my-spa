import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {appEvents} from "./events";
//import {Link} from "react-router-dom";

class FavoriteCount extends PureComponent {
    static propTypes = {
        products: PropTypes.array,
        allFavoriteCount: PropTypes.number,
    };
    state = {
        products: this.props.products,
        allFavoriteCount: 0,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        //console.log(`componentWillReceiveProps - FavoriteCount`);
        this.getFavoriteCount();
    }

    componentDidMount() {
        //console.log(`componentDidMount - FavoriteCount`);
        //this.getfavoriteCount();
    };

    componentWillUnmount() {
        //console.log(`componentWillUnmount - FavoriteCount`);
    };

    getFavoriteCount = () => {
        const {products} = this.state;
        let sumOfFavorite = 0;

        for (let i = 0; i < products.length; i++) {
            if (products[i].IS_FAVORITE === true) {
                sumOfFavorite ++
            }
        }
        this.setState({
            allFavoriteCount: sumOfFavorite,
        });
        return sumOfFavorite;
    };

    showAllFavorite = (e) => {
        appEvents.emit('EcolorAllFavoriteByClick', e);
    }


    render() {
        console.log(`FavoriteCount - RENDER`);
        const {allFavoriteCount} = this.state;
        return(
           <div>
                {allFavoriteCount > 0 &&
                    <label>
                        <input type={`checkbox`} onChange={this.showAllFavorite} value={`Color all Favorite: ${allFavoriteCount} products`}/>
                        Color all Favorite: {allFavoriteCount} products
                    </label>
                }
           </div>


        );
    }
}
export default FavoriteCount;

//<Link to={`/catalog/?sort=favorite`} value={`All Favorite`} children ={`All Favorite ${allFavorite > 0 ? - allFavorite : ""}`}/>