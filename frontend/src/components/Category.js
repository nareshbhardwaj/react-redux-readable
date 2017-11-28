import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import AppToolbar from './AppToolbar';

const Category = (props) => {
  const {
    sort,
    posts,
    filter,
    comments,
    commentsOrder,
    changeOrderFunc,
    increasePostScoreFunc,
    decreasePostScoreFunc,
    removePostFunc,
    openModalEditPostFunc
  } = props;

  return (
    <div>
      
      <AppToolbar
        sortingTitle="Order"
        sort={commentsOrder}
        changeOrderFunc={changeOrderFunc}
      />

      <PostList
        posts={posts}
        comments={comments}
        filter={filter}
        sort={sort}
        increasePostScoreFunc={increasePostScoreFunc}
        decreasePostScoreFunc={decreasePostScoreFunc}
        removePostFunc={removePostFunc}
        openModalEditPostFunc={openModalEditPostFunc}
      />

    </div>
  );
};

Category.propTypes = {
  sort: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  commentsOrder: PropTypes.object.isRequired,
  changeOrderFunc: PropTypes.func.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired,
  removePostFunc: PropTypes.func.isRequired,
  openModalEditPostFunc: PropTypes.func.isRequired
}

export default Category;
