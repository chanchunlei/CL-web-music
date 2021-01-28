import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {getTopBannerAction} from '../../store/actionCreators';
import {Carousel} from 'antd';

import {
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl
} from './style';

export default memo(function CLTopBanner() {
  // const {getBanners} = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  //代替connect
  const { topBanners } = useSelector(state => ({
    // topBanners: state.get("recommend").get("topBanners")
    topBanners: state.getIn(["recommend", "topBanners"])
  }), shallowEqual); //第二个参数优化数据变化，是否重新render
  //组件和redux 关联，获取数据和进行操作
  const dispatch = useDispatch();
 //发送网络请求
 useEffect(() => {
  dispatch(getTopBannerAction());
}, [dispatch]) //第二个参数，getBanners更新的时候

  //其他hooks
  const bannerRef = useRef(); //拿到轮播图组件

  const bannerChange = useCallback((from, to) => {
    setTimeout(() => {
      setCurrentIndex(to);
    }, 0)
  }, [])

  const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20");
  
  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
            {
              topBanners.map((item, index) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
          <button className="btn right" onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>

      
    </BannerWrapper>
  )
})

