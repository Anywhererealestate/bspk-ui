import { COUNTRY_CODE_DATA, SupportedCountryCode } from './countryCodes';

/**
 * Guesses the user's country code based on their locale. If the locale does not match any supported country codes,
 * defaults to 'US'.
 *
 * @returns {SupportedCountryCode} The guessed or default country code.
 */
export const guessUserCountryCode = (): SupportedCountryCode => {
    const guessedCountry = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1];

    if (guessedCountry && COUNTRY_CODE_DATA[guessedCountry as SupportedCountryCode]) {
        return guessedCountry as SupportedCountryCode;
    }

    return 'US';
};
