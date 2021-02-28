import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual} from 'react-redux';

import { getSongDetailAction } from '../store/actionCreators';

import { NavLink } from 'react-router-dom';
import { Slider } from 'antd';
import CLAppPlayPanel from '../app-play-panel';

import { getPlayUrl, formatMinuteSecond } from '@/utils/format-utils';
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';

export default memo(function CLAppPlayBar() {
  const [isPlaying, setIsPlaying] = useState(false);  //是否在播放
  const [currentTime, setCurrentTime] = useState(0); //当前播放显示时间
  const [duration, setDuration] = useState(0);      //歌曲时长
  const [progress, setProgress] = useState(0);      //进度条
  const [isChanging, setIsChanging] = useState(false); //优化拖动
  
  const [showPanel, setShowPanel] = useState(false);


  const { currentSong } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"])
  }), shallowEqual);
  const dispatch = useDispatch();
  
  const audioRef = useRef();
  useEffect(() => {
    dispatch(getSongDetailAction(167876));
  }, [dispatch]);

  useEffect(() => { //currentSong改变
    // console.log(currentSong)
    audioRef.current.src = getPlayUrl(currentSong.id);
    audioRef.current.play().then(res => {
      setIsPlaying(true);
    }).catch(e => {
      setIsPlaying(false);
    })
    setDuration(currentSong.dt); //歌曲总时长
  }, [currentSong]);
  //
  const play = useCallback(() => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(err => {
      setIsPlaying(false);
    });
  }, [isPlaying]);

  const timeUpdate = (e) => { //歌曲时间改变
    const currentTime = e.target.currentTime;
    if (!isChanging) {  //判断是否在拖动中，优化跟手
      setCurrentTime(currentTime); //显示播放时间
      setProgress((currentTime * 1000) / duration * 100);
    }
    console.log(currentTime);
    
  }

  const sliderChange= useCallback((value) => { //更新播放时间
    setProgress(value);
    const time = value / 100.0 * duration / 1000;
    setCurrentTime(time); //播放显示时间
    setIsChanging(true);  //拖动中如果timeUpdate在运行，就会出现不跟手
   
  },[duration])

  const sliderAfterChange = useCallback((value) => { //播放时间定位到滑动的位置
      const time = value / 100.0 * duration / 1000;
      audioRef.current.currentTime = time; //播放时间设置
      setCurrentTime(time);
      !isPlaying && play();   //拖动结束自动进行播放
      setIsChanging(false);  //变化结束
    },[duration, isPlaying, play])

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar btn prev" ></button>
          <button className="sprite_playbar btn play" onClick={e=> play()}></button>
          <button className="sprite_playbar btn next"></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src="https://p2.music.126.net/OVkXDNmbk2uj6wE1KTZIwQ==/109951165203334337.jpg?param=34y34" alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong.ar && currentSong.ar[0].name}</span>
            </div>
            <div className="progress">
              <Slider value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{formatMinuteSecond(currentTime * 1000)}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatMinuteSecond(duration)}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button className="sprite_playbar btn playlist" onClick={e => setShowPanel(!showPanel)}>
              9
            </button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate}/>
      {showPanel && <CLAppPlayPanel/>}

    </PlaybarWrapper>
  )
})
