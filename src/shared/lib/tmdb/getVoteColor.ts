export const getVoteColor = (vote?: number) => {
  if (vote == null) return undefined
  if (vote >= 7) return '#4caf50'
  if (vote >= 4) return '#ff9800'
  return '#f44336'
}
