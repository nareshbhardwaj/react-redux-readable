import history from '../utils/history';
import {
  fetchCategories,
  fetchPosts,
  addPostAPI,
  removePostAPI,
  editPostAPI,
  fetchComments,
  increasePostScoreAPI,
  decreasePostScoreAPI,
  increaseCommentScoreAPI,
  decreaseCommentScoreAPI,
  removeCommentAPI,
  addCommentAPI,
  editCommentAPI
} from '../utils/api.js'

import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  
  RECEIVE_CATEGORIES,
  
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  
  CHANGE_SORT_ORDER,
  CHANGE_COMMENTS_ORDER,
  
  INCREASE_POST_SCORE,
  DECREASE_POST_SCORE,
  
  INCREASE_COMMENT_SCORE,
  DECREASE_COMMENT_SCORE,
  
  SET_CATEGORY_FILTER
} from './types'

// define action creators

// this sintax is the same as:
// addPost(data) { 
//   return function(dispatch) {
//     ...
//   }
// }

export const addPost = (data) => async (dispatch) => {
  try {
    await addPostAPI(data)
    dispatch({
      type: ADD_POST,
      post: data
    });
  }
  catch(err) {
    console.error("Error adding new post", err)
  }
}

export const removePost = (id) => async (dispatch) => {
  try {
    await removePostAPI(id)
    dispatch({
      type: REMOVE_POST,
      id
    });
    history.push('/');
  }
  catch(err) {
    console.error("Error removing post", err)
  }
}

export const editPost = (data) => async (dispatch) => {
  try {
    await editPostAPI(data)
    dispatch({
      type: EDIT_POST,
      post: data
    });
  }
  catch(err) {
    console.error("Error editing post", err)
  }
}

const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const getPosts = () => async (dispatch) => {
  try {
    const posts = await fetchPosts()
    dispatch(receivePosts(posts))

    // for each post, go get its comments
    posts.forEach((p) => {
      dispatch(getCommentsByPost(p.id))
    })
  } catch(err) {
    console.error("Error getting posts", err)
  }
}

const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const getCategories = () => (dispatch) => {
  fetchCategories()
  .then(data => {
    dispatch(receiveCategories(data.categories))
  })
  .catch(err => console.error(err))
}

export const getCommentsByPost = (postId) => async (dispatch) => {
  try {
    const comments = await fetchComments(postId);
    dispatch(receiveComments(comments, postId))
  } catch(err) {
    console.error("Error getting posts", err)
  }
}

const receiveComments = (comments, postId) =>  ({
  type: RECEIVE_COMMENTS,
  comments,
  postId
});

export const changeCommentsOrder = (order) => ({
  type: CHANGE_COMMENTS_ORDER,
  sort: order
})

// action creator for a synchronous action (change sort order)
export const changeSortOrder = (sortOrder) => ({
  type: CHANGE_SORT_ORDER,
  sort: sortOrder
})

// action cretor to define a category filter
export const setCategoryFilter = (categoryFilter) => ({
  type: SET_CATEGORY_FILTER,
  filter: categoryFilter
})

export const increasePostScore = (id, posts) => async (dispatch) => {
  try {
    await increasePostScoreAPI(id)
    dispatch({
      type: INCREASE_POST_SCORE,
      id
    })
  }
  catch(err) {
    console.error("Error increasing post voteScore", err)
  }
}

export const decreasePostScore = (id) => async (dispatch) => {
  try {
    await decreasePostScoreAPI(id)
    dispatch({
      type: DECREASE_POST_SCORE,
      id
    })
  }
  catch(err) {
    console.error("Error decreasing post voteScore", err)
  }
}

export const increaseCommentScore = (id) => async (dispatch) => {
  try {
    await increaseCommentScoreAPI(id)
    dispatch({
      type: INCREASE_COMMENT_SCORE,
      id
    })
  }
  catch(err) {
    console.error("Error increasing comment score", err)
  }
}

export const decreaseCommentScore = (id) => async (dispatch) => {
  try {
    await decreaseCommentScoreAPI(id)
    dispatch({
      type: DECREASE_COMMENT_SCORE,
      id
    })
  }
  catch(err) {
    console.error("Error decreasing comment score", err)
  }
}

export const removeComment = (id) => async (dispatch) => {
  try {
    await removeCommentAPI(id)
    dispatch({
      type: REMOVE_COMMENT,
      id
    })
  }
  catch(err) {
    console.error("Error removing comment", err)
  }
}

export const addComment = (data) => async (dispatch) => {
  try {
    await addCommentAPI(data)
    dispatch({
      type: ADD_COMMENT,
      comment: data
    });
  }
  catch(err) {
    console.error("Error removing comment", err)
  }
}

export const editComment = (data) => async (dispatch) => {
  try {
    await editCommentAPI(data)
    dispatch({
      type: EDIT_COMMENT,
      comment: data
    });
  }
  catch(err) {
    console.error("Error editing comment", err)
  }
}