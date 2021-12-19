import { ChangeEventHandler, FormEventHandler, useCallback } from "react";
import { useState } from "react";

export type Values = Record<string, string>;
export type Errors = Record<string, string>;

export interface UseFormDeps {
  initialValues?: Values 
}

export const useForm = (deps: UseFormDeps) => {
  const { initialValues = {} } = deps;

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ target }) => {
    const { name, value } = target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }, [setValues]
  );

  const handleValidation = useCallback((
    name: string,
    value: string,
    validate?: (value: string) => string
  ): void => {
    const error = validate ? validate(value) : undefined;

    if (error !== undefined) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: error }))
    }
  }, [setErrors]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
  };

  return {
    values,
    errors,
    onChange: handleChange,
    onValidate: handleValidation,
    onSubmit: handleSubmit
  }
}
