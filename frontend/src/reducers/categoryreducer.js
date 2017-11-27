import * as Actions from '../actions'

export default (state = {categories: []}, action) => {
    switch (action.type) {
        case Actions.CATEGORIES_UPDATE:
            const {categories} = action;

            return {
                ...state,
                categories
            };

        default:
            return state;
    }
};