import { combineReducers } from 'redux'

import CategoryReducer from './categoryReducer'
import PostReducer from './postReducer'
import CommentReducer from './commentReducer'
import SortReducer from './sortReducer'
import FilterReducer from './filterReducer'
import CommentSortReducer from './commentSortReducer'

export default combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  comments: CommentReducer,
  commentsOrder: CommentSortReducer,
  sort: SortReducer,
  filter: FilterReducer 
})
