import type { FormEventHandler } from "react";

import { SimpleForm, useFormWithMaskedValues } from 'components/SimpleForm';
import { Field } from "components/Field";

import { DEFAULT_VALUES, validation, masks } from "./ExampleForm.config";

const ExampleForm = () => {
  const {
    values,
    errors,
    onChange,
    onValidate,
    onSubmit
  } = useFormWithMaskedValues({ initialValues: DEFAULT_VALUES }, masks);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    onSubmit(e);

    Object.entries(values).forEach(([name, value]) => {
      const validate = validation[name];

      onValidate(name, value, validate)
    })
  };

  return (
    <SimpleForm onSubmit={handleSubmit}>
      <Field
        label="Имя"
        id="name"
        name="name"
        value={values.name}
        onChange={onChange}
        error={errors.name}
      />

      <Field
        label="Телефон"
        id="phone"
        name="phone"
        value={values.phone}
        onChange={onChange}
        error={errors.phone}
      />

      <Field
        label="Email"
        id="email"
        name="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
      />

      <Field
        label="Дата"
        id="date"
        name="date"
        type="date"
        value={values.date}
        onChange={onChange}
        error={errors.date}
      />

      <button type="submit">Отправить</button>
    </SimpleForm>
  )
}

export default ExampleForm;
