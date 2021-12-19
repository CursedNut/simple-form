import { ChangeEventHandler, FunctionComponent } from "react";

import './Field.css';

interface FieldProps {
  id: string,
  name: string,
  type?: HTMLInputElement['type'],
  value: HTMLInputElement['value'],
  onChange: ChangeEventHandler,
  label: string | JSX.Element,
  error: string,
}

const Field: FunctionComponent<FieldProps> = props => {
  const {
    id,
    name,
    type = 'text',
    value,
    onChange,
    label,
    error,
  } = props;

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <input
        className="field__input"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      <div className="field__error">{error}</div>
    </div>
  )
}

export default Field;
