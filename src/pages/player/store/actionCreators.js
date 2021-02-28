import * as actionTypes from "./actionTypes";
import { getSongDetail, getPlayList } from "@/services/player"

const changeCurrentSongAction = (song) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  song
});
const changePlaylistAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
});
const changeLyricsAction = (lyrics) => ({
  type: actionTypes.CHANGE_LYRICS,
  lyrics
});
const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
});

export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player", "playList"]);
    const songIndex = playList.findIndex(song => song.id === ids);
    if(songIndex !== -1) {
      const currentSong = playList[songIndex];
      dispatch(changeCurrentSongAction(currentSong));
      dispatch(changeCurrentSongIndexAction(songIndex));
    }else {
      getSongDetail(ids).then(res => {
        const song = res.songs && res.songs[0];
        if(!song) return;
        const newList = [...playList];
        newList.push(song);
        dispatch(changeCurrentSongAction(song));
        dispatch(changePlaylistAction(newList));
        dispatch(changeCurrentSongIndexAction(newList.length - 1));
      })
      
    }
    
  }
}

export const getSimiPlayListAction = () => {
  return (dispath, getState) => {
    const id = getState().getIn(["player", "currentSong"]).id;
    if(!id) return;
    getPlayList(id).then(res => {
      dispath(changePlaylistAction(res))
    })
  }
}