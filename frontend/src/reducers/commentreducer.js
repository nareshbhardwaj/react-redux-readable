import {
  RECEIVE_COMMENTS,
  INCREASE_COMMENT_SCORE,
  DECREASE_COMMENT_SCORE,
  REMOVE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT
} from '../actions/types'

export default (initialState = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      let newState = { ...initialState }
      if (action.comments.length > 0) {
        const key = action.comments[0].parentId
        newState[key] = action.comments
      } else {
        newState[action.postId] = []
      }
      return newState;

    case INCREASE_COMMENT_SCORE:
      const nState = { ...initialState }
      let nKeys = Object.keys(initialState)
      nKeys.forEach( k => {
        nState[k] = initialState[k].map( e => {
          if (e.id === action.id) {
            return { ...e, voteScore: e.voteScore + 1}
          }
          return e;
        })
      });
      return nState;

    case DECREASE_COMMENT_SCORE:
      const dState = { ...initialState }
      let dKeys = Object.keys(initialState)
      dKeys.forEach( k => {
        dState[k] = initialState[k].map( e => {
          if (e.id === action.id) {
            return { ...e, voteScore: e.voteScore - 1}
          }
          return e;
        })
      });
      return dState;
      
    case REMOVE_COMMENT:
      const rState = { ...initialState }
      let rKeys = Object.keys(initialState)
      rKeys.forEach( k => {
        rState[k] = initialState[k].filter(e => e.id !== action.id)
      });
      return rState;

    case ADD_COMMENT:
      const aState = { ...initialState }
      const parentId = action.comment.parentId
      aState[parentId] = [ ...aState[parentId], action.comment ]
      return aState;      

    case EDIT_COMMENT:
      const { comment } = action;
      const eState = { ...initialState }
      let eKeys = Object.keys(initialState)
      eKeys.forEach( k => {
        eState[k] = initialState[k].map( e => {
          if (e.id === comment.id) {
            return { ...e, body: comment.body, timestamp: comment.timestamp }
          }
          return e;
        })
      });
      return eState;

    default:
      return initialState
  }
}
