import { readStoredFlag, readStoredNumber, writeStoredFlag, writeStoredNumber } from './storage';

const buildLocalStorageMock = () => {
  const store = {};

  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => Object.keys(store).forEach((key) => delete store[key])
  };
};

describe('storage', () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = buildLocalStorageMock();
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
  });

  describe('readStoredNumber', () => {
    it('returns 0 when key is absent', () => {
      expect(readStoredNumber('missing')).toBe(0);
    });

    it('parses a stored integer', () => {
      localStorageMock.setItem('stars', '42');
      expect(readStoredNumber('stars')).toBe(42);
    });

    it('returns 0 for non-numeric stored value', () => {
      localStorageMock.setItem('bad', 'abc');
      expect(readStoredNumber('bad')).toBe(0);
    });
  });

  describe('writeStoredNumber', () => {
    it('persists the number as a string', () => {
      writeStoredNumber('count', 7);
      expect(localStorageMock.getItem('count')).toBe('7');
    });

    it('round-trips through readStoredNumber', () => {
      writeStoredNumber('score', 100);
      expect(readStoredNumber('score')).toBe(100);
    });
  });

  describe('readStoredFlag', () => {
    it('returns null for a missing key', () => {
      expect(readStoredFlag('flag')).toBeNull();
    });

    it('returns the stored string value', () => {
      localStorageMock.setItem('seen', '1');
      expect(readStoredFlag('seen')).toBe('1');
    });
  });

  describe('writeStoredFlag', () => {
    it('stores the value and is readable back', () => {
      writeStoredFlag('guide', '1');
      expect(readStoredFlag('guide')).toBe('1');
    });
  });
});
