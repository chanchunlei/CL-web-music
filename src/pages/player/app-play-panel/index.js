import React, { memo } from 'react';

import CLPlayHeader from './c-cpns/play-header';
import CLPlayList from './c-cpns/play-list';
import CLLyricPanel from './c-cpns/lyric-panel';
import { PanelWrapper } from './style';
export default memo(function CLAppPlayPanel() {
  return (
    <PanelWrapper>
      <CLPlayHeader/>
      <div className="main">
        <img className="image" src="https://p4.music.126.net/qeN7o2R3_OTPhghmkctFBQ==/764160591569856.jpg" alt=""/>
        <CLPlayList/>
        <CLLyricPanel/>
      </div>
    </PanelWrapper>
  )
})
