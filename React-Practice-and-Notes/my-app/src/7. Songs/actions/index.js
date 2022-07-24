// Action creator 
// named export -- import with curly braces
export const selectSong = song => {
  // return an action 
  return {
    type: 'SONG_SELECTED',
    payload: song
  }
}

// default export -- import without curly braces
// export default selectSong;
