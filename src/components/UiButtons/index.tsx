import './styles.sass'

export interface UiSegment {
  value: string
  text: string
}

export interface UiSegmentsProps {
  segments: UiSegment[]
  selected: string
  setSelected: (value: string) => void
}

export const UiSegments = (props: UiSegmentsProps) => {
  const {segments, selected, setSelected} = props

  return (
    <div className="segmented">
      {segments.length === 0
        ? <p>Error: Segments is empty</p>
        : segments.map(({value, text}, index) => (
          <button
            key={index}
            className={`segmented__button ${value === selected ? 'active' : ''}`}
            onClick={() => setSelected(value)}
          >
            {text}
          </button>)
        )
      }
    </div>
  )
}
