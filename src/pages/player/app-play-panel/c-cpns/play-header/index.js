import React, { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight
} from './style';
export default memo(function CLPlayHeader() {
  const { currentSong, playList } = useSelector((state) => ({
    currentSong: state.getIn(["player", "currentSong"]),
    playList: state.getIn(["player", "playList"])
  }), shallowEqual)
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <h3>播放列表({playList.length})</h3>
        <div className="operator">
          <button>
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <button>
            <i className="sprite_playlist icon remove"></i>
            清除
          </button>
        </div>
      </HeaderLeft>
      <HeaderRight>
        {currentSong.name}
      </HeaderRight>
    </HeaderWrapper>
  )
})
