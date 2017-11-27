import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortComponent from './SortComponent';

class CommentList extends Component {

    static filterComments(comments, displayDeleted) {
        if (!displayDeleted && comments) {
            return comments.filter((comment) => (!comment.deleted));
        } else {
            return comments || [];
        }
    }

    render() {
        const {
            comments, sortMode, displayDeleted, upVoteComment, downVoteComment, sortComments, onSubmitForm,
            editComment, deleteComment
        } = this.props;

        return (
            <div className="mt-2">
                <SortComponent sortContent={(sortBy) => {
                    sortComments(sortBy)
                }}/>

                {
                    CommentList.filterComments(comments, displayDeleted || false).sort((c1, c2) => {
                        switch (sortMode) {
                            case 'score':
                            default:
                                return c1.voteScore < c2.voteScore ? 1 : -1;
                            case 'newest':
                                return c1.timestamp < c2.timestamp ? 1 : -1;
                        }
                    }).map((comment) =>
                        (
                            <div className="row" key={comment.id}>
                                <div className="col-sm-4 col-md-2 d-flex flex-column text-truncate align-self-center">
                                    <a className="d-flex align-self-center"
                                       href="#up"
                                       onClick={() => {
                                           upVoteComment(comment.id)
                                       }}
                                    >
                                        <i className="material-icons">upVoteComment</i>
                                    </a>
                                    <p className="mb-0 text-truncate" >{comment.voteScore}</p>
                                    <a  className="d-flex align-self-center"
                                       href="#down"
                                       onClick={() => {
                                           downVoteComment(comment.id)
                                       }}
                                    >
                                        <i className="material-icons">downVoteComment</i>
                                    </a>
                                </div>

                                <div className="card mt-2 col-sm-8 col-md-10">
                                    <div className="card-body">

                                        <p className="card-text">{comment.body}</p>
                                        <h6 className="card-subtitle mb-2 text-muted">By
                                            <a href="#!">{` ${comment.author}`}</a>
                                        </h6>

                                        <p className="card-text">
                                            <small
                                                className="text-muted">{`${new Date(comment.timestamp).toString()}`}</small>
                                        </p>

                                        <a href="#edit" className="card-link btn btn-outline-warning" onClick={
                                            () => {
                                                editComment(comment)
                                            }
                                        }>
                                            Edit Comment
                                        </a>
                                        <span>   </span>
                                        <a href="#delete" className="card-link btn btn-outline-danger" onClick={
                                            () => {
                                                deleteComment(comment)
                                            }
                                        }>
                                            Delete Comment
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }

                <form onSubmit={(e) => {
                    e.preventDefault();

                    onSubmitForm({
                        body: this.body.value,
                        author: this.author.value || 'Anon'
                    })
                }}>
                    <div className="form-group">
                        <label htmlFor="body">Content</label>
                        <textarea type="text" className="form-control" id="body"
                                  placeholder="Content" rows={3}
                                  required
                                  ref={(body) => this.body = body}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" id="author" placeholder="Author"
                               ref={(author) => this.author = author}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add comment</button>
                </form>
            </div>
        );
    }
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    sortMode: PropTypes.string.isRequired,
    upVoteComment: PropTypes.func.isRequired,
    downVoteComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    sortComments: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    displayDeleted: PropTypes.bool
};

export default CommentList;