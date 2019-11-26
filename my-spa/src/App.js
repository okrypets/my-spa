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
//import ShoppingCart from "./Components/ShoppingCart";
import Alerts from './Components/Alerts'
import PageBasket from "./pages/PageBasket";

class App extends PureComponent {

    render() {
        console.log(`App - RENDER`);
        const {location} = this.props;

        console.log(location.search);

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
                                <Route path="/:catalog/:urlParams?" component = {PageShop} className="PageCatalog" />
                            </Switch>
                        </div>
                    </main>
                    <Alerts />
                </div>
            </Router>
        );
    }

}
/*
const mapStateToProps = function (store) {
    return {
        products: store.products,
    };
};



 */
const withRouterApp = withRouter(App);
export default withRouterApp;


//export default App;



/*

<Redirect exact from={`/catalog`} to={`/catalog/page-1`} />

{!location.search && <Redirect from ='/catalog/page-1' to='/catalog' />}
                                {location.search && <Redirect from ={'/catalog/page-1'+location.search} to={'/catalog'+location.search} />}



<Route path="/:catalog" className="PageCatalog" render = {({match}) => {
                            console.log("render");
                            return (
                                <Fragment>
                                    <Switch>
                                        <Route exact path={`/${match.params.catalog}/`} render = {({match}) => {
                                            return <ShopCatalog products={this.props.products}
                                                                match = {match} />
                                            }
                                        }/>
                                         <Route path={`/${match.params.catalog}/:page-${this.state.currentPage}`}
                                               render={() => {
                                                    console.log(`page-${this.state.currentPage}`);
                                                    return (
                                                        <ShopCatalog products={this.state.currentProducts} />
                                                    );
                                        }
                                        }/>
                                        <Route path={`/${match.params.catalog}/:itemId`} render={({match}) => {
                                            return <SingleItem className="SingleItem"
                                                               itemId={+match.params.itemId}
                                                               items={this.props.products.data}
                                            />
                                            }
                                        }/>
                                    </Switch>
                                </Fragment>


                                <Fragment>
                                    <Switch>
                                        <Route exact path={`/${match.params.catalog}/`} render={({match}) => {
                                            return <ShopCatalog products={this.props.products.data}
                                                                match={match}/>
                                        }
                                        }/>
                                        <Route path={`/${match.params.catalog}/:page-${this.state.currentPage}`}
                                               render={() => {
                                                   console.log(`page-${this.state.currentPage}`);
                                                   return (
                                                       <ShopCatalog products={this.state.currentProducts}/>
                                                   );
                                               }
                                               }/>
                                        <Route path={`/${match.params.catalog}/:itemId`} render={({match}) => {
                                            return <SingleItem className="SingleItem"
                                                               itemId={+match.params.itemId}
                                                               items={this.props.products.data}
                                            />
                                        }
                                        }/>
                                    </Switch>
                                </Fragment>



                            )
                        }} />
                        */