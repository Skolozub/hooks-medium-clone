import BackendErrorMessages from 'components/backend-error-messages'
import { CurrentUserContext } from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import useLocalStorage from 'hooks/useLocalStorage'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

function Settings() {
  const [ currentUserState, dispatch ] = useContext(CurrentUserContext)
  const apiUrl = '/user'
  const [ { response, error }, doFetch ] = useFetch(apiUrl)
  const [ , setToken ] = useLocalStorage('token')

  const [ image, setImage ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ bio, setBio ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ isSuccessfullLogout, setIsSuccessfullLogout ] = useState(false)

  useEffect(() => {
    const { currentUser } = currentUserState

    if (!currentUser) {
      return undefined
    }
    setImage(currentUser.image || '')
    setUsername(currentUser.username || '')
    setBio(currentUser.bio || '')
    setEmail(currentUser.email || '')

  }, [ currentUserState ])

  function handleSubmit(event) {
    event.preventDefault()

    const user = {
      ...currentUserState.currentUser,
      image,
      username,
      bio,
      email,
      ...password ? { password } : {},
    }

    doFetch({
      method: 'put',
      data  : {
        user,
      },
    })
  }

  useEffect(()=> {
    if (!response) {
      return undefined
    }

    dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
  }, [ response, dispatch ])

  function logout(event) {
    event.preventDefault()

    setToken('')
    dispatch({ type: 'LOGOUT' })
    setIsSuccessfullLogout(true)
  }

  if (isSuccessfullLogout) {
    return <Redirect to="/" />
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              Your settings
            </h1>
            {error && <BackendErrorMessages backendErrors={ error.errors } />}
            <form onSubmit={ handleSubmit }>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    type="text"
                    value={ image }
                    onChange={ event => setImage(event.target.value) }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Username"
                    type="text"
                    value={ username }
                    onChange={ event => setUsername(event.target.value) }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Short biography"
                    rows="8"
                    value={ bio }
                    onChange={ event => setBio(event.target.value) }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Email"
                    type="text"
                    value={ email }
                    onChange={ event => setEmail(event.target.value) }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Password"
                    type="password"
                    value={ password }
                    onChange={ event => setPassword(event.target.value) }
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={ logout }
            >
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings