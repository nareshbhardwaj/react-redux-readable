import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppToolbar from './AppToolbar';
import PostList from './PostList';

const Root = (props) => {
  const {
    sort, posts, categories, comments, filter,
    changeOrderFunc, filterFunc,
    increasePostScoreFunc, decreasePostScoreFunc,
    openModalAddPostFunc, removePostFunc,
    openModalEditPostFunc
  } = props;

  return (
    <div>
      <AppToolbar
        filterTitle="Category"
        categories={categories}
        filterFunc={filterFunc} 
        filter={filter}
        sortingTitle="Order"
        sort={sort}
        changeOrderFunc={changeOrderFunc}
      />

      <PostList
        posts={posts}
        comments={comments}
        sort={sort}
        filter={filter}
        increasePostScoreFunc={increasePostScoreFunc}
        decreasePostScoreFunc={decreasePostScoreFunc}
        removePostFunc={removePostFunc}
        openModalEditPostFunc={openModalEditPostFunc}
      />

      <FloatingActionButton
        style={{ margin: 20 }}
        onClick={ openModalAddPostFunc }
      >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};

Root.propTypes = {
  sort: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  changeOrderFunc: PropTypes.func.isRequired,
  filterFunc: PropTypes.func.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired,
  openModalAddPostFunc: PropTypes.func.isRequired,
  removePostFunc: PropTypes.func.isRequired,
  openModalEditPostFunc: PropTypes.func.isRequired
}

export default Root;
