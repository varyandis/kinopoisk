import { SearchForm } from '@/features/search/ui/SearchForm/SearchForm'
import { useSearchMoviesQuery } from '@/shared/api/tmdb/tmdbApi'
import { Results } from '@/widgets/Results'
import { Pagination } from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import s from './SearchPage.module.css'

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const [inputValue, setInputValue] = useState('')
  const queryFromUrl = searchParams.get('query') ?? ''
  const rawPage = Number(searchParams.get('page') ?? '1')
  const pageFromUrl = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1
  const PAGES_SIZE = 20

  const { data, isLoading, error } = useSearchMoviesQuery(
    { query: queryFromUrl, page: pageFromUrl },
    { skip: !queryFromUrl.trim() },
  )

  const hasQuery = queryFromUrl.trim().length > 0
  const totalResults = data?.total_results ?? 0
  const hasResults = totalResults > 0

  useEffect(() => setInputValue(queryFromUrl), [queryFromUrl])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = inputValue.trim()
    if (!q) return
    setSearchParams({ query: q, page: '1' })
  }

  const resetSearch = () => {
    setSearchParams({})

  }

  return (
    <div className={s.container}>
      <Title level={3}>Search results</Title>
      <SearchForm
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onClear={resetSearch}
      />
      {!hasQuery ? (
        <div className={s.title}>Enter a movie title to start searching</div>
      ) : (
        <div className={s.results}>
          <Results
            movies={data?.results}
            isLoading={isLoading}
            error={error}
            title={`Search results for "${queryFromUrl}"`}
          />
          <div>
            {hasQuery &&
              !isLoading &&
              totalResults === 0 &&
              `No matches found for "${queryFromUrl}".`}
          </div>
          {hasQuery && hasResults && (
            <Pagination
              showQuickJumper
              current={pageFromUrl}
              total={data?.total_results ?? 0}
              pageSize={PAGES_SIZE}
              align="center"
              className={s.pagination}
              showSizeChanger={false}
              onChange={(pageNumber) =>
                setSearchParams({ query: queryFromUrl, page: String(pageNumber) })
              }
            />
          )}
        </div>
      )}
    </div>
  )
}
