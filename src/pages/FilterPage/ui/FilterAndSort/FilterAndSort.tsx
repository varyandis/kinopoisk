import type { MovieGenres } from '@/shared/api/tmdb/types'
import { Button, Select, Slider } from 'antd'
import { useEffect, useState } from 'react'
import s from './FilterAndSort.module.css'

type Props = {
  setSort: (value: string) => void
  options: { label: string; value: string }[]
  value: string
  genres: MovieGenres[]
  setGenres: (genres: number[]) => void
  selectedGenres: number[]
  min: number
  max: number
  setRange: (min: number, max: number) => void
  resetFilters: () => void
}

export const FilterAndSort = ({
  setSort,
  options,
  value,
  genres,
  setGenres,
  selectedGenres,
  min,
  max,
  setRange,
  resetFilters,
}: Props) => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([min, max])

  useEffect(() => {
    setRangeValue([min, max])
  }, [min, max])

  useEffect(() => {
    const [nextMin, nextMax] = rangeValue

    if (nextMin === min && nextMax === max) return

    const timerId = window.setTimeout(() => {
      setRange(nextMin, nextMax)
    }, 200)

    return () => window.clearTimeout(timerId)
  }, [rangeValue, min, max, setRange])

  return (
    <div className={s.container}>
      <div className={s.sort}>
        <span className={s.pageTitle}>Filter and Sort</span>

        <div className={s.field}>
          <p className={s.sectionTitle}>Sort by:</p>
          <Select value={value} onChange={setSort} options={options} className={s.select} />
        </div>
      </div>

      <div className={s.genres}>
        <p className={s.sectionTitle}>Genres</p>

        <div className={s.genresList}>
          {genres.map((genre) => (
            <Button
              key={genre.id}
              className={s.genreBtn}
              onClick={() =>
                setGenres(
                  selectedGenres.includes(genre.id)
                    ? selectedGenres.filter((id) => id !== genre.id)
                    : [...selectedGenres, genre.id],
                )
              }
              type={selectedGenres.includes(genre.id) ? 'primary' : 'default'}
            >
              {genre.name}
            </Button>
          ))}
        </div>

        <div className={s.slider}>
          <div className={s.sliderValues}>
            <p className={s.sectionTitle}>Rating</p>
            <p className={s.valueText}>{`${rangeValue[0].toFixed(1)} - ${rangeValue[1].toFixed(
              1,
            )}`}</p>
          </div>

          <Slider
            className={s.sliderControl}
            range
            step={0.1}
            min={0}
            max={10}
            value={rangeValue}
            onChange={(val) => {
              if (Array.isArray(val)) {
                setRangeValue([val[0], val[1]])
              }
            }}
          />
        </div>

        <Button type="primary" onClick={resetFilters} className={s.resetBtn} block>
          Reset filters
        </Button>
      </div>
    </div>
  )
}
