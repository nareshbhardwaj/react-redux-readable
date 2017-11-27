import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import * as Actions from "../actions";
import * as API from "../api";
import CommentList from "./CommentList";
import * as UUIDV1 from 'uuid/v1';

class PostDetail extends Component {
    submitForm = (data, postId) => {
        API.writeComment({
            id: UUIDV1(),
            timestamp: new Date().getTime(),
            body: data.body,
            author: data.author,
            parentId: postId
        }).then((post) => {
            this.props.addPost(post);
        });
    };

    componentDidMount() {
        const {posts} = this.props;

        const {id} = this.props.match.params;

        let post = posts.filter((p) => {
            return p.id === id
        });

        if (post.length === 1) {
            post = post[0];
        } else {
            post = null;
        }

        if (post) {
            API.fetchComment(post.id).then((comments) => {
                this.props.updateComments(comments, post.id);
            });
        }
    }

    render() {
        const {posts, sortComments, comments} = this.props;

        const {id} = this.props.match.params;

        let post = posts.filter((p) => {
            return p.id === id
        });

        if (post.length === 1) {
            post = post[0];
        } else {
            post = null;
        }

        return (
            <div>
                <HeaderComponent
                    title={post && !post.deleted ? `${post.category}` : `no post found`}/>

                {post && !post.deleted ? (<div className="container mt-2 ">

                    <div className="row">
                        <div className="col-sm-4 col-md-2 d-flex flex-column text-truncate align-self-center">
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
                            <a  className="d-flex align-self-center"
                               href="#down"
                               onClick={
                                   () => {
                                       API.downVotePost(post.id, false).then((post) => {
                                           this.props.votePost(post.id, post.voteScore);

                                       });

                                       return false
                                   }
                               }
                            >
                                <i className="material-icons">downvote</i>
                            </a>
                        </div>

                        <div className="card col-sm-8 col-md-10">
                            <div className="card-body">
                                <h4 className="card-title">{post.title}</h4>
                                <h6 className="card-subtitle mb-2 text-muted">By<a href="#!">{` ${post.author}`}</a>
                                </h6>
                                <p className="card-text">{post.body}</p>
                                <p className="card-text">
                                    <small className="text-muted">{`${new Date(post.timestamp).toString()}`}</small>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col mt-2">
                        <a className="btn btn-warning" href={`/editpost/${post.id}`}>
                            Edit POST 
                        </a>
                        <a className="btn btn-danger ml-2" href={`#delete`} onClick={() => {
                            API.deletePost(post.id).then(() => {
                                this.props.deletePost(post.id);
                                this.props.history.push(`/${post.category}`)
                            });

                            return false;
                        }}>
                            Delete POST
                        </a>
                    </div>

                    <CommentList comments={comments[post.id] || []}
                              sortMode={this.props.commentsSortMode || 'score'}

                              upVoteComment={
                                  (commentId) => {
                                      API.upVoteComment(commentId).then((comment) => {
                                          this.props.voteComment(comment.id, comment.voteScore, post.id);
                                      });

                                      return false
                                  }
                              }

                              downVoteComment={
                                  (commentId) => {
                                      API.downVoteComment(commentId).then((comment) => {
                                          this.props.voteComment(comment.id, comment.voteScore, post.id);
                                      });

                                      return false
                                  }
                              }

                              sortComments={(sortBy) => {
                                  sortComments(sortBy)
                              }}

                              onSubmitForm={(e) => {
                                  this.submitForm(e, post.id)
                              }}

                              editComment={
                                  (comment) => {
                                      this.props.history.push(`/editcomment/${comment.id}`)
                                  }
                              }

                              deleteComment={
                                  (comment) => {
                                      API.deleteComment(comment.id)
                                          .then(() => {
                                              this.props.deleteComment(comment.id, comment.parentId)
                                          });
                                  }
                              }
                    />
                </div>) : (<div/>)}

            </div>
        );
    }
}

PostDetail.propTypes = {
    posts: PropTypes.array.isRequired,
    displayDeleted: PropTypes.bool,
    displayCategory: PropTypes.bool
};

function mapStateToProps({postreducer, commentreducer}) {
    return {
        posts: postreducer.posts,
        commentsSortMode: commentreducer.sortMode,
        comments: commentreducer.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        votePost: (id, votes) => dispatch(Actions.votePost(id, votes)),
        voteComment: (id, votes, postId) => dispatch(Actions.voteComment(id, votes, postId)),
        updateComments: (comments, postId) => dispatch(Actions.updateComments(comments, postId)),
        sortComments: (sortMode) => dispatch(Actions.sortComments(sortMode)),
        addPost: (post) => dispatch(Actions.addPost(post)),
        deletePost: (id) => dispatch(Actions.deletePost(id)),
        deleteComment: (id, parentId) => dispatch(Actions.deleteComment(id, parentId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));