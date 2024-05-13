import './styles.sass'
import {PropsWithChildren} from "react";

export interface UiButtonProps {
  disabled?: boolean
}

export const UiButton = (props: PropsWithChildren<UiButtonProps>) => {
  const {children, disabled = false} = props
  return (
    <button disabled={disabled} className="btn">{children}</button>
  )
}
