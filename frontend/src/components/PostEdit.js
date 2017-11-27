import React, { Component } from 'react';
import HeaderComponent from "./HeaderComponent";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as Actions from "../actions";
import * as API from "../api";

class PostEdit extends Component {
    submitForm = (data) => {
        const {id} = this.props.match.params;
        const {posts} = this.props;

        let post = posts.filter((p) => {
            return p.id === id
        });

        if (post.length) {
            post = post[0];
        } else {
            post = null;
        }

        if (post) {
            API.editPost(post.id, {
                title: data.title,
                body: data.body
            }).then((post) => {
                this.props.editPost(post);
                this.props.history.push(`/${post.category}/${post.id}`)
            }).catch((e) => {
                console.error("Error editing post: ", e)
            });
        }
    };

    render() {
        const {id} = this.props.match.params;
        const {categories, posts} = this.props;

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
                <HeaderComponent title="Editing post"/>

                {(post) ? (
                    <div className="container mt-2">
                    <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
    
                        this.submitForm({
                            title: this.title.value,
                            body: this.body.value,
                            author: this.author.value || 'Anon',
                            category: this.category.value
                        })
                    }}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="Title"
                                   required 
                                   ref={(title) => this.title = title}/>
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select className="form-control" id="category"
                                    ref={(category) => this.category = post.category}>
                                {categories && categories.map((c) => {
                                    return (c.name === post.category) ?
                                        (<option key={c.name} selected='selected'>{c.name}</option>) :
                                        (<option key={c.name}>{c.name}</option>)
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                    </div>
                ) : (<div/>)}
            </div>
        );
    }
}

function mapStateToProps({postreducer, categoryreducer}) {
    return {
        posts: postreducer.posts,
        categories: categoryreducer.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(Actions.addPost(post)),
        editPost: (post) => dispatch(Actions.editPost(post)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEdit));