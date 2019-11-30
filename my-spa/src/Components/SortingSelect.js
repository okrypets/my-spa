import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import './SortingSelect.scss'
import {appEvents} from "./events";
const NO_SORT = "NO_SORT";
const BY_PRICE = "BY_PRICE";
const BY_NAME = "BY_NAME";

class SortingSelect extends PureComponent {
    static propTypes = {
        products: PropTypes.array,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        sortBy: NO_SORT,
        //sortedArray: [],
    };

   //componentWillReceiveProps (nextProps, nexContext) {
    componentDidUpdate(prevProps, prevState, Snapshot) {
        const pageCatalogSortedBy = this.props.location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        this.setState({sortBy:pageCatalogSortedBy}, this.getSortedProductsArray);

    };

    onHandleChangeSelect = (e) => {
        const {location, history} = this.props;
        this.setState({sortBy: e.target.value});
        history.push(`${location.pathname}?sort=${e.target.value.toLowerCase()}`);
        appEvents.emit('EonHandleChangeSelectSorting', e.target.value);
    };


    render() {
        console.log(`Sorting - RENDER`);
        const  {location} = this.props;
        const pageCatalogSortedBy = location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        return (
            <Fragment>
                <select value={!location.search ? NO_SORT : pageCatalogSortedBy} onChange={this.onHandleChangeSelect}>
                    <option defaultValue={NO_SORT} value={NO_SORT}>No Sorting:</option>
                    <option value={BY_NAME}>Name A-Z</option>
                    <option value={BY_PRICE}>Price 0-9</option>
                </select>
            </Fragment>
        )
    }
}
export {NO_SORT, BY_PRICE, BY_NAME};
const withRouterSorting = withRouter(SortingSelect);
export default withRouterSorting;