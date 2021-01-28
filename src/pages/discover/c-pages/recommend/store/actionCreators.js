import * as actionType from './actionType';

import { 
  getTopBanners, 
  getHotRecommends 
} from '@/services/recommend';

const changeTopBannersAction = (res) => ({
  type: actionType.TOP_BANNERS,
  topBanners: res.banners
})
const changeHotRecommendAction = (res) => ({
  type: actionType.HOT_BANNERS,
  hotRecommends: res.result
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
      console.log(res)
      dispatch(changeHotRecommendAction(res))
    })
  }
}