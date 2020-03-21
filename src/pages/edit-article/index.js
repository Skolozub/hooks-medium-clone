import ArticleFrom from 'components/article-form/index'
import useFetch from 'hooks/useFetch'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { CurrentUserContext } from '../../contexts/currentUser'

function EditArticle({ match }) {
  const [ currentUserState ] = useContext(CurrentUserContext)
  const { slug } = match.params
  const apiUrl = `/articles/${slug}`
  const [ fetchedData, doFetch ] = useFetch(apiUrl)
  const [ updatedData, doUpdate ] = useFetch(apiUrl)

  const [ initialValues, setInitialValues ] = useState(null)
  const [ isSuccessfullSubmit, setIsSuccessfullSubmit ] = useState(false)

  useEffect(() => {
    doFetch()
  }, [ doFetch ])

  useEffect(() => {
    if (!fetchedData.response) {
      return undefined
    }

    const { title, body, description, tagList } = fetchedData.response.article
    setInitialValues({ title, body, description, tagList })
  }, [ fetchedData.response ])

  useEffect(() => {
    if (!updatedData.response) {
      return undefined
    }

    setIsSuccessfullSubmit(true)
  }, [ updatedData.response ])

  function handleSubmit(article) {
    doUpdate({
      method: 'put',
      data  : {
        article,
      },
    })
  }

  if (isSuccessfullSubmit || !currentUserState.isLoggedIn) {
    return <Redirect to={ `/articles/${slug}` } />
  }

  return (
    <ArticleFrom
      errors={ (updatedData.error && updatedData.error) || {} }
      initialValues={ initialValues }
      onSubmit={ handleSubmit }
    />
  )
}

export default EditArticle