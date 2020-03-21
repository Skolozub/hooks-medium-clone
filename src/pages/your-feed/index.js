import ErrorMessage from 'components/error-message'
import Feed from 'components/feed'
import FeedToggler from 'components/feed-toggler'
import Loading from 'components/loading'
import Pagination from 'components/pagination'
import PopularTags from 'components/popular-tags'
import useFetch from 'hooks/useFetch'
import { stringify } from 'query-string'
import React, { useEffect } from 'react'
import { getPaginator, limit } from 'utils'

function YourFeed({ location, match }) {
  const { offset, currentPage } = getPaginator(location.search)
  const stringifiedParams = stringify({
    offset,
    limit,
  })
  const apiUrl = `/articles/feed?${stringifiedParams}`
  const [ { response, isLoading, error }, doFetch ] = useFetch(apiUrl)
  const { url } = match

  useEffect(() => {
    doFetch()
  }, [ doFetch, currentPage ])

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>
            Medium clone
          </h1>
          <p>
            A place to share knowledge
          </p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
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
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourFeed