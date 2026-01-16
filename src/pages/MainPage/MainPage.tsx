import { MoviesSections } from '@/widgets/MoviesSections/MoviesSections'
import { WelcomeSection } from '@/widgets/WelcomeSection/WelcomeSection'
import s from './MainPage.module.css'

export const MainPage = () => {
  

  return (
    <>
      <WelcomeSection />
      <div className={s.section}>
        <MoviesSections category="popular" title="Popular Movies" buttonLabel="See All" />
        <MoviesSections category="top_rated" title="Top Rated Movies" buttonLabel="See All" />
        <MoviesSections category="upcoming" title="Upcoming Movies" buttonLabel="See All" />
        <MoviesSections category="now_playing" title="Now Playing Movies" buttonLabel="See All" />
      </div>
    </>
  )
}
