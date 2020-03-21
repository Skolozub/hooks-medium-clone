import { useContext, useEffect } from 'react'

import { CurrentUserContext } from '../../contexts/currentUser'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'

function CurrentUserChecker({ children }) {
  const [ { response }, doFetch ] = useFetch('/user')
  const [ currentUserState, dispatch ] = useContext(CurrentUserContext)
  const [ token ] = useLocalStorage('token')

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'SET_UNAUTHORIZED' })
      return undefined
    }

    doFetch()
    dispatch({ type: 'LOADING' })
  }, [ token, dispatch, doFetch ])

  useEffect(() => {
    if (!response) {
      return undefined
    }

    dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
  }, [ response, dispatch ])

  return currentUserState ? children : null
}

export default CurrentUserChecker