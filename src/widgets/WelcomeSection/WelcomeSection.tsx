import { SearchForm } from '@/features/search/ui/SearchForm/SearchForm'
import { useGetMoviesQuery } from '@/shared/api/tmdb/tmdbApi'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import s from './WelcomeSection.module.css'
import { getTmdbImageUrl } from '@/shared/lib/tmdb/image'

export const WelcomeSection = () => {
  const { data } = useGetMoviesQuery({ category: 'popular', page: 1 })
  const [inputValue, setInputValue] = useState('')
  const [bgImage, setBgImage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const results = data?.results ?? []
    const withBackdrop = results.filter((m) => m.backdrop_path)
    if (withBackdrop.length === 0) return

    const randomMovie = withBackdrop[Math.floor(Math.random() * withBackdrop.length)]
    setBgImage(randomMovie.backdrop_path!)
  }, [data?.results])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const q = inputValue.trim()
    if (!q) return

    navigate(`/search?query=${encodeURIComponent(q)}&page=1`)
    setInputValue('')
  }

  const bgUrl = getTmdbImageUrl(bgImage, 'original')

  return (
    <section
      className={s.welcome}
      style={bgImage ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      <div className={s.overlay}>
        <div className={s.container}>
          <SearchForm
            inputValue={inputValue}
            setInputValue={setInputValue}
            onClear={() => setInputValue('')}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  )
}
