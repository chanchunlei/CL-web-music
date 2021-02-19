import * as actionType from './actionType';

import { 
  getTopBanners, 
  getHotRecommends,
  getNewAlbum,
  getTopList
} from '@/services/recommend';

const changeTopBannersAction = (res) => ({
  type: actionType.TOP_BANNERS,
  topBanners: res.banners
})
const changeHotRecommendAction = (res) => ({
  type: actionType.HOT_BANNERS,
  hotRecommends: res.result
})

const changeNewAlbumAction = (res) => ({
  type: actionType.NEW_ALBUM,
  newAlbumList: res.albums
})

const changeUpRankingAction = (res) => ({
  type: actionType.CHANGE_UP_RANKING,
  upRanking: res.playlist
})
const changeNewRankingAction = (res) => ({
  type: actionType.CHANGE_NEW_RANKING,
  newRanking: res.playlist
})
const changeOriginRankingAction = (res) => ({
  type: actionType.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist
})

export const getTopBannerAction = () =>{
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannersAction(res));
    })
  }
}
export const getHotRecommendsAction = (limit) => { //获取数据
  return dispatch => {
    getHotRecommends(limit).then(res => {
      //console.log(res)
      dispatch(changeHotRecommendAction(res))
    })
  }
}
export const getNewAlbumAction = () => {
  return dispatch => {
    getNewAlbum().then(res => {
      dispatch(changeNewAlbumAction(res));
    })
  }
}

export const getTopListAction = (idx) => {
  return dispatch => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 19723756:
          dispatch(changeUpRankingAction(res));
          break;
        case 3779629:
          dispatch(changeNewRankingAction(res));
          break;
        case 2884035:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
      }
    });
  }
}


