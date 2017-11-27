
export const CATEGORIES_UPDATE = 'CATEGORIES_UPDATE';
export const POSTS_UPDATE = 'POSTS_UPDATE';
export const POSTS_VOTE = 'POSTS_VOTE';
export const POSTS_DELETE = 'POSTS_DELETE';
export const POSTS_SORT = 'POSTS_SORT';
export const POSTS_ADD = 'POSTS_ADD';
export const POSTS_EDIT = 'POSTS_EDIT';
export const COMMENTS_UPDATE = 'COMMENTS_UPDATE';
export const COMMENTS_SORT = 'COMMENTS_SORT';
export const COMMENTS_VOTE = 'COMMENTS_VOTE';
export const COMMENTS_DELETE = 'COMMENTS_DELETE';
export const COMMENTS_EDIT = 'COMMENTS_EDIT';

export function updateCategories(categories) {
    return {
        type: CATEGORIES_UPDATE,
        categories
    }
}

export function updatePosts(posts) {
    return {
        type: POSTS_UPDATE,
        posts
    }
}

export function updateComments(comments, postId) {
    return {
        type: COMMENTS_UPDATE,
        comments,
        postId
    }
}

export function votePost(id, votes) {
    return {
        type: POSTS_VOTE,
        votes,
        id
    }
}

export function voteComment(id, votes, postId) {
    return {
        type: COMMENTS_VOTE,
        votes,
        id,
        postId
    }
}

export function deletePost(id) {
    return {
        type: POSTS_DELETE,
        id
    }
}

export function deleteComment(id, parentId) {
    return {
        type: COMMENTS_DELETE,
        id,
        parentId
    }
}

export function sortPosts(sortMode) {
    return {
        type: POSTS_SORT,
        sortMode
    }
}

export function sortComments(sortMode) {
    return {
        type: COMMENTS_SORT,
        sortMode
    }
}

export function addPost(post) {
    return {
        type: POSTS_ADD,
        post
    }
}

export function editPost(post) {
    return {
        type: POSTS_EDIT,
        post
    }
}

export function editComment(comment) {
    return {
        type: COMMENTS_EDIT,
        comment
    }
}