/**
 * Global test constants
 * Converted and adapted from C# TestConstants
 * Intended for Playwright + TypeScript framework
 */

export const TestConstants = {
  //Default test data
  DEFAULT_FROM: 'New York',
  DEFAULT_TO: 'London',

  //URLs & navigation
  DEFAULT_URL: 'https://testerbud.com/practice-page-selection',
  FLIGHT_BOOKING_URL_PART: '**/flight*',

  //Browser & configuration
  DEFAULT_BROWSER: 'chromium',
  JSON_FILE_NAME: 'appsettings.json',

  //Paths & artifacts
  SCREENSHOTS_PATH: 'artifacts/screenshots',
  LOG_PATH: 'logs/test.log',
  LOGS_FOLDER: 'logs',
  ALLURE_RESULTS_FOLDER: 'allure-results',
  ALLURE_REPORT_FOLDER: 'allure-report',
  SCREENSHOTS_FOLDER: 'screenshots',

  //Date & file formats
  DATE_FORMAT: 'yyyy-MM-dd',
  SCREENSHOT_DATE_FORMAT: 'yyyy-MM-dd',
  SCREENSHOT_TIME_FORMAT: 'HHmmssfff',
  PNG_FORMAT: 'png',
  SCREENSHOTS_ATTACHMENT_TYPE: 'image/png',

  //Error & assertion messages
  NO_AVAILABLE_FLIGHTS: 'Expected available flights, but none were found.',
  UNEXPECTED_NO_FLIGHTS_FOUND: "Unexpected 'No flights found' message.",
  FROM_CITY_NOT_MATCH: 'From city does not match.',
  TO_CITY_NOT_MATCH: 'To city does not match.',
  DEPARTURE_DATE_NOT_MATCH: 'Departure date does not match.',
  RETURN_DATE_NOT_MATCH: 'Return date does not match.',
  EXPECTED_FLIGHTS: 'Expected flights for {0} passenger(s).',
  PAYMENT_MODAL_NOT_OPENED: 'Payment modal is not opened.',
  BOOKING_CONFIRMATION_ID_NOT_FOUND: 'Booking confirmation ID not found.',
  ORIGIN_REQUIRED_ERROR: 'Expected origin required error.',
  SELECT_DEPARTURE_CITY: 'Please select a departure city.',
  DESTINATION_REQUIRED_ERROR: 'Expected destination required error.',
  SELECT_DESTINATION_CITY: 'Please select a destination city.',
  DATE_REQUIRED_ERROR: 'Expected date required error.',
  DEPARTURE_DATE_IN_THE_PAST: 'Departure date cannot be in the past.',
  PAST_DATE_OR_ERROR: 'Expected validation for past date (or date error).',
  RETURN_DATE_AFTER_DEPARTURE: 'Return date must be after departure date.',
  SAME_DEPARTURE_AND_DESTINATION: 'Departure and destination cities cannot be the same.',
  NO_FLIGHT_LIST_FOUND: 'No flights list found',
} as const;
