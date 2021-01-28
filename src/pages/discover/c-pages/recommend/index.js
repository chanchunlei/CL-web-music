import React, { memo } from 'react';

import HYTopBanner from './c-cpns/top-banner';
import CLHotRecommend from './c-cpns/hot-recommend'
import { 
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style'

function CLRecommend(props) {
  
  return (
    <RecommendWrapper>
      <HYTopBanner/>
      <Content className="wrap-v2">
        <RecommendLeft>
          <CLHotRecommend />
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
