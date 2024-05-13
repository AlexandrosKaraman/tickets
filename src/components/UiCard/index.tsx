import './styles.sass'
import {calcFlyTime} from "../../utils/calcFlyTime";

export interface AirlineRoute {
  arrival: string
  arrival_time: string
  departure: string
  departure_time: string
  duration: number
  layover_airport: string[]
}

export interface AirlineTicket {
  airline: string
  price: number
  formatted_price: string
  route: AirlineRoute[]
}

export interface UiCardProps {
  data: AirlineTicket
}

export const UiCard = (props: UiCardProps) => {

  const {data} = props

  const pluralization = (value: number) => {
    switch (value) {
      case 1:
        return "1 пересадка"
      case 2:
        return "2 пересадки"
      case 3:
        return "3 пересадки"
      case 4:
        return "4 пересадок"
      default:
        return "Без пересадок"
    }
  }

  return (
    <div className="card">
      <div className="card__title">
        <strong className="card__title-sum">{data.formatted_price}</strong>
        <div className="card__title-logo"></div>
      </div>
      {data.route.map((card, index) => (
        <div className="card__content" key={index}>
          <div className="card__content-item">
            <strong>{card.departure} - {card.arrival}</strong>
            <strong>{card.arrival_time} - {card.arrival}</strong>
          </div>
          <div className="card__content-item">
            <strong>В ДОРОЗІ</strong>
            <strong>{calcFlyTime(card.duration).formatted}</strong>
          </div>
          <div className="card__content-item">
            <strong>{pluralization(card.layover_airport.length)}</strong>
            <strong>{card.layover_airport.join(', ')}</strong>
          </div>
        </div>
      ))}
    </div>
  )
}
