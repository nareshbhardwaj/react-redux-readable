import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from "./Post";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';

const CategoryPageWithRouter = withRouter(props => <CategoryViewPage {...props}/>);

class CategoryViewPage extends Component {
    render() {
        const {category} = this.props.match.params;

        return (
            <div>
                { <HeaderComponent title={category} menus={[{name: 'add', path: `/addpost/${category}`}]}/> }
                <div className="container">
                    <Post displayCategory={false} posts={this.props.posts.filter((post) => {
                        return post.category === category
                    })}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({postreducer}) {
    return {
        posts: postreducer.posts
    }
}


CategoryViewPage.propTypes = {
    posts: PropTypes.array.isRequired
};

export default connect(mapStateToProps, null)(CategoryPageWithRouter);