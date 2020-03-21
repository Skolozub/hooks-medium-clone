import ErrorMessage from 'components/error-message'
import Loading from 'components/loading'
import TagList from 'components/tag-list'
import { CurrentUserContext } from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

function Article({ match }) {
  const [ currentUserState ] = useContext(CurrentUserContext)
  const { slug } = match.params
  const apiUrl = `/articles/${slug}`
  const [ fetchData, doFetch ] = useFetch(apiUrl)
  const [ deleteData, doDelete ] = useFetch(apiUrl)
  const [ isSuccessfullDelete, setIsSucceessfullDelete ] = useState(false)

  function isAuthor() {
    if (!fetchData.response || !currentUserState.isLoggedIn) {
      return false
    }

    return fetchData.response.article.author.username === currentUserState.currentUser.username
  }

  function deleteArticle() {
    doDelete({
      method: 'delete',
    })
  }

  useEffect(() => {
    doFetch()
  }, [ doFetch ])

  useEffect(() => {
    if (!deleteData.response) {
      return undefined
    }

    setIsSucceessfullDelete(true)
  }, [ deleteData.response ])

  if (isSuccessfullDelete) {
    return <Redirect to='/' />
  }

  return (
    <div className='article-page'>
      <div className="banner">
        {!fetchData.isLoading && fetchData.response && (
          <div className="container">
            <h1>
              {fetchData.response.article.title}
            </h1>
            <div className="article-meta">
              <Link to={ `/profiles/${fetchData.response.article.author.username}` }>
                <img alt="" src={ fetchData.response.article.author.image } />
              </Link>
              <div className="info">
                <Link to={ `/profiles/${fetchData.response.article.author.username}` }>
                  {fetchData.response.article.author.username}
                </Link>
                <span className="date">
                  {fetchData.response.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={ `/articles/${fetchData.response.article.slug}/edit` }
                  >
                    <i className="ion-edit" />
                    &nbsp;
                    Edit article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    type="button"
                    onClick={ deleteArticle }
                  >
                    <i className="ion-trash-a" />
                    &nbsp;
                    Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchData.isLoading && <Loading />}
        {fetchData.error && <ErrorMessage />}
        {!fetchData.isLoading && fetchData.response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>
                  {fetchData.response.article.body}
                </p>
              </div>
              <TagList tags={ fetchData.response.article.tagList } />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article