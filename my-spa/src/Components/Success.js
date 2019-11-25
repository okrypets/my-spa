import React, {PureComponent} from 'react';
import {withRouter} from "react-router";

class Success extends PureComponent {

    render() {

        return(
            <div>
                <h1>Данные отправлены успешно</h1>
            </div>
        );
    }

}

const withRouterSuccess = withRouter(Success);
export default withRouterSuccess;
//export default Success;
