import React, {PureComponent} from 'react';
import './App.scss';
import {
    Router, Route, Switch,
   // Redirect,
   withRouter
} from "react-router-dom";
import history from './history';
import PagesNavLinks from './pages/PagesNavLinks'
import PageMain from "./pages/PageMain";
import PageBasket from "./pages/PageBasket";
//import PageCatalog from "./pages/PageCatalog";
//import ShopCatalog from "./Components/ShopCatalog";
//import SingleItem from "./Components/SingleItem";
//import PropTypes from "prop-types";
//import {productsThunkAC} from "./Redux/Thunk/fetchThunkProducts";
//import {connect} from "react-redux";
//import {withDataLoad} from './Components/withDataLoad';
//import PageCatalog from "./pages/PageCatalog";
import PageShop from "./pages/PageShop";
//import {withDataLoad} from "./Components/withDataLoad";
//import {appEvents} from "./Components/events";

class App extends PureComponent {

    static propTypes = {
        //location: PropTypes.object.isRequired,
        //products: PropTypes.object, //Redux
        //paginationData:PropTypes.object
    };


    componentDidMount() {
        //this.props.dispatch( productsThunkAC(this.props.dispatch) );
        //appEvents.addListener('onPageChangedEvent',this.dataPaginationToState);

        this.unlisten = history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            console.log(`The last navigation action was ${action}`)
        });

    }

    componentWillUnmount = () => {
        //appEvents.removeListener('onPageChangedEvent',this.dataPaginationToState);
        this.unlisten();
    };
/*
    dataPaginationToState = (_currentProducts, _currentPage) => {
        this.setState({
            currentProducts: _currentProducts,
            currentPage:_currentPage}
            )
    };

 */
/*
    fetchConfig = {
        URL: "http://localhost:3004/posts",
        method: 'post',
        headers: {
            "Accept": "application/json",
        },
    };

 */

    //PageCatalogWithData=withDataLoad(this.fetchConfig, "posts")(PageCatalog);

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
                                <Route path={"/:catalog/:urlParams?"}
                                       className="PageCatalog"
                                >
                                        <PageShop
                                            //isSortBy = {location.search ? location.search.replace(/[?sort=]/g,"").toUpperCase() : "NO_SORT"}
                                        //products={this.props.products.data}
                                        />
                                </Route>
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