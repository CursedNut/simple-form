import { useFormWithMaskedValues } from 'components/SimpleForm';
import { getEmailMasked, getNameMasked, getPhoneMasked } from 'utils/helpers';

const SHOULD_NOT_EMPTY = 'заполните поле';
const NOT_EMAIL = 'некорректный email';
const INCORRECT_PHONE = 'некорректный номер телефона';
const TOO_EARLY = 'введите дату не ранее 01.01.2010';
const TOO_LATE = 'введите дату не позднее сегодня';

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
      return TOO_EARLY
    }

    if (new Date(value) > maxDate) {
      return TOO_LATE
    }

    return ''
  },
};

type Masks = Parameters<(typeof useFormWithMaskedValues)>[1];

export const masks: Masks = {
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
