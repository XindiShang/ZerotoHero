import { combineReducers } from 'redux';

const songsReducer = () => {
  return [
    { title: 'Running Up That hill', duration: '5:02' },
    { title: 'The way you make me feel', duration: '3:02' },
    { title: 'I want to be the one', duration: '4:02' },
    { title: 'lowkey', duration: '2:51' }
  ]
}

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  }
  return selectedSong;
}

const reducers = combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
})

export default reducers;