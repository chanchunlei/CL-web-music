import * as actionTypes from "./actionTypes";
import { getSongDetail, getPlayList, getLyric} from "@/services/player"
import { parseLyric } from '@/utils/lrc-parse';

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

export const changeCurrentLyricIndexAction = (index) => ({ //当前歌单下标
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  index
})

export const changePlaySequenceAction = (currentSequence) => {
  if(currentSequence === 3) currentSequence = 0;
  return {
    type: actionTypes.CHANGE_PLAY_SEQUENCE,
    sequence: currentSequence
  }

}

export const changePlaySongAction = (tag) => {
  return (dispatch,getState) => {
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
    const playSequence = getState().getIn(["player", "playSequence"]);
    const playList = getState().getIn(["player", "playList"]);

    switch (playSequence) {
      case 1:
        currentSongIndex = Math.floor(Math.random() * playList.length);
        break;
      default:
        currentSongIndex += tag;
        if(currentSongIndex === playList.length) currentSongIndex = 0;
        if(currentSongIndex === -1) currentSongIndex = playList.length - 1;
        break;
    }

    const currentSong = playList[currentSongIndex];
    dispatch(changeCurrentSongIndexAction(currentSongIndex));
    dispatch(changeCurrentSongAction(currentSong));
    getLyric(currentSong.id).then(res => {
      const lrcString = res.lrc.lyric;
      const lyrics = parseLyric(lrcString);
      dispatch(changeLyricsAction(lyrics));
    })

  }
}

export const getSongDetailAction = (ids) => { 
  return (dispatch, getState) => {
    getLyric(ids).then(res => {
      const lrcString = res.lrc.lyric;
      const lyrics = parseLyric(lrcString);
      dispatch(changeLyricsAction(lyrics));
    })
    
    const playList = getState().getIn(["player", "playList"]);
    const songIndex = playList.findIndex(song => song.id === ids);
    if(songIndex !== -1) {
      const currentSong = playList[songIndex];
      dispatch(changeCurrentSongIndexAction(songIndex));
      dispatch(changeCurrentSongAction(currentSong));
    }else {
      getSongDetail(ids).then(res => {
        const song = res.songs && res.songs[0];
        if(!song) return;
        const newList = [...playList];
        newList.push(song);
        dispatch(changeCurrentSongIndexAction(newList.length - 1));
        dispatch(changeCurrentSongAction(song));
        dispatch(changePlaylistAction(newList));
        
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




