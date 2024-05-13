import "./styles.sass"

export interface UiLoaderProps {
  text?: string
}

export const UiLoader = (props: UiLoaderProps) => {
  const {text = "Loading..."} = props
  return (
    <div className="loader">
      <div className="loader__icon"></div>
      <strong className="loader__title">{text}</strong>
    </div>
  )
}
