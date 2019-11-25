import React, {PureComponent} from 'react';
import {NavLink} from "react-router-dom";

import './PagesNavLinks.scss';
//import {appEvents} from "../Components/events";


class PagesNavLinks extends PureComponent {

    state = {
        currentPage:1,
    };

    handleClick = (e) => {
        console.log(`handleClick -  PagesNavLinks`);
        //appEvents.emit('EcurrentPageToHandleClickCatalog',1);
        //appEvents.emit('EOnClickCatalogLinkEvent',e);
    };



    render() {
        //console.log(this.props.location.pathname);
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


//const withRouterPagesNavLinks = withRouter(PagesNavLinks);
//export default withRouterPagesNavLinks;
export default PagesNavLinks;