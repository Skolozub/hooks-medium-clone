import { useEffect, useState } from 'react'

function useLocalStorage(key, initialValue = '') {
  const [ value, setValue ] = useState(() => localStorage.getItem(key) || initialValue)

  useEffect(() => {
    if (!value) {
      return undefined
    }
    localStorage.setItem(key, value)
  }, [ value, key ])

  return [ value, setValue ]
}

export default useLocalStorage