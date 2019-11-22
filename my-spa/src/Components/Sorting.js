import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {appEvents} from "./events";
import {withRouter} from "react-router-dom";

const NO_SORT = "NO_SORT";
const BY_PRICE = "BY_PRICE";
const BY_NAME = "BY_NAME";

class Sorting extends PureComponent {
    static propTypes = {
        products: PropTypes.array,
        //match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
       sortBy: NO_SORT,
    };

    componentDidMount() {
        //appEvents.addListener('EOnClickCatalogLinkEvent', this.noSort);
    }

    componentWillReceiveProps = (newProps) => {
        //appEvents.addListener('EOnClickCatalogLinkEvent', this.noSort);
        //this.setState({sortBy:newProps.sortBy});

    };
    componentWillUnmount() {
       //appEvents.removeListener('EOnClickCatalogLinkEvent', this.noSort);
    }
/*
    handleChange = (event) => {
        console.log(event.target.value);
        this.props.history.push(`${this.props.location.pathname}?sort=${event.target.value.toLowerCase()}`);
        this.setState({sortBy: event.target.value}, this.onHandleChangeSelect);
    };
 */

    onHandleChangeSelect = (e) => {
        //console.log(e);
        this.setState({sortBy: e.target.value});
        this.props.history.push(`${this.props.location.pathname}?sort=${e.target.value.toLowerCase()}`);
        appEvents.emit('ESortingOnChange', e.target.value);
    };

    render() {
        const  {location} = this.props;
        //console.log(location.search);
        const pageCatalogSortedBy = location.search.replace(/\?sort=(?=\w+)/g,"").toUpperCase();
        console.log(pageCatalogSortedBy);
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