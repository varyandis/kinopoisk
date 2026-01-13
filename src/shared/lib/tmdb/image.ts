import posterPlaceholder from '@/shared/assets/images/poster-placeholder.jpg'

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL
const PLACEHOLDER_IMAGE = posterPlaceholder

export const getTmdbImageUrl = (
  path: string | null,
  size: 'w200' | 'w300' | 'w500' | 'original' = 'w500',
): string => {
  if (!path) {
    return PLACEHOLDER_IMAGE
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
