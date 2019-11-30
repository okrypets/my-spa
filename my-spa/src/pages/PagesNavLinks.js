import React, {PureComponent} from 'react';
import {NavLink, withRouter} from "react-router-dom";

import './PagesNavLinks.scss';


class PagesNavLinks extends PureComponent {

    handleClick = () => {
        this.props.history.push(`/catalog/page-1`);
    };


    render() {
        console.log(`PagesNavLinks - RENDER`);
        return (
            <div className="PagesLinks">
                <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Main Page</NavLink>
                <NavLink to="/catalog" className="PageLink" activeClassName="ActivePageLink"  onClick={this.handleClick}>
                Catalog
                    </NavLink>
                <NavLink to="/basket" className="PageLink" activeClassName="ActivePageLink">Shopping Cart</NavLink>

            </div>
        );
    }
}


const withRouterPagesNavLinks = withRouter(PagesNavLinks);
export default withRouterPagesNavLinks;