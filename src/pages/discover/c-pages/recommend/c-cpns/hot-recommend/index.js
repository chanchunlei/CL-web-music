import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getHotRecommendsAction } from '../../store/actionCreators';
import { HOT_RECOMMEND_LIMIT } from '@/common/contants'

import { HotRecommendWrapper } from './style';
import CLThemeHeaderRCM from '@/components/theme-header-rcm';
import CLSongsCover from '@/components/songs-cover'

export default memo(function CLHotRecommend() {

  //state
  //redux hooks
  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.getIn(["recommend", "hotRecommends"])
  }), shallowEqual);
  const dispatch = useDispatch();

  //other hooks
  useEffect(() => {
    dispatch(getHotRecommendsAction(HOT_RECOMMEND_LIMIT));
  }, [dispatch]);
  return (
    <HotRecommendWrapper>
      <CLThemeHeaderRCM title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]} />
      <div className="recommend-list">
        {
          hotRecommends.map((item, index) => {
            return (
              <CLSongsCover key={item.id} info={item}/>
            )
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
