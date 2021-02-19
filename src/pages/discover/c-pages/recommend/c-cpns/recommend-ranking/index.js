import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import CLThemeHeaderRCM from '@/components/theme-header-rcm';
import CLTopRanking from '@/components/top-ranking';

import { getTopListAction } from '../../store/actionCreators';

import {
  RankingWrapper
} from './style';

export default memo(function CLRecommendRanking() {  
  const { upRanking, newRanking, originRanking } = useSelector(state => ({
    upRanking: state.getIn(["recommend", "upRanking"]),
    newRanking: state.getIn(["recommend", "newRanking"]),
    originRanking: state.getIn(["recommend", "originRanking"])
  }),shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopListAction(19723756));
    dispatch(getTopListAction(3779629));
    dispatch(getTopListAction(2884035));
  }, [dispatch])

  return (
    <RankingWrapper>
      <CLThemeHeaderRCM title="榜单"/>
      <div className="tops">
        <CLTopRanking info={upRanking}/>
        <CLTopRanking info={newRanking}/>
        <CLTopRanking info={originRanking}/>
      </div>
    </RankingWrapper>
  )
})
