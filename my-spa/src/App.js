import React, {PureComponent} from 'react';
import './App.scss';
import {
    Router, Route, Switch, 
    Redirect,
   withRouter
} from "react-router-dom";
import history from './history';
import PagesNavLinks from './pages/PagesNavLinks'
import PageMain from "./pages/PageMain";
import PageShop from "./pages/PageShop";
import Alerts from './Components/Alerts'
import PageBasket from "./pages/PageBasket";

class App extends PureComponent {

    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <header className="App-header">
                        <PagesNavLinks />
                    </header>
                    <main>
                        <div className="contentBlock">
                            <Switch>

                                    <Redirect exact from={`/catalog`} to={`/catalog/page-1`} />


                                <Route exact path="/" component = {PageMain} />
                                <Route path="/basket" component = {PageBasket} />
                                <Route path="/:catalog/:urlParams?" component = {PageShop} />
                            </Switch>
                        </div>
                    </main>
                    <Alerts />
                </div>
            </Router>
        );
    }

}
const withRouterApp = withRouter(App);
export default withRouterApp;