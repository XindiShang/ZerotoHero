import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // use dispatch here because redux-thunk will dispatch this function
  await dispatch(fetchPosts());
  // _.map(collection, property) returns the new array consists only of values of the given property
  // _.uniq(array) returns the new array consists only of unique values
  // const userIds = _.uniq(_.map(getState().posts, 'userId'))
  // This time, we don't have to await because there aren't following actions
  // userIds.forEach(id => dispatch(fetchUser(id)));

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value(); // This is a MUST-DO step to make sure the chain is executed
}

export const fetchPosts = () => {
  // the extraArgument from configureStore is the 3rd argument
  return async (dispatch, _getState, api) => {
    const { data } = await api.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: data })
  }
}

// export const fetchUser = id => (dispatch, _getState, api) => {
//   // Solution 1: define the memoize function outside of the action creator, so the memoize function is always at the same address in memory.
//   // In other words, it's always gonna be the same function.
//   _fetchUser(id, dispatch, api)
// }

// const _fetchUser = _.memoize(async (id, dispatch, api) => {
//   const { data } = await api.get(`/users/${id}`);
//   dispatch({
//     type: 'FETCH_USER',
//     payload: data
//   })
// })

// export const unMemoizedFetchUser = id => (dispatch, _getState, api) => {
//  // This won't memoize successfully, because each time this action is created (fetching the user),
//   // it will create a new memoize function in memory. What we want is the same memoize function each time action is created.
//   return _.memoize(async (id, dispatch, api) => {
//     const { data } = await api.get(`/users/${id}`);
//     dispatch({
//       type: 'FETCH_USER',
//       payload: data
//     })
//   })
// }


export const fetchUser = id => {
  return async (dispatch, _getState, api) => {
    const { data } = await api.get(`/users/${id}`);
    dispatch({
      type: 'FETCH_USER',
      payload: data
    })
  }
}