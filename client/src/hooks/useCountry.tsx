import { createContext, useContext, ReactNode } from 'react';
import { COUNTRIES, CountryCode, CountryConfig, isCountryCode } from '../config/countries';

const CountryContext = createContext<CountryConfig>(COUNTRIES.id);

export const CountryProvider = ({
  country,
  children,
}: {
  country: CountryCode;
  children: ReactNode;
}) => (
  <CountryContext.Provider value={COUNTRIES[country]}>{children}</CountryContext.Provider>
);

/** Config of the country whose page is currently rendered. */
export const useCountry = () => useContext(CountryContext);

const COUNTRY_STORAGE_KEY = 'preferredCountry';

export const saveCountryPreference = (country: CountryCode) => {
  try {
    localStorage.setItem(COUNTRY_STORAGE_KEY, country);
  } catch {
    // localStorage unavailable (private mode etc.) — ignore
  }
};

export const getSavedCountry = (): CountryCode | null => {
  try {
    const value = localStorage.getItem(COUNTRY_STORAGE_KEY);
    return isCountryCode(value) ? value : null;
  } catch {
    return null;
  }
};

export type { CountryCode, CountryConfig };
