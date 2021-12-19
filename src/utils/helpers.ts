const CYRILLIC_ONLY = 'только кириллица';
const LATIN_AND_SYMBOLS_ONLY = 'только латиница и спецсимволы';

export const getPhoneMasked = (value: string) => {
  const mask = '+7(___) ___-__-__';

  const def = mask.replace(/\D/g, "");
  const val = value.replace(/\D/g, "");

  let i = 0;

  let newValue = mask.replace(
    /[_\d]/g,
    (a) => {
      if (i > val.length - 1) {
        return a
      }

      if (val.charAt(i) && i !== 0 && (i !== 1 || /[^127]/.test(val.charAt(1)))) {
        return val.charAt(i++)
      }

      return def.charAt(i++)
    }
  );

  i = newValue.indexOf("_");

  if (i !== -1) {
    newValue = newValue.slice(0, i);
  }

  let reg: string | RegExp = mask
    .slice(0, value.length)
    .replace(/_+/g, (a) => "\\d{1," + a.length + "}")
    .replace(/[+()]/g, "\\$&");

  reg = new RegExp("^" + reg + "$");

  return {
    value: !reg.test(value) || value.length < 5 ? newValue : value,
    error: ''
  };
};

export const getNameMasked = (value: string, max: number = 50) => {
  let error = '';
  const val = value
    .replace(/[^а-яА-ЯЁё\s-]/g, () => {
      error = CYRILLIC_ONLY;

      return ''
    })
    .slice(0, max);

  return { value: val, error };
};

export const getEmailMasked = (value: string, max: number = 30) => {
  let error = '';
  const val = value
    .replace(/[а-яА-ЯЁё\s]/g,
      () => {
        error = LATIN_AND_SYMBOLS_ONLY;

        return ''
      })
    .slice(0, max);

  return { value: val, error };
}
