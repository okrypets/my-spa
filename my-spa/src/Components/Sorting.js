import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

const NO_SORT = "NO_SORT";
const BY_PRICE = "BY_PRICE";
const BY_NAME = "BY_NAME";

class Sorting extends PureComponent {
    static propTypes = {
        products: PropTypes.array,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        sortBy: NO_SORT,
        sortedArray: [],
    };

    componentDidMount() {
        console.log(`componentDidMount - Sorting`);
        //appEvents.addListener('EOnClickCatalogLinkEvent', this.noSort);
    }

    componentWillReceiveProps (nextProps, nexContext) {
        console.log(`componentWillReceiveProps - Sorting`);
        const pageCatalogSortedBy = nextProps.location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        //console.log(pageCatalogSortedBy);
        //appEvents.addListener('EOnClickCatalogLinkEvent', this.noSort);
        this.setState({sortBy:pageCatalogSortedBy}, this.getSortedProductsArray);

    };
    componentWillUnmount() {
        console.log(`componentWillUnmount - Sorting`);
    }


    onHandleChangeSelect = (e) => {
        console.log(`onHandleChangeSelect`);
        const {location, history} = this.props;
        this.setState({sortBy: e.target.value});
        history.push(`${location.pathname}?sort=${e.target.value.toLowerCase()}`);
    };


    render() {
        const  {location} = this.props;
        //console.log(location.search);
        const pageCatalogSortedBy = location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        //console.log(pageCatalogSortedBy);
        return (
            <Fragment>
                <select value={!location.search ? NO_SORT : pageCatalogSortedBy} onChange={this.onHandleChangeSelect}>
                    <option defaultValue={NO_SORT} value={NO_SORT}>Без сортировки:</option>
                    <option value={BY_NAME}>Name A-Z</option>
                    <option value={BY_PRICE}>Price 0-9</option>
                </select>
            </Fragment>
        )
    }
}
export {NO_SORT, BY_PRICE, BY_NAME};
const withRouterSorting = withRouter(Sorting);
export default withRouterSorting;