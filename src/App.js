import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchProducts, searchProducts } from "./actions/productActions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { CreateFormWithRedux } from './components/CreateForm';
import { ProductListTable } from './components/ProductListTable';
import { UpdateFormWithRedux } from './components/UpdateForm';
import { RemoveProductsWithRedux } from './components/RemoveProducts';
import { MyNote } from './components/MyNote';
import { useHistory } from "react-router-dom";
import './App.css';

// react router included
import { Switch, Route, withRouter } from 'react-router-dom';

// route paths initialize
const CREATE = "create";
const UPDATE = "update";
const DELETE = "delete";
const NOTE = "note"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: null, isClicked: false, searchVal: '' };
  }

  componentDidMount() {
    let hrefArr = window.location.href.split('/');
    let selected = 1;
    if(hrefArr[3]) {
      if(hrefArr[3] === CREATE)
        selected = 2;
      else if(hrefArr[3] === UPDATE)
        selected = 3;
      else if(hrefArr[3] === DELETE)
        selected = 4;
    }
    this.setState({ selected });
    this.props.dispatch(fetchProducts());
  }

  handleNavClick = (selected) => {
    this.props.dispatch(fetchProducts());
    this.setState({ selected });
  };

  handleRequestChange = (e) => {
      this.setState({ isClicked: false });
  };

  handleBarClick = (e, clickable) => {
    if(clickable)
      this.setState({ isClicked: clickable });
  };

  handleTextChange = (e) => {
    if(e.target.value !== '')
      this.setState({ searchVal: e.target.value });
  };

  handleSubmitSearch = (e) => {
    e.preventDefault();
    // if(this.state.searchVal !== '')
    this.props.dispatch(searchProducts(this.state.searchVal));
  };

  render() {
    let container = 'admin_content_class';
    if(window.innerWidth < 767)
      container = '';
    const { products } = this.props;
    let searchDiv = '';
    let hrefArr = window.location.href.split('/');
    if(this.state.selected !== 2 && hrefArr[3] !== NOTE)
      searchDiv = (
        <div className="search_content_class">
            <form onSubmit={this.handleSubmitSearch}>
              <div className="admin_displayInline admin_searchDivWidth">
                <input 
                  type="text" 
                  name="seachBox"
                  placeholder="Search Product"
                  className="admin_searchInput_class"
                  onChange={this.handleTextChange}
                />
              </div>
              <div className="admin_displayInline">
                <button 
                  type="submit" 
                  className="admin_searchButton_class"
                  onClick={this.handleSubmitSearch}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
      );
    return (
      <MuiThemeProvider>
        <div>
          <div className="App">
            <Header handleBarClick={this.handleBarClick} />
            <Navigation 
              handleNavClick={this.handleNavClick} 
              selected={this.state.selected} 
              isClicked={this.state.isClicked} 
              handleRequestChange={this.handleRequestChange} 
            />
          </div>
          {searchDiv}
          <Switch>
            <Route exact path="/">
              <ProductListTable containerClass={container} products={products} />
            </Route>
            <Route exact path="/note">
              <MyNote containerClass={container} />
            </Route>
            <Route exact path="/create">
              <CreateFormWithRedux containerClass={container} />
            </Route>
            <Route exact path="/update">
              <UpdateFormWithRedux containerClass={container} products={products} />
            </Route>
            <Route exact path="/delete">
              <RemoveProductsWithRedux containerClass={container} products={products} />
            </Route>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default withRouter(connect(mapStateToProps)(App));
