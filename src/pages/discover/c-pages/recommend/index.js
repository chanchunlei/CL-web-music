import React, { memo } from 'react';

import CLTopBanner from './c-cpns/top-banner';
import CLHotRecommend from './c-cpns/hot-recommend';
import CLNewAlbum from './c-cpns/new-album';
import CLRecommendRanking from './c-cpns/recommend-ranking';
import { 
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style'

function CLRecommend(props) {
  
  return (
    <RecommendWrapper>
      <CLTopBanner/>
      <Content className="wrap-v2">
        <RecommendLeft>
          <CLHotRecommend />
          <CLNewAlbum />
          <CLRecommendRanking/>
        </RecommendLeft>
        <RecommendRight>
          
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}
/*
//获取state
const mapStateToProps = state => ({
  topBanners: state.recommend.topBanners
})
//派发action
const mapDispatchToProps = dispatch => ({
  getBanners: () => {
    dispatch(getTopBannerAction())
  }
})
*/

export default memo(CLRecommend);
//export default connect(mapStateToProps, mapDispatchToProps)(memo(CLRecommend));
