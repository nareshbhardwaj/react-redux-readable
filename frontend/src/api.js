const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json',
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers, method: 'GET' })
    .then((res) => res.json())
    .then(data => data.categories)

export const fetchPosts = () =>
  fetch(`${api}/posts`, { headers, method: 'GET'  })
  	.then(res => res.json())

export const fetchPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers, method: 'GET'  })
  	.then(res => res.json())
  	.then(data => data)

export const fetchComment = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers, method: 'GET' })
    .then((res) => res.json())
    .then(data => data)

export const deleteComment = (commentId) => {
  fetch(`${api}/comments/${commentId}`, { headers, method: 'DELETE',
  body: JSON.stringify({
    deleted: true,
    })
  })
}
export const writePost = (post) => {
  return fetch(`${api}/posts`, { headers, method: 'POST',
  body: JSON.stringify({
    id: post.id,
    timestamp: post.timestamp,
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category,
    })
  }).then(res => res.json());
}

export const writeComment = (comment) => {
  fetch(`${api}/comments`, { headers, method: 'POST',
  body: JSON.stringify({
    id: comment.id,
    timestamp: comment.timestamp,
    body: comment.body,
    author: comment.author,
    parentId: comment.parentId,
    })
  })
}

export const updateComment = (id, timestamp, body, author) => {
  fetch(`${api}/comments/${id}`, { headers, method: 'PUT',
  body: JSON.stringify({
    timestamp: timestamp,
    body: body,
    author: author,
    })
  })
}

export const deletePost = (postId) => {
  fetch(`${api}/posts/${postId}`, { headers, method: 'DELETE',
  body: JSON.stringify({
    deleted: true,
    })
  })
}

export const upVotePost = (postId) => {
  return fetch(`${api}/posts/${postId}`, { headers, method: 'POST',
  body: JSON.stringify({
    option: 'upVote',
    })
  }).then((res) => res.json()) 
}


export const downVotePost = (postId) => {
  return fetch(`${api}/posts/${postId}`, { headers, method: 'POST',
  body: JSON.stringify({
    option: 'downVote',
    })
  }).then((res) => res.json())  
}
export const upVoteComment = (commentId) => {
  fetch(`${api}/comments/${commentId}`, { headers, method: 'POST',
  body: JSON.stringify({
    option: 'upVote',
    })
  })
}

export const downVoteComment = (commentId) => {
  fetch(`${api}/comments/${commentId}`, { headers, method: 'POST',
  body: JSON.stringify({
    option: 'downVote',
    })
  })
}