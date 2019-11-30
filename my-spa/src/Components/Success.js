import React, {PureComponent} from 'react';
import {withRouter} from "react-router";

export class Success extends PureComponent {

    render() {
        return(
                <h1>Success! Shopping Cart is empty. Thanks!</h1>
        );
    }
}

const withRouterSuccess = withRouter(Success);
export default withRouterSuccess;
