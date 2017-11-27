import * as Actions from '../actions'

export default (state = {comments: {}, sortMode: 'score', allComments: []}, action) => {
    switch (action.type) {
        case Actions.COMMENTS_UPDATE: {
            const {comments, postId} = action;

            return {
                ...state,
                comments: {
                    ...state.comments,
                    [postId]: comments
                }
            };
        }

        case Actions.COMMENTS_VOTE: {
            const {id, votes, postId} = action;

            return {
                ...state,
                comments: {
                    ...state.comments,
                    [postId]: state.comments[postId].map((comment) => {
                        if (comment.id === id) {
                            comment.voteScore = votes
                        }

                        return comment
                    })
                }
            };
        }

        case Actions.COMMENTS_SORT: {
            const {sortMode} = action;

            return {
                ...state,
                sortMode
            };
        }

        case Actions.COMMENTS_DELETE: {
            const {id, parentId} = action;

            return {
                ...state,
                comments: {
                    ...state.comments,
                    [parentId]: state.comments[parentId].filter((comment) => {
                        return comment.id !== id
                    })
                }
            }
        }

        case Actions.COMMENTS_EDIT: {
            const {comment} = action;

            return {
                ...state,
                [comment.parentId]: state.comments[comment.parentId].map((c) => {
                    if (comment.id === c.id) {
                        c = comment;
                    }

                    return c
                })
            }
        }

        default:
            return state;
    }
}