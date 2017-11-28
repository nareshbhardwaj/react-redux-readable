import {
  CHANGE_SORT_ORDER,
  DESCENDING_ORDER
} from '../actions/types'

const defaultSortOrder = {
  field: 'voteScore',
  order: DESCENDING_ORDER
};

export default (state = defaultSortOrder, action) => {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return {
        field: action.sort.field,
        order: action.sort.order
      }
    default:
      return state
  }
}
