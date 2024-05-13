export interface CalcFlyTime {
  hours: number
  minutes: number
  formatted: string
}

export function calcFlyTime(duration: number): CalcFlyTime {
  const minutes = duration % 60
  const hours = (duration - minutes) / 60
  return {
    hours,
    minutes,
    formatted: `${hours} г, ${minutes} хв`
  }
}
