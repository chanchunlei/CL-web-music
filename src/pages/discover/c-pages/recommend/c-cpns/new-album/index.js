import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getNewAlbumAction } from '../../store/actionCreators';

import { Carousel } from 'antd';
import CLThemeHeaderRCM from '@/components/theme-header-rcm';
import CLAlbumCover from '@/components/album-cover'
import {
  NewAlbumWrapper
} from './style';

export default memo(function CLNewAlbum() {

  //state 
  const { newAlbumList } = useSelector(state => ({
    newAlbumList: state.getIn(["recommend","newAlbumList"])
  }), shallowEqual);
  const dispatch = useDispatch();

  //other hooks
  const pageRef = useRef();
  useEffect(()=> {
    dispatch(getNewAlbumAction())
  }, [dispatch])

  return (
    <NewAlbumWrapper>
      <CLThemeHeaderRCM title={"新碟上架"}/>
      <div className="content">
        <button className="arrow arrow-left sprite_02"
                onClick={e => pageRef.current.prev()}></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {
              [0,1].map(item => {
                return (
                  <div key={item} className="page">
                    {
                      newAlbumList.slice(item*5, (item+1) * 5).map((iten, index) => {
                        return <CLAlbumCover key={iten.id} info={iten} size={100} width={118} bgp="-570px"/>
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02"
                onClick={e => pageRef.current.next()}></button>
      </div>
    </NewAlbumWrapper>
  )
})
