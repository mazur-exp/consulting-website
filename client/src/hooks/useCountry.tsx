import { createContext, useContext, ReactNode } from 'react';

export type Country = 'id' | 'th';

const CountryContext = createContext<Country>('id');

export const CountryProvider = ({ country, children }: { country: Country; children: ReactNode }) => (
  <CountryContext.Provider value={country}>{children}</CountryContext.Provider>
);

export const useCountry = () => useContext(CountryContext);

const COUNTRY_STORAGE_KEY = 'preferredCountry';

export const saveCountryPreference = (country: Country) => {
  try {
    localStorage.setItem(COUNTRY_STORAGE_KEY, country);
  } catch {
    // localStorage unavailable (private mode etc.) — ignore
  }
};

export const getSavedCountry = (): Country | null => {
  try {
    const value = localStorage.getItem(COUNTRY_STORAGE_KEY);
    return value === 'id' || value === 'th' ? value : null;
  } catch {
    return null;
  }
};
