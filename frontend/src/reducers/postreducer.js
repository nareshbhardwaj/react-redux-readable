import * as Actions from '../actions'

export default (state = {posts: [], sortMode: 'score'}, action) => {
    switch (action.type) {
        case Actions.POSTS_UPDATE: {
            const {posts} = action;

            return {
                ...state,
                posts
            };
        }

        case Actions.POSTS_DELETE: {
            const {id} = action;

            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === id) {
                        post.deleted = true;
                    }

                    return post;
                })
            };
        }

        case Actions.POSTS_EDIT: {
            const {post} = action;

            return {
                ...state,
                posts: state.posts.map((p) => {
                    if (p.id === post.id) {
                        p = post;
                    }

                    return p;
                })
            };
        }

        case Actions.POSTS_VOTE: {
            const {id, votes} = action;

            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === id) {
                        post.voteScore = votes;
                    }

                    return post;
                })
            };
        }

        case Actions.POSTS_SORT: {
            const {sortMode} = action;

            return {
                ...state,
                sortMode
            };
        }

        case Actions.POSTS_ADD: {
            const {post} = action;

            return {
                ...state,
                posts: state.posts.concat(post)
            };
        }

        default:
            return state;
    }
};