import React, {PureComponent, Fragment} from 'react';
import {Prompt, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {appEvents} from "./events";

import './CheckOut.scss'

class CheckOut extends PureComponent {

    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }

    state ={
        name:'',
        tel:'',
        alert: false,
    };

    onClickButtonSend =(e) => {
        const  {name, tel} = this.state;
        if (name && tel) {
            this.setState({
                    name:'',
                    tel:'',
                },
                () => appEvents.emit('EdeleteAllFromShoppingCart', e)
            )
        } else {
            this.setState({
                    alert: true,
                }
            )
        }


    }

    render() {
        const  {alert, name, tel} = this.state;
        return (
            <Fragment>
                <Prompt
                    when={!!this.state.name || !!this.state.tel}
                    message={location => `Are you sure you want to go to ${location.pathname}. Your changes will not be saved!`}
                />
                <div className={`checkoutBlock`}>
                    <input type = "text" value={this.state.name} onChange={e => this.setState({ name: e.target.value }) } />
                    {alert && !name && <span className={`alert`}>* Required field</span>}
                    <input type = "text" value={this.state.tel} onChange={e => this.setState({ tel: e.target.value })} />
                    {alert && !tel && <span className={`alert`}>* Required field</span>}
                    <input type = "button" value={`Send`} onClick={this.onClickButtonSend}/>
                </div>
            </Fragment>
        );
    }
}
const withRouterCheckOut = withRouter(CheckOut);
export default withRouterCheckOut;
//export default  CheckOut;