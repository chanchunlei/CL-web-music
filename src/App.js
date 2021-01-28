import React, { memo } from 'react';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux'
import routes from './router';
import store from './store'

import {HashRouter} from 'react-router-dom';

import CLAppHeader from '@/components/app-header';
import CLAppFooter from '@/components/app-footer';


export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <CLAppHeader/>
        {renderRoutes(routes)}
        <CLAppFooter/>
      </HashRouter>
     
    </Provider>
  )
})
