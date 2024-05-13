import './App.sass';
import {UiSegments} from "./components/UiButtons";
import {AirlineTicket, UiCard} from "./components/UiCard";
import {UiLoader} from "./components/UiLoader";
import {UiCheckbox} from "./components/UiCheckbox";
import {getAllTickets} from "./entities/api";
import {useEffect, useState} from "react";
import {layoverFilterData} from "./data/layoverFilterData";
import {DataSort, segments} from "./data/segmentData";

function App() {
  const [layoverFilter, setLayoverFilter] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AirlineTicket[]>([])
  const [segment, setSegment] = useState(segments[0].value)

  const getFilteredData = () => {
    if (layoverFilter.length === 0 || layoverFilter.includes('all')) return data
    return data.filter((ticket) => {
      const layovers = ticket.route.map(({layover_airport}) => String(layover_airport.length))
      for (let i = 0; i < layovers.length; i++) {
        if (!layoverFilter.includes(layovers[i])) {
          return false
        }
      }
      return true
    })
  }

  const pushValue = (value: string) => {
    setLayoverFilter([...layoverFilter, value])
  }

  const removeValue = (value: string) => {
    setLayoverFilter(layoverFilter.filter((_value) => _value !== value))
  }

  const sortedByOptimal = () => {
    return getFilteredData().sort((a, b) => {
      const durationA = a.route.reduce((acc, item) => acc + item.duration, 0)
      const durationB = b.route.reduce((acc, item) => acc + item.duration, 0)
      return (a.price / durationA) - (b.price / durationB)
    })
  }

  const sortedByMinDuration = () => {
    return getFilteredData().sort((a, b) => {
      const durationA = a.route.reduce((acc, item) => acc + item.duration, 0)
      const durationB = b.route.reduce((acc, item) => acc + item.duration, 0)
      return durationA - durationB
    })
  }

  const sortedByPrice = () => {
    return getFilteredData().sort((a, b) => a.price - b.price)
  }

  const getSortedData = () => {
    switch (segment) {
      case DataSort.LOW_PRICE:
        return sortedByPrice()
      case DataSort.OPTIMAL:
        return sortedByOptimal()
      case DataSort.FASTEST:
        return sortedByMinDuration()
      default:
        return data
    }
  }

  const fetchData = async () => {
    setLoading(true)
    const req = await getAllTickets<{ tickets: AirlineTicket[] }>()
    if (req?.tickets) setData(req.tickets)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="app">
      <img className="app__logo" alt="logo" src="/images/Logo.svg" onClick={() => window.location.reload()}></img>
      <div className="app__layout">
        <div className="app__layout-filters">
          <strong className="app__layout-filters-title">КІЛЬКІСТЬ ПЕРЕСАДОК</strong>
          {layoverFilterData.map((layover) => (
            <UiCheckbox label={layover.text} uId={layover.id} value={layover.value} removeValue={removeValue} pushValue={pushValue}/>
            ))
          }
        </div>
        <div className="app__layout-main">
          <UiSegments segments={segments} setSelected={setSegment} selected={segment}/>
          {loading ? <UiLoader/>
            :
            <div>
              {data.length === 0 ? 'no data'
                : getSortedData().map((card, index) => <UiCard data={card} key={index}/>)
              }
              {/*<UiButton>Показати ще 5 квитків</UiButton>*/}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
