import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

import useLocalStorage from './useLocalStorage'

function useFetch(url) {
  const baseUrl = 'http://conduit.productionready.io/api'
  const [ isLoading, setIsLoading ] = useState(false)
  const [ response, setResponse ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ options, setOptions ] = useState(null)
  const [ token ] = useLocalStorage('token')

  useEffect(() => {
    if (!isLoading) {
      return undefined
    }

    let skipGetResponseAfterDestroy = false

    async function fetchDataFromServer() {
      try {
        const requestOptions = {
          ...options,
          ...{
            headers: {
              authorization: token ? `Token ${token}` : '',
            },
          },
        }
        const res = await axios(`${baseUrl}${url}`, requestOptions)
        if (!skipGetResponseAfterDestroy) {
          setResponse(res.data)
          setIsLoading(false)
        }
      } catch (error) {
        if (!skipGetResponseAfterDestroy) {
          setError(error.response.data)
          setIsLoading(false)
        }
      }
    }

    fetchDataFromServer()

    return () => {
      skipGetResponseAfterDestroy = true
    }
  }, [ isLoading, url, options, token ])

  const doFetch = useCallback((fetchOptions = {}) => {
    setOptions(fetchOptions)
    setIsLoading(true)
  }, [])

  return [
    {
      isLoading,
      response,
      error,
    },
    doFetch,
  ]
}

export default useFetch