import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as API from './api';
import { connect } from 'react-redux'
import * as Actions from './actions';
import CategoryList from "./components/CategoryList";
import PropTypes from 'prop-types';

class App extends Component {

  componentDidMount() {
    API.fetchCategories().then((categories) => {
        this.props.updateCategories(categories);
    });
  }


  render() {
    const arrayData = this.props.categories || [];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable App</h1>
        </header>

    <div className="container">
                <CategoryList categories={this.props.categories}/>
    </div>
</div>

   );
  }
}


function mapStateToProps({categoryreducer}) {
  return {
      categories: categoryreducer.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
      updateCategories: (data) => dispatch(Actions.updateCategories(data))
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(App);
