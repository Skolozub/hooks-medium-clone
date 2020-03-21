import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { CurrentUserContext } from '../../contexts/currentUser'

function TopBar() {
  const [ currentUserState ] = useContext(CurrentUserContext)

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          {!currentUserState.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
          {currentUserState.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/article/new">
                  <i className='ion-compose' />
                  &nbsp;New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">
                  <i className='ion-gear-a' />
                  &nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={ `/profile/${currentUserState.currentUser.username}` }
                >
                  <img
                    alt=""
                    className="user-pic"
                    src={ currentUserState.currentUser.image }
                  />
                  &nbsp;
                  {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default TopBar