import React, {PureComponent} from 'react';
import './App.scss';
import {
    Router, Route, Switch,
   withRouter
} from "react-router-dom";
import history from './history';
import PagesNavLinks from './pages/PagesNavLinks'
import PageMain from "./pages/PageMain";
import PageBasket from "./pages/PageBasket";
import PageShop from "./pages/PageShop";

class App extends PureComponent {


    render() {
        console.log(`App - RENDER`);
        const {location} = this.props;

        console.log(location.search);

        //let PageCatalogWithData = this.PageCatalogWithData;

        return (
            <Router history={history}>
                <div className="App">
                    <header className="App-header">
                        <PagesNavLinks />
                    </header>
                    <main>
                        <div className="contentBlock">
                            <Switch>
                                <Route exact path="/" component = {PageMain} />
                                <Route path="/cart" component = {PageBasket} />
                                <Route path={"/:catalog/:urlParams?"} component = {PageShop} className="PageCatalog" />
                            </Switch>
                        </div>
                        <div className="RightSideBar">
                            RightSideBar
                        </div>
                    </main>
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