import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom'
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import ContentRemove from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import CommentsCount from './CommentsCount';
import Comment from './Comment';
import Score from './Score';
import AppToolbar from './AppToolbar';
import { ASCENDING_ORDER } from '../actions/types';

const PostDetail = (props) => {
  const {
    post, comments,
    commentsOrder,
    changeOrderFunc,
    increasePostScoreFunc, decreasePostScoreFunc,
    increaseCommentScoreFunc, decreaseCommentScoreFunc,
    removeCommentFunc,
    openModalAddCommentFunc,
    openModalEditCommentFunc,
    removePostFunc,
    openModalEditPostFunc,
  } = props;

  if (commentsOrder.order === ASCENDING_ORDER) {
    comments.sort( (a, b) => a[commentsOrder.field] - b[commentsOrder.field] )
  } else {
    comments.sort( (a, b) => b[commentsOrder.field] - a[commentsOrder.field] )
  }

  let commentSectionTitle = <h4>No comments</h4>;
  let commentList;

  if (comments.length !== 0) {
    commentSectionTitle = <h4>Comments</h4>;
    commentList = comments.map((c) =>
      <Comment
        key={c.id}
        id={c.id}
        timestamp={c.timestamp}
        body={c.body}
        author={c.author}
        score={c.voteScore}
        postId={post.id}
        increaseScoreFunc={increaseCommentScoreFunc}
        decreaseScoreFunc={decreaseCommentScoreFunc}
        removeCommentFunc={removeCommentFunc}
        openModalEditCommentFunc={openModalEditCommentFunc}
      />
    );
  }

  return (
    <div>

      <AppToolbar
        sortingTitle="Order"
        sort={commentsOrder}
        changeOrderFunc={changeOrderFunc}
      />

      <Card>
        <CardTitle title={post.title} />

        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          <Link to={`/${post.category}`}>
            <Chip style={{ marginLeft: 10 }}>
              {post.category}
            </Chip>
          </Link>
        </div>

        <CardText>Date: {moment(post.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {post.author} :: </CardText>
        <CardText>{post.body}</CardText>
        
        <Score
          id={post.id}
          score={post.voteScore}
          increaseScoreFunc={increasePostScoreFunc}
          decreaseScoreFunc={decreasePostScoreFunc}
        />

        <CommentsCount
          postId={post.id}
          comments={comments}
        />

        <RaisedButton
          label="Edit"
          onClick={() => openModalEditPostFunc({ id: post.id, title: post.title, body: post.body })}
          style={{margin: 12}}
        >
          <EditorModeEdit />
        </RaisedButton>

        <RaisedButton
          onClick={() => removePostFunc(post.id)}
          label="Remove"
          style={{margin: 12}}
        >
          <ContentRemove />
        </RaisedButton>

      </Card>

      { commentSectionTitle }

      <RaisedButton
        label="Write a comment"
        onClick={ () => openModalAddCommentFunc({ postId: post.id}) }
        style={{ margin: 12 }} />

      { commentList }      
     
    </div>
  );
}

PostDetail.defaultProps = {
  comments: []
}
  
PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  commentsOrder: PropTypes.object.isRequired,
  changeOrderFunc: PropTypes.func.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired,
  increaseCommentScoreFunc: PropTypes.func.isRequired,
  decreaseCommentScoreFunc: PropTypes.func.isRequired,
  removeCommentFunc: PropTypes.func.isRequired,
  openModalAddCommentFunc: PropTypes.func.isRequired,
  openModalEditCommentFunc: PropTypes.func.isRequired,
  removePostFunc: PropTypes.func.isRequired,
  openModalEditPostFunc: PropTypes.func.isRequired
}

export default PostDetail;