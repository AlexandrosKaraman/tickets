import React, {useEffect, useState} from 'react';
import './styles.sass';

export interface UiCheckboxProps {
  uId: string
  label: string
  pushValue: (value: string) => void
  removeValue: (value: string) => void
  value: string
}

export function UiCheckbox(props: UiCheckboxProps) {

  const {label, uId, pushValue, removeValue, value} = props

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked)
  };

  useEffect(() => {
    if (checked) {
      pushValue(value)
    } else {
      removeValue(value)
    }
  }, [checked])

  return (
    <div className="filter">
      <div className="filter__checkbox">
        <label className="filter__checkbox-label">
          <input
            className="filter__checkbox-input"
            id={uId}
            hidden={true}
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <span className="filter__checkbox-custom"></span>
        </label>
      </div>
      <label className="filter__label" htmlFor={uId}>{label}</label>
    </div>
  );
}
