import { test } from '../base/FlightFixtures';
import { TestConstants } from '../../src/core/constants/test-constants';

test.describe('Flights - Booking', () => {
  test('N01_Search_OneWay_MinimalRequiredData_DisplaysAvailableFlights', async ({
    flightService,
    departureDate,
    flightAssertions,
  }) => {
    const results = flightService.searchOneWay(
      TestConstants.DEFAULT_FROM,
      TestConstants.DEFAULT_TO,
      departureDate,
    );

    await flightAssertions.shouldHaveFlights(await results, TestConstants.NO_AVAILABLE_FLIGHTS);
    await flightAssertions.shouldMatchRoute(
      await results,
      TestConstants.DEFAULT_FROM,
      TestConstants.TO_CITY_NOT_MATCH,
    );
    await flightAssertions.shouldMatchRoute(
      await results,
      TestConstants.DEFAULT_TO,
      TestConstants.FROM_CITY_NOT_MATCH,
    );
    await flightAssertions.shouldMatchDepartureFlightDate(
      await results,
      departureDate,
      TestConstants.DEPARTURE_DATE_NOT_MATCH,
    );
  });
});
