export const fetchPosts = () => {
  // the extraArgument from configureStore is the 3rd argument
  return async (dispatch, getState, api) => {
    const { data } = await api.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: data })
  }
}

export const fetchUser = (id) => {
  return async (dispatch, getState, api) => {
    const { data } = await api.get(`/users/${id}`);
    
    dispatch({
      type: 'FETCH_USER',
      payload: data
    })
  }
}