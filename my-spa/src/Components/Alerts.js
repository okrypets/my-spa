import React, {PureComponent, Fragment} from 'react';
import {appEvents} from "./events";
import {GREEN, RED} from "../pages/PageShop";

import './Alerts.scss'

class Alerts extends PureComponent {

    state ={
        color: null,
        shouldShow: false,
    };

    componentDidMount() {
        appEvents.addListener('EshowAlertCart',this.showAlert);
        this.clearTimeout();
    }

    componentWillUnmount() {
        appEvents.removeListener('EshowAlertCart',this.showAlert);
        this.clearTimeout();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.timer();
    }

    showAlert = (color) => {
        this.setState({
            color: color,
            shouldShow: true,
        })
    }

    timer =() => {
        setTimeout(this.showAlert, 1000);
        this.clearTimeout();
    }

    clearTimeout = () => {
        clearInterval(this.timer);
    }

    render() {
        const  {color, shouldShow} = this.state;
        return (
            <Fragment>

                <div className={`AlertsBlock`}>
                        {shouldShow ?
                        <span className={color}>
                            {
                                color === GREEN &&
                                <h3>Product successfully added to shopping cart</h3>
                            }
                            {color === RED &&
                            <h3>The product is already in your shopping cart</h3>
                            }
                        </span>
                            :
                            null
                        }
                </div>

            </Fragment>
        );
    }
}

export default  Alerts;