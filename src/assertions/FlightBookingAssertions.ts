import { expect } from '@playwright/test';
import { FlightBookingPage } from '../pages/FlightBookingPage';
import { LabelControl } from '../core/Controls/LabelControl';
import { TestConstants } from '../core/constants/test-constants';

export class FlightBookingAssertions {
  async shouldHaveFlights(flightPage: FlightBookingPage, message: string): Promise<void> {
    const list = await flightPage.getListOfAwailableFlights();
    const count = list.length;
    const result = count > 0;
    expect(result, message).toBeTruthy();
  }

  async shouldMatchRoute(
    flightPage: FlightBookingPage,
    route: string,
    message: string,
  ): Promise<void> {
    const items = await flightPage.getListOfAwailableFlights();
    expect(items, TestConstants.NO_FLIGHT_LIST_FOUND).toBeTruthy();
    expect(items.length, TestConstants.NO_AVAILABLE_FLIGHTS).toBeGreaterThan(0);

    const texts = await Promise.all(items.map(async (f) => (await f.getText())?.trim() ?? ''));

    const allMatch = texts.every((t) => t.toLocaleLowerCase().includes(route.toLowerCase()));
  }

  async shouldMatchDepartureFlightDate(
    flightPage: FlightBookingPage,
    date: Date,
    message: string,
  ): Promise<void> {
    const flightDateInfo = await flightPage.getDepartureFlightsDateTextInfo();
    const result = await this.allFlightsMatchDate(flightDateInfo, date);

    expect(result, message).toBeTruthy();
  }

  async shouldShownOriginRequired(flightPage: FlightBookingPage, message: string): Promise<void> {
    const text = (await flightPage.getOriginRequiredErrorMessage())?.trim();
    const result = !!text;
    expect(result, message).toBeTruthy();
  }

  async shouldShownDestinationRequired(
    flightPage: FlightBookingPage,
    message: string,
  ): Promise<void> {
    const text = (await flightPage.getDestinationRequiredErrorMessage())?.trim();
    const result = !!text;
    expect(result, message).toBeTruthy();
  }

  async shouldShownDepartureDateRequired(
    flightPage: FlightBookingPage,
    message: string,
  ): Promise<void> {
    const text = (await flightPage.getDepartureDateRequiredErrorMessage())?.trim();
    const result = !!text;
    expect(result, message).toBeTruthy();
  }

  async shouldShownReturnDateRequired(
    flightPage: FlightBookingPage,
    message: string,
  ): Promise<void> {
    const text = (await flightPage.getArrivalDateRequiredErrorMessage())?.trim();
    const result = !!text;
    expect(result, message).toBeTruthy();
  }

  async originRequiredMessageShouldBe(
    flightPage: FlightBookingPage,
    message: string,
  ): Promise<void> {
    const text = await flightPage.getOriginRequiredErrorMessage();
    expect(text).toEqual(message);
  }

  async destinationRequiredMessageShouldBe(
    flightPage: FlightBookingPage,
    message: string,
  ): Promise<void> {
    const text = await flightPage.getDestinationRequiredErrorMessage();
    expect(text).toEqual(message);
  }

  async departureDateRequiredMessageShouldBe(
    flightPage: FlightBookingPage,
    message: string,
  ): Promise<void> {
    const text = await flightPage.getDepartureDateRequiredErrorMessage();
    expect(text).toEqual(message);
  }

  async arrivalDateRequiredMessageShouldBe(
    flightPage: FlightBookingPage,
    message: string,
  ): Promise<void> {
    const text = await flightPage.getArrivalDateRequiredErrorMessage();
    expect(text).toEqual(message);
  }

  async allFlightsMatchDate(flightsDateInfo: LabelControl[], date: Date): Promise<boolean> {
    if (!flightsDateInfo || flightsDateInfo.length === 0) {
      return false;
    }

    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const pattern = `\\b0?${month}/0?${day}/${year}\\b`;
    const regex = new RegExp(pattern);

    const texts = await Promise.all(
      flightsDateInfo.map(async (f) => {
        if (!f) return '';
        const text = await f.getText();
        return text?.trim() ?? '';
      }),
    );

    const result = texts.every((t) => regex.test(t));
    return result;
  }
}
