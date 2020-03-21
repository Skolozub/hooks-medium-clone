import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { range } from 'utils'

function PaginationItem({ page, currentPage, url }) {
  return (
    <li className={ cn('page-item', { active: page === currentPage }) }>
      <Link className="page-link" to={ `${url}?page=${page}` }>
        {page}
      </Link>
    </li>
  )
}

function Pagination({ total, limit, url, currentPage }) {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount)
  return (
    <ul className="pagination">
      {pages.map(page => (
        <PaginationItem
          key={ page }
          currentPage={ currentPage }
          page={ page }
          url={ url }
        />
      ))}
    </ul>
  )
}

export default Pagination