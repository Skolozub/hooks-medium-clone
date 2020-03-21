import Article from 'pages/article'
import Authentication from 'pages/authentication'
import CreateArticle from 'pages/create-article'
import EditArticle from 'pages/edit-article'
import GlobalFeed from 'pages/global-feed'
import Settings from 'pages/settings'
import TagFeed from 'pages/tag-feed'
import UserProfile from 'pages/user-profile'
import YourFeed from 'pages/your-feed'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

function Routes() {
  return (
    <Switch>
      <Route component={ GlobalFeed } path='/' exact />
      <Route component={ CreateArticle } path='/article/new' />
      <Route component={ UserProfile } path='/profile/:slug' exact />
      <Route path='/profile/:slug/favorites'>
        {props => <UserProfile { ...props } isFavorites />}
      </Route>
      <Route component={ EditArticle } path='/articles/:slug/edit' />
      <Route component={ YourFeed } path='/feed' />
      <Route component={ TagFeed } path='/tags/:slug' />
      <Route component={ Authentication } path='/login' />
      <Route component={ Authentication } path='/register' />
      <Route component={ Settings } path='/settings' />
      <Route component={ Article } path='/articles/:slug' />
    </Switch>
  )
}

export default Routes