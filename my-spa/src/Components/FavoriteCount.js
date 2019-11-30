import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {appEvents} from "./events";

class FavoriteCount extends PureComponent {
    static propTypes = {
        products: PropTypes.array,
        allFavoriteCount: PropTypes.number,
    };
    state = {
        products: this.props.products,
        allFavoriteCount: 0,
    };

    componentDidUpdate(prevProps, prevState, Snapshot) {
        if (this.props.products !== prevProps.products) {
            this.setState({
                products:this.props.products,
            })
        }
        this.getFavoriteCount();
    }

    componentDidMount() {
        this.getFavoriteCount();
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

    colorAllFavorite = (e) => {
        appEvents.emit('EcolorAllFavoriteByClick', e);
    }


    render() {
        console.log(`FavoriteCount - RENDER`);
        const {allFavoriteCount} = this.state;
        return(
           <div>
                {allFavoriteCount > 0 &&
                    <label>
                        <input type={`checkbox`} onChange={this.colorAllFavorite} value={`Color all Favorite: ${allFavoriteCount} products`}/>
                        Color all Favorite: {allFavoriteCount} products
                    </label>
                }
           </div>


        );
    }
}
export default FavoriteCount;