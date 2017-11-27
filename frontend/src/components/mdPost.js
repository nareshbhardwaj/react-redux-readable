import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import SortComponent from './SortComponent';
import * as API from "../api";
import * as Actions from "../actions";

class Post extends Component {
    static filterPosts(posts, displayDeleted) {
        if (!displayDeleted && posts) {
            return posts.filter((post) => (!post.deleted));
        } else {
            return posts || [];
        }
    }

    render() {
        const {posts, displayDeleted, displayCategory, sortMode, sortPosts} = this.props;

        return (
            <div className="mt-2">
                <SortComponent sortContent={(sortBy) => {
                    sortPosts(sortBy)
                }}/>

                <div className="list-group mt-2">
                    {
                        Post.filterPosts(posts, displayDeleted || false).sort((p1, p2) => {
                            switch (sortMode) {
                                case 'score':
                                default:
                                    return p1.voteScore < p2.voteScore ? 1 : -1;
                                case 'newest':
                                    return p1.timestamp < p2.timestamp ? 1 : -1;
                            }
                        }).map((post) => (

                            <div key={post.id} className="list-group-item">

                                <div className="row valign-wrapper">
                                    <div
                                        className="col-sm-4 col-md-2 d-flex flex-column  text-truncate">
                                        <a  className="d-flex align-self-center"
                                           href="#up"
                                           onClick={
                                               () => {
                                                   API.upVotePost(post.id).then((post) => {
                                                       this.props.votePost(post.id, post.voteScore);
                                                   });

                                                   return false
                                               }
                                           }
                                        >
                                            <i className="material-icons">upvote</i>
                                        </a>
                                        <p className="mb-0 text-truncate">{post.voteScore}</p>
                                        <a className="d-flex align-self-center"
                                           href="#down"
                                           onClick={
                                               () => {
                                                   API.downVotePost(post.id).then((post) => {
                                                       this.props.votePost(post.id, post.voteScore);

                                                   });

                                                   return false
                                               }
                                           }
                                        >
                                            <i className="material-icons">downvote</i>
                                        </a>
                                    </div>

                                    <div className="col" >
                                        <h5>
                                            <a 
                                               className={`row truncate left-align blue-grey-text text-lighten-1`}
                                               href={`/${post.category}/${post.id}`}>
                                                {post.title}
                                            </a>
                                        </h5>
                                        <h6 className="row truncate left-align">
                                            {
                                                displayCategory ?
                                                    (<span>By<a href="#!">{` ${post.author} `}</a>at
                                                    <a href={`/${post.category}`}>{` ${post.category}`}</a>
                                                    </span>) :
                                                    (<span>By
                                            <a href="#!">{` ${post.author}`}</a>
                                        </span>)
                                            }

                                        </h6>

                                        <h6 className="row text-muted">{`${new Date(post.timestamp)}`}</h6>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    posts: PropTypes.array.isRequired,
    displayDeleted: PropTypes.bool,
    displayCategory: PropTypes.bool
};

function mapStateToProps({postreducer}) {
    return {
        sortMode: postreducer.sortMode
    }
}

function mapDispatchToProps(dispatch) {
    return {
        votePost: (id, votes) => dispatch(Actions.votePost(id, votes)),
        sortPosts: (sortMode) => dispatch(Actions.sortPosts(sortMode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);