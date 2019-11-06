import React, {PureComponent} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
//import { Provider } from 'react-redux';

import PagesLinks from './pages/PagesLinks'
//import PagesRouter from "./pages/PagesRouter";
import PageMain from "./pages/PageMain";
import PageCatalog from "./pages/PageCatalog";
import PageBasket from "./pages/PageBasket";
//import ShopCatalog from "./Components/ShopCatalog";
//import shopData from "./shopItemArr";
//import SingleItem from "./Components/SingleItem";
//import ShopCatalogItem from "./Components/ShopCatalogItem";
//import SingleItem from "./Components/SingleItem";

//let itemsArr = shopData.shopItemArr;


class App extends PureComponent {

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <PagesLinks />
                    </header>
                    <main>
                        <Route exact path="/" component = {PageMain} />
                        <PageCatalog />
                        <Route path="/basket" component = {PageBasket} />
                    </main>
                </div>
            </Router>
        );
    }

}

export default App;