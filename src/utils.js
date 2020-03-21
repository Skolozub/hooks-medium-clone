import { parse } from 'query-string'

export const limit = 10

export function range(start, end) {
  return [ ...Array(end).keys() ].map(el => el + start)
}

export function getPaginator(search) {
  const parsedSearch = parse(search)
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
  const offset = currentPage * 10 - limit

  return { currentPage, offset }
}