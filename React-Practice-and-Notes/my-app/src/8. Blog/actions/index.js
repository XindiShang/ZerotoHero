export const fetchPost = () => {
  // the extraArgument from configureStore is the 3rd argument
  return async function (dispatch, getState, api) {
    const { data } = await api.get('/posts');

    dispatch({ type: 'FETCH_POST', payload: data })
  }
}