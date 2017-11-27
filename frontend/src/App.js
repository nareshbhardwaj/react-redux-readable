import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as API from './api';
import { connect } from 'react-redux'
import * as Actions from './actions';
import CategoryList from "./components/CategoryList";
import PropTypes from 'prop-types';
import Post from "./components/Post";
import { Redirect, Route, Switch } from 'react-router-dom';
import AddPost from "./components/AddPost";

class App extends Component {

  componentDidMount() {
    API.fetchCategories().then((categories) => {
        this.props.updateCategories(categories);
    });

    API.fetchPosts().then((posts) => {
      this.props.updatePosts(posts);
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

        <Switch>
                    <Route exact path="/" render={() => (
                      <div className="container">
                         <CategoryList categories={this.props.categories}/>
                         <a type="button mt-2" className="btn btn-info" href={`/addpost/`}>
                                       New post
                                   </a>
                         <Post posts={this.props.posts} displayCategory={true}/>
                         </div>
                    )}
                    />

        <Route exact path="/addpost/" render={() => (
                        <AddPost categories={this.props.categories}/>
                    )}
                    />
      </Switch>
</div>

   );
  }
}


function mapStateToProps({categoryreducer,postreducer}) {
  return {
      categories: categoryreducer.categories,
      posts: postreducer.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
      updateCategories: (data) => dispatch(Actions.updateCategories(data)),
      updatePosts: (data) => dispatch(Actions.updatePosts(data))
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(App);
