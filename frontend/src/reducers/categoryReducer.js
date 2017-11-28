import { RECEIVE_CATEGORIES } from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return [ ...state, ...action.categories ]
    default:
      return state
  }
}
