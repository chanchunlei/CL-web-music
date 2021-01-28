import {Map} from 'immutable'
import * as actionType from './actionType';

const defaultState = Map({
  topBanners: [],
  hotRecommends: []
});
export default function reducer(state = defaultState, action) {
  //console.log("运行了")
  switch(action.type) {
    case actionType.TOP_BANNERS: 
      return state.set("topBanners", action.topBanners);
    case actionType.HOT_BANNERS: 
      return state.set("hotRecommends", action.hotRecommends);
    default: 
      return state;
  }
}