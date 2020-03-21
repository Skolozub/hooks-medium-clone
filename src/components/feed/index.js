import TagList from 'components/tag-list'
import React from 'react'
import { Link } from 'react-router-dom'

function Feed({ articles }) {
  return (
    <div>
      {articles.map((article, index) => (
        <div key={ index } className="article-preview">
          <div className="article-meta">
            <Link to={ `/profiles/${article.author.username}` }>
              <img alt="" src={ article.author.image } />
            </Link>
            <div className="info">
              <Link
                className="author"
                to={ `/profiles/${article.author.username}` }
              >
                {article.author.username}
              </Link>
              <span className="date">
                {article.createdAt}
              </span>
            </div>
          </div>
          <Link className="preview-link" to={ `/articles/${article.slug}` }>
            <h1>
              {article.title}
            </h1>
            <p>
              {article.description}
            </p>
            <span>
              Read more...
            </span>
            <TagList tags={ article.tagList } />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Feed