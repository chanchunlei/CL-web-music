import React, { memo } from 'react';
import {Provider} from 'react-redux'
import store from './store'

import CLMain from './pages/main';


export default memo(function App() {
  return (
    <Provider store={store}>
      <CLMain/>
    </Provider>
  )
})
