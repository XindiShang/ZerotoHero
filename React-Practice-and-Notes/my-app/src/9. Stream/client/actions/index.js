import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "./types";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
}

export const createStream = formValues => {
  return async (dispatch, getState, api) => {
    const { userId } = getState().auth;
    const { data } = await api.post('/streams', { ...formValues, userId });
    dispatch({
      type: CREATE_STREAM,
      payload: data
    })
    history.push('/');
  }
}

export const fetchStreams = () => {
  return async (dispatch, _getState, api) => {
    const { data } = await api.get('/streams');
    dispatch({
      type: FETCH_STREAMS,
      payload: data
    })
  }
}

export const fetchStream = id => {
  return async (dispatch, _getState, api) => {
    const { data } = await api.get(`/streams/${id}`);
    dispatch({
      type: FETCH_STREAM,
      payload: data
    })
  }
}

export const editStream = (id, formValues) => {
  return async (dispatch, _getState, api) => {
    const { data } = await api.patch(`/streams/${id}`, formValues);
    dispatch({
      type: EDIT_STREAM,
      payload: data
    })
    history.push('/');
  }
}

export const deleteStream = id => {
  return async (dispatch, _getState, api) => {
    await api.delete(`/streams/${id}`);
    dispatch({
      type: DELETE_STREAM,
      payload: id
    })
  }
}



