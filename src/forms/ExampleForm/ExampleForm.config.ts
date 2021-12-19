import { GetMask } from "components/SimpleForm/hooks/useFormWithMaskedValues";
import { getEmailMasked, getNameMasked, getPhoneMasked } from "utils/helpers";

const SHOULD_NOT_EMPTY = 'заполните поле';
const NOT_EMAIL = 'некорректный email';
const INCORRECT_PHONE = 'некорректный номер теефона';

interface Validation {
  [key: string]: (value: string) => string
}

export const validation: Validation = {
  name: value => {
    return !value ? SHOULD_NOT_EMPTY : ''
  },

  phone: value => {
    if (!value) {
      return SHOULD_NOT_EMPTY
    }

    if (value.length < 17) {
      return INCORRECT_PHONE
    }

    return ''
  },

  email: value => {

    if (!value) {
      return SHOULD_NOT_EMPTY
    }

    if (!(/\S+@\S+\.\S+/).test(value)) {
      return NOT_EMAIL
    }

    return ''
  },
  
  date: value => {
    const minDate = new Date('01.01.2010');
    const maxDate = new Date();

    if (!value) {
      return SHOULD_NOT_EMPTY
    }

    if (new Date(value) < minDate) {
      return 'слишком ранняя дата'
    }

    if (new Date(value) > maxDate) {
      return 'эта дата ещё не настала'
    }

    return ''
  },
};

export const masks: Record<string, GetMask> = {
  name: getNameMasked,
  phone: getPhoneMasked,
  email: getEmailMasked,
}

export const DEFAULT_VALUES = {
  name: '',
  phone: '',
  email: '',
  date: '',
};
