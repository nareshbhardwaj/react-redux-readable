import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as Actions from "../actions";
import * as API from "../api";
import * as UUIDV1 from 'uuid/v1';

class AddPost extends Component {
    submitForm = (data) => {
        API.writePost({
            id: UUIDV1(),
            timestamp: new Date().getTime(),
            title: data.title,
            body: data.body,
            author: data.author,
            category: data.category
        }).then((post) => {
            this.props.addPost(post);
            this.props.history.push(`/${post.category}/${post.id}`)
        });
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {category} = this.props.match.params;
        const {categories} = this.props;

        return (
            <div>
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
                                ref={(category) => this.category = category}>
                            {categories && categories.map((c) => {
                                return (c.name === category) ?
                                    (<option key={c.name} selected='selected'>{c.name}</option>) :
                                    (<option key={c.name}>{c.name}</option>)
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(Actions.addPost(post))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(AddPost));