import { LayoutMain } from '@/app/layouts'
import {
  CategoryPage,
  FavoritesPage,
  FilterPage,
  MainPage,
  MovieDetailsPage,
  NotFoundPage,
  SearchPage,
} from '@/pages'
import { Navigate, Route, Routes } from 'react-router'

export enum ROUTES {
  MAIN = '/',
  CATEGORIES = '/categories',
  CATEGORY = '/categories/:category',
  DEFAULT_CATEGORY = '/categories/popular',
  FILTERED = '/filtered',
  SEARCH = '/search',
  FAVORITES = '/favorites',
  MOVIES = '/movies',
  MOVIE = '/movies/:id',
  NOT_FOUND = '*',
}

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<LayoutMain />}>
        <Route index element={<MainPage />} />
        <Route
          path={ROUTES.CATEGORIES}
          element={<Navigate to={ROUTES.DEFAULT_CATEGORY} replace />}
        />
        <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
        <Route path={ROUTES.FILTERED} element={<FilterPage />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.MOVIES} element={<Navigate to={ROUTES.MAIN} replace />} />
        <Route path={ROUTES.MOVIE} element={<MovieDetailsPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
