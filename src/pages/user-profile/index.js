import useFetch from 'hooks/useFetch'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import UserArticles from './components/user-articles'

function UserProfile({ match, location, isFavorites, ...props }) {
  const { slug } = match.params
  const apiUrl = `/profiles/${slug}`
  const [ { response }, doFetch ] = useFetch(apiUrl)

  useEffect(()=> {
    doFetch()
  }, [ doFetch ])

  if (!response) {
    return null
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img alt="" className="user-img" src={ response.profile.image } />
              <h4>
                {response.profile.username}
              </h4>
              <p>
                {response.profile.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-FeedToggler">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={ `/profile/${response.profile.username}` }
                    exact
                  >
                    My posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={ `/profile/${response.profile.username}/favorites` }
                  >
                    Favorites posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              isFavorites={ isFavorites }
              location={ location }
              url={ match.url }
              username={ response.profile.username }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile