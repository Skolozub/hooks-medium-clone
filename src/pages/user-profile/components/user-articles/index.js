import ErrorMessage from 'components/error-message'
import Feed from 'components/feed'
import Loading from 'components/loading'
import Pagination from 'components/pagination'
import useFetch from 'hooks/useFetch'
import { stringify } from 'query-string'
import React, { useEffect } from 'react'
import { getPaginator, limit } from 'utils'

function getApiUrl({ username, offset, isFavorites }) {
  const params = isFavorites
    ? { limit, offset, favorired: username }
    : { limit, offset, author: username }

  return `/articles?${stringify(params)}`
}

function UserArticles({ username, location, isFavorites, url }) {
  const { offset, currentPage } = getPaginator(location.search)
  const apiUrl = getApiUrl({ username, offset, isFavorites })
  const [ { response, isLoading, error }, doFetch ] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [ doFetch, isFavorites, currentPage ])

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={ response.articles } />
          <Pagination
            currentPage={ currentPage }
            limit={ limit }
            total={ response.articlesCount }
            url={ url }
          />
        </>
      )}
    </div>
  )
}

export default UserArticles