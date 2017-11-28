import React from 'react';
import PropTypes from 'prop-types';
import { CardText } from 'material-ui/Card';

const CommentsCount = ({ postId, comments }) => {
  let count = 0;

  if (!comments) {
    return count;
  }

  if (Array.isArray(comments)) {
    count = comments.length;
  }
  else {
    if (comments[postId]) {
      count = comments[postId].length;
    }
  }
  
  const commentText = count === 1 ? "comment" : "comments";
  return (
    <CardText>{count} {commentText}</CardText>
  );
}

CommentsCount.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.any.isRequired
}

export default CommentsCount;
