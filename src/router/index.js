import React from 'react';

import CLDiscover from '@/pages/discover';
import CLRecommend from '@/pages/discover/c-pages/recommend'
import CLRanking from '@/pages/discover/c-pages/ranking'
import CLSongs from '@/pages/discover/c-pages/songs'
import CLDjradio from '@/pages/discover/c-pages/djradio'
import CLArtist from '@/pages/discover/c-pages/artist'
import CLAlbum from '@/pages/discover/c-pages/album'


import CLFriend from '@/pages/friend';
import CLMine from '@/pages/mine';

import { Redirect } from 'react-router-dom'

const routes = [
  {
    path: "/",
    exact: true, 
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path: "/discover",
    component: CLDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend"/>
        )
      },
      {
        path: "/discover/recommend",
        component: CLRecommend
      },
      {
        path: "/discover/ranking",
        component: CLRanking
      },
      {
        path: "/discover/songs",
        component: CLSongs
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: CLDjradio
      },
      {
        path: "/discover/artist",
        component: CLArtist
      },
      {
        path: "/discover/album",
        component: CLAlbum
      }
    ]
  },
  {
    path: "/mine",
    component: CLMine
  }, 
  {
    path: "/friend",
    component: CLFriend
  }
];
export default routes;