import { Map } from 'immutable'
import * as actionType from './actionType';

const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbumList: [],
  
  upRanking: {},
  newRanking: {},
  originRanking: {},
});
export default function reducer(state = defaultState, action) {
  //console.log("运行了")
  switch(action.type) {
    case actionType.TOP_BANNERS: 
      return state.set("topBanners", action.topBanners);
    case actionType.HOT_BANNERS: 
      return state.set("hotRecommends", action.hotRecommends);
    case actionType.NEW_ALBUM: 
      return state.set("newAlbumList", action.newAlbumList);

    case actionType.CHANGE_UP_RANKING:
      return state.set("upRanking", action.upRanking);
    case actionType.CHANGE_NEW_RANKING:
      return state.set("newRanking", action.newRanking);
    case actionType.CHANGE_ORIGIN_RANKING:
      return state.set("originRanking", action.originRanking);
    default: 
      return state;
  }
}