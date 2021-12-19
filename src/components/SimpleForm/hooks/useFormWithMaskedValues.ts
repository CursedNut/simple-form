import { useForm } from './useForm';

type UseFormDeps = Parameters<typeof useForm>[0]
type GetMask = (value: string) => ({
  value: string,
  error: string
})

export const useFormWithMaskedValues = (
  deps: UseFormDeps, 
  masks: Record<string, GetMask>
  ): ReturnType<typeof useForm> => {
  const { values, errors, ...restProps } = useForm(deps);

  const maskedValues = Object.entries(values).reduce((result, [name, value]) => {
    const maskedValue = masks[name] ? masks[name](value).value : undefined;

    return { ...result, [name]: maskedValue || value }
  }, {});

  const maskedErrors = Object.entries(values).reduce((result, [name, value]) => {
    const maskedError = masks[name] ? masks[name](value).error : undefined;

    return { ...result, [name]: maskedError || errors[name] }
  }, {});

  return {
    values: maskedValues,
    errors: maskedErrors,
    ...restProps
  }
}
