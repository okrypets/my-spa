import React, {PureComponent, Fragment} from 'react';
//import PropTypes from 'prop-types';
import {appEvents} from "./events";
import ReactTransitionGroup from 'react-addons-transition-group' // ES6
//import {GREEN, RED} from "../pages/PageShop";

import './Alerts.scss'

class Alerts extends PureComponent {

    static propTypes = {
        //color: PropTypes.string,
    }

    state ={
        color: null,
        shouldShow: false,
    };

    componentDidMount() {
        console.log(`componentDidMount - Alerts`);
        appEvents.addListener('EshowAlertCart',this.showAlert);
        //this.timer();
    }

    componentWillUnmount() {
        console.log(`componentWillUnmount - Alerts`);
        appEvents.removeListener('EshowAlertCart',this.showAlert);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`componentDidUpdate - Alerts`);
        //this.clearTimeout();
    }



    showAlert = (color) => {
        console.log(`Alerts - RENDER`);

        this.setState({
            color: color,
            shouldShow: true,
        })
        //setTimeout(this.state.color, 3000);
    }

    timer =() => {
        //setTimeout(this.showAlert, 3000);
        //this.clearTimeout();
    }

    clearTimeout = () => {
        //clearInterval(this.timer);
    }





    render() {
        console.log(`showAlert - ShoppingCart`);
        const  {color, shouldShow} = this.state;
        return (
            <Fragment>

                <div className={`AlertsBlock`}>
                    {shouldShow ? <ReactTransitionGroup
                            //component={FirstChild}
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                        >
                        <span className={color}>
                            {
                                color === 'GREEN' &&
                                <h3>Product successfully added to shopping cart</h3>
                            }
                            {color === 'RED' &&
                            <h3>The product is already in the shopping cart</h3>
                            }
                        </span>
                        </ReactTransitionGroup>
                        :
                        null
                    }
                </div>

            </Fragment>
        );
    }
}


export default  Alerts;