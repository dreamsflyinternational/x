import { CountryData } from '../types';
import { AMERICAS_COUNTRIES } from './countriesData/americas';
import { EUROPE_COUNTRIES } from './countriesData/europe';
import { MIDDLE_EAST_COUNTRIES } from './countriesData/middleEast';
import { ASIA_COUNTRIES } from './countriesData/asia';
import { OCEANIA_COUNTRIES } from './countriesData/oceania';
import { AFRICA_COUNTRIES } from './countriesData/africa';

export const COUNTRIES: CountryData[] = [
  ...AMERICAS_COUNTRIES,
  ...EUROPE_COUNTRIES,
  ...MIDDLE_EAST_COUNTRIES,
  ...ASIA_COUNTRIES,
  ...OCEANIA_COUNTRIES,
  ...AFRICA_COUNTRIES
];
