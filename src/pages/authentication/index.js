import BackendErrorMessages from 'components/backend-error-messages'
import { CurrentUserContext } from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import useLocalStorage from 'hooks/useLocalStorage'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

function Authentication(props) {
  const isLogin = props.match.path === '/login'
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
  const [ email, setEmail ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isSuccessfullSubmit, setIsSuccessfullSubmit ] = useState(false)
  const [ , setToken ] = useLocalStorage('token')
  const [ , dispatch ] = useContext(CurrentUserContext)

  const apiUrl = isLogin ? '/users/login' : '/users'
  const [ { response, isLoading, error }, doFetch ] = useFetch(apiUrl)

  function handleSubmit(event) {
    event.preventDefault()

    const user = {
      email,
      password,
      ...isLogin ? {} : { username },
    }

    doFetch({
      method: 'post',
      data  : { user },
    })
  }

  useEffect(() => {
    if (!response) {
      return undefined
    }

    setToken(response.user.token)
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
    setIsSuccessfullSubmit(true)
  }, [ response, setToken, dispatch ])

  function getValue(updaterFn) {
    return event => {
      const { value } = event.target
      updaterFn(value)
    }
  }

  if (isSuccessfullSubmit) {
    return <Redirect to='/' />
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              {pageTitle}
            </h1>
            <p className="text-xs-center">
              <Link to={ descriptionLink }>
                {descriptionText}
              </Link>
            </p>
            <form onSubmit={ handleSubmit }>
              {error && (
                <BackendErrorMessages backendErrors={ error.errors } />
              )}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      autoComplete="off"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      type="text"
                      value={ username }
                      onChange={ getValue(setUsername) }
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    autoComplete="off"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    type="email"
                    value={ email }
                    onChange={ getValue(setEmail) }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    autoComplete="off"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    type="password"
                    value={ password }
                    onChange={ getValue(setPassword) }
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  disabled={ isLoading }
                  type="submit"
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication