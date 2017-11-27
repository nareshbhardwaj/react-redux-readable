import React, {Component} from 'react';
import HeaderComponent from "./HeaderComponent";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as Actions from "../actions";
import * as API from "../api";

class CommentEdit extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;

        API.fetchComment(id).then(
            (comment) => {
                let comments = [];
                comments.push(comment);

                this.props.updateComments(comments, comment.parentId);
            }
        )
    }

    render() {
        const {id} = this.props.match.params;
        const {comments} = this.props;

        let comment = null;

        for (let i in comments) {
            if (comments.hasOwnProperty(i)) {
                comment = comments[i].filter((c) => {
                    return c.id === id
                });
            }
        }

        if (comment && comment.length === 1) {
            comment = comment[0];
        } else {
            comment = null;
        }

        return (
            <div>
                <HeaderComponent title="Editing comment"/>

                {(comment) ? (
                    <div className="container mt-2">
                        <form onSubmit={(e) => {
                            e.preventDefault();

                            API.editComment(comment.id, {
                                body: this.body.value,
                                timestamp: new Date().getTime()
                            }).then((comment) => {
                                let comments = [];
                                comments.push(comment);

                                this.props.updateComments(comments, comment.parentId);
                                this.props.history.push(`/`)
                            })
                        }}>
                            <div className="form-group">
                                <label htmlFor="body">Content</label>
                                <textarea type="text" className="form-control" id="body"
                                          placeholder="Content" rows={3}
                                          defaultValue={comment.body}
                                          required
                                          ref={(body) => this.body = body}/>
                            </div>
                            <div className="form-group">
                                <span>By {comment.author}</span>
                            </div>
                            <button type="submit" className="btn btn-primary">Edit comment</button>
                        </form>
                    </div>
                ) : (<div/>)}
            </div>
        );
    }
}

function mapStateToProps({commentreducer}) {
    return {
        comments: commentreducer.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editComment: (comment) => dispatch(Actions.editComment(comment)),
        updateComments: (comments) => dispatch(Actions.updateComments(comments))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentEdit));