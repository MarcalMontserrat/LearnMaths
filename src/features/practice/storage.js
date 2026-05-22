export const readStoredNumber = (key) => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const storedValue = window.localStorage.getItem(key);
  const parsedValue = Number.parseInt(storedValue ?? '0', 10);

  return Number.isNaN(parsedValue) ? 0 : parsedValue;
};

export const writeStoredNumber = (key, value) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, String(value));
};

export const readStoredFlag = (key) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(key);
};

export const writeStoredFlag = (key, value) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, value);
};
