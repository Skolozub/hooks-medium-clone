import BackendErrorMessages from 'components/backend-error-messages'
import React, { useEffect, useState } from 'react'

function ArticleFrom({ onSubmit, errors, initialValues }) {
  const [ title, setTitle ] = useState('')
  const [ body, setBody ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ tagList, setTagList ] = useState([])

  useEffect(() => {
    if (!initialValues) {
      return undefined
    }

    setTitle(initialValues.title)
    setBody(initialValues.body)
    setDescription(initialValues.description)
    setTagList(initialValues.tagList)
  }, [ initialValues ])

  const handleSubmit = event => {
    event.preventDefault()
    const article = { title, body, description, tagList }
    onSubmit(article)
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendErrors={ errors } />}
            <form onSubmit={ handleSubmit }>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Article title"
                    type="text"
                    value={ title }
                    onChange={ event => setTitle(event.target.value) }
                  />
                </fieldset>
              </fieldset>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="What is this article about?"
                    type="text"
                    value={ description }
                    onChange={ event => setDescription(event.target.value) }
                  />
                </fieldset>
              </fieldset>
              <fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Write your article (in markdown)"
                    rows="8"
                    value={ body }
                    onChange={ event => setBody(event.target.value) }
                  />
                </fieldset>
              </fieldset>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Enter tags"
                    type="text"
                    value={ tagList.join(' ') }
                    onChange={ event => setTagList(event.target.value.split(' ')) }
                  />
                </fieldset>
              </fieldset>
              <fieldset>
                <fieldset className="form-group">
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleFrom