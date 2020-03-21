import ArticleFrom from 'components/article-form'
import { CurrentUserContext } from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

function CreateArticle() {
  const [ currentUserState ] = useContext(CurrentUserContext)
  const apiUrl = '/articles'
  const [ { response, error }, doFetch ] = useFetch(apiUrl)
  const initialValues = {
    title      : '',
    description: '',
    body       : '',
    tagList    : [],
  }
  const handleSubmit = article => {
    doFetch({
      method: 'post',
      data  : {
        article,
      },
    })
  }

  const [ isSuccessfullSubmit, setIsSuccessfullSubmit ] = useState(false)
  useEffect(()=>{
    if (!response) {
      return undefined
    }

    setIsSuccessfullSubmit(true)
  }, [ response ])

  if (!currentUserState.isLoggedIn) {
    return (
      <Redirect to='/' />
    )
  }

  if (isSuccessfullSubmit) {
    return (
      <Redirect to={ `/articles/${response.article.slug}` } />
    )
  }

  return (
    <div>
      <ArticleFrom
        errors={ (error && error.errors) || {} }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
      />
    </div>
  )
}

export default CreateArticle