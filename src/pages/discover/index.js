import React, { memo } from 'react';
import { dicoverMenu } from '@/common/local-data.js';
import {NavLink} from 'react-router-dom';
// import request from '@/services/request';
import {
  DiscoverWrapper,
  TopMenu
} from './style';
import { renderRoutes } from 'react-router-config';

export default memo(function CLDiscover(props) {
  // useEffect(() => {
  //   request({
  //     url:"/banner"
  //   }).then(res => {
  //     console.log(res)
  //   })
  // }, [])

  const {route} = props;
  return (
    <DiscoverWrapper>
      <div className="top">
        <TopMenu className="wrap-v1">
          {
            dicoverMenu.map(item => {
              return (
                <div className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          } 
        </TopMenu> 
      </div>
      {renderRoutes(route.routes)}
    </DiscoverWrapper>
  )
})
