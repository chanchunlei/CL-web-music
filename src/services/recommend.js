import request from './request';

export function getTopBanners() { //banner数据
  return request({
    url: "/banner"
  })
}
export function getHotRecommends(limit) { //获取热门推荐
  return request({
    url: "/personalized",
    params: {
      limit
    }
  })
}
