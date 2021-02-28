import React, { memo } from 'react';
import {renderRoutes} from 'react-router-config';
import routes from '@/router';
import {HashRouter} from 'react-router-dom';

import CLAppHeader from '@/components/app-header';
import CLAppFooter from '@/components/app-footer';
import CLAppPlayBar from '@/pages/player/app-player-bar';


export default memo(function CLMin() {
  return (
    <HashRouter>
      <CLAppHeader/>
      {renderRoutes(routes)}
      <CLAppFooter/>
      <CLAppPlayBar/>
    </HashRouter>
  )
})
