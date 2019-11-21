import React, {Fragment, PureComponent} from 'react';
import './SingleItem.scss';
import PropTypes from 'prop-types';
import history from "../history";
//import { Route, Switch } from "react-router-dom";
//import {Events} from './events';

class SingleItem extends PureComponent {

    static propTypes = {
        items:PropTypes.array.isRequired,
        itemId:PropTypes.number.isRequired
        //products: PropTypes.object.isRequired,
        //match: PropTypes.object,
    };

    componentDidMount = () => {
        console.log(`componentDidMount - SingleItem`);
        this.unlisten = history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            console.log(`The last navigation action was ${action}`)
        });
    };

    componentWillUnmount = () => {
        console.log(`componentWillUnmount - SingleItem`);
        this.unlisten();
    };

    render() {
        console.log("SingleItem - render");
        const {itemId, items} = this.props;
        //console.log(this.props.itemId);
        //console.log(this.props.items);
        let item = items.find( c => c.id === itemId );
        //console.log(item);
        return (
                    <div className="SingleItem">
                        <img src={`/Images/Shop/${item.ImgSrc}`} alt=""/>
                        <h2>
                            {item.Name}
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
                            <input type="number"
                                   defaultValue={1}
                                   disabled={!item.Price}
                            />
                            <input type="button"
                                   value="Купить"
                                   disabled={!item.Price}
                            />
                        </div>
                        <div>
                            <span>{item.excerpt}</span>
                        </div>
                    </div>

        )
    }
}

export default SingleItem;

/*
<SingleItem className="SingleItem"
                                   itemId={+match.params.itemId}
                                   items={this.props.products.data}
                />
 */