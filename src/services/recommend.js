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

export function getNewAlbum() { //获取新碟上架
  return request({
    url: "/album/newest"
  })
}

export function getTopList(id) { //获取榜单数据
  return request({
    url: "/top/list",
    params: {
      id
    }
  })
}