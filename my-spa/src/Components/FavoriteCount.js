import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
//import {Link} from "react-router-dom";

class FavoriteCount extends PureComponent {
    static propTypes = {
        products: PropTypes.array,
        allFavorite: PropTypes.number,
    };
    state = {
        products: this.props.products,
        allFavorite: 0,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - FavoriteCount`);
        this.getFavoriteCount();
    }

    componentDidMount() {
        console.log(`componentDidMount - FavoriteCount`);
        //this.getfavoriteCount();
    };

    componentWillUnmount() {
        console.log(`componentWillUnmount - FavoriteCount`);
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
            allFavorite: sumOfFavorite,
        });
        return sumOfFavorite;
    };



    render() {
        const {allFavorite} = this.state;
        return(
           <Fragment>
                {allFavorite > 0 &&
                <span>All Favorite: {allFavorite}</span>
                }
           </Fragment>


        );
    }
}
export default FavoriteCount;

//<Link to={`/catalog/?sort=favorite`} value={`All Favorite`} children ={`All Favorite ${allFavorite > 0 ? - allFavorite : ""}`}/>