import React, {PureComponent} from 'react';
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
        console.log(this.props.itemId);
        console.log(this.props.items);
        let item = this.props.items.find( c => c.id === this.props.itemId );
        //console.log(item);
        return (
                    <div className="SingleItem">
                        <img src={`/Images/Shop/${item.ImgSrc}`} alt=""/>
                        <h2>
                            {item.Name}
                        </h2>
                        <div>
                            <span>{item.Price}</span>
                            <input type="number" defaultValue={1}/>
                            <input type="button" value="Купить"/>
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