const getAuthHeaders = () => {
  const headers = new Headers();
  headers.append('Authorization', 'xcx')
  headers.append('Content-Type', 'application/json')
  return headers
};

export const fetchCategories = () => {
  const options = { method: 'get', headers: getAuthHeaders() }
  return fetch('http://localhost:3001/categories', options)
    .then(
      res => res.json()
    )
    .catch(err => console.error(err))
}

export const fetchPosts = () => {
  const options = { method: 'get', headers: getAuthHeaders() }
  return fetch('http://localhost:3001/posts', options)
    .then(
      res => {
        return res.json()
      }
    )
    .catch(err => console.error(err))
}

export const addPostAPI = async (data) => {
  const options = {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: data.id,
      timestamp: data.timestamp,
      title: data.title,
      author: data.author,
      body: data.body,
      category: data.category,
      voteScore: 0,
      deleted: false
    })
  };
  try {
    const res = await fetch(`http://localhost:3001/posts`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }  
}

export const removePostAPI = async (postId) => {
  const options = {
    method: 'delete',
    headers: getAuthHeaders()
  }
  try {
    const res = await fetch(`http://localhost:3001/posts/${postId}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const editPostAPI = async (data) => {
  const { id, title, body } = data;
  const options = {
    method: 'put',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title,
      body
    })
  }
  try {
    const res = await fetch(`http://localhost:3001/posts/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const increasePostScoreAPI = (postId) => {
  const options = {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      option: 'upVote'
    })
  }
  return fetch(`http://localhost:3001/posts/${postId}`, options)
  .then(
    res => {
      return res.json()
    }
  )
  .catch(err => console.error(err))
}

export const decreasePostScoreAPI = (postId) => {
  const options = {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      option: 'downVote'
    })
  }
  return fetch(`http://localhost:3001/posts/${postId}`, options)
  .then(
    res => {
      return res.json()
    }
  )
  .catch(err => console.error(err))
}

export const fetchComments = async (postId) => {
  const options = { method: 'get', headers: getAuthHeaders() }
  try {
    const res = await fetch(`http://localhost:3001/posts/${postId}/comments`, options)
    return res.json()
  } catch (err) {
    console.err(err)
  }
}

export const increaseCommentScoreAPI = async (commentId) => {
  const options = {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      option: 'upVote'
    })
  }
  try {
    const res = await fetch(`http://localhost:3001/comments/${commentId}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const decreaseCommentScoreAPI = async (commentId) => {
  const options = {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      option: 'downVote'
    })
  }
  try {
    const res = await fetch(`http://localhost:3001/comments/${commentId}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const removeCommentAPI = async (commentId) => {
  const options = {
    method: 'delete',
    headers: getAuthHeaders()
  }
  try {
    const res = await fetch(`http://localhost:3001/comments/${commentId}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const addCommentAPI = async (data) => {
  const options = {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: data.id,
      body: data.body,
      author: data.author,
      parentId: data.parentId,
      timestamp: data.timestamp,
      voteScore: 0
    })
  }
  try {
    const res = await fetch(`http://localhost:3001/comments`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}

export const editCommentAPI = async (data) => {
  const { id, timestamp, body } = data;
  const options = {
    method: 'put',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      timestamp: timestamp,
      body: body
    })
  }
  try {
    const res = await fetch(`http://localhost:3001/comments/${id}`, options)
    return res.json()
  }
  catch (err) {
    console.error(err)
  }
}