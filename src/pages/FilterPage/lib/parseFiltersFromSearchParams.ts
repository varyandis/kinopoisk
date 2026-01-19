export const parseFiltersFromSearchParams = (searchParams: URLSearchParams) => {
  const pageNum = Number(searchParams.get('page'))
  const minNum = Number(searchParams.get('min'))
  const maxNum = Number(searchParams.get('max'))

  const page = Number.isNaN(pageNum) || pageNum < 1 ? 1 : pageNum
  const min = Number.isNaN(minNum) || minNum < 0 ? 0 : minNum
  const max = !Number.isNaN(maxNum) && maxNum >= min && maxNum <= 10 ? maxNum : 10
  const sort = searchParams.get('sort') ?? 'popularity.desc'
  const genresStr = searchParams.get('genres')
  const genres = genresStr
    ? genresStr
        .split(',')
        .map(Number)
        .filter((n) => Number.isFinite(n) && n > 0)
    : []

  const filterParams = {
    page,
    sort,
    min,
    max,
    genres,
  }

  return filterParams
}
