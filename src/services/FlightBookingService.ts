import { Page } from '@playwright/test';
import { FlightBookingPage } from '../pages/FlightBookingPage';
import { PaymentModal } from '../pages/PaymentModal';
import { TripType } from '../core/Enums/TripTypeEnum';

export class FlightBookingService {
  page: Page;
  flightBookingPage: FlightBookingPage;

  constructor(page: Page) {
    this.page = page;
    this.flightBookingPage = new FlightBookingPage(page);
  }

  async init(): Promise<void> {
    await this.flightBookingPage.goToFlightBookingPage();
  }

  async search(
    from?: string,
    to?: string,
    departureDate?: Date,
    arrivalDate?: Date,
    passengers?: number,
    tripType?: TripType,
  ): Promise<FlightBookingPage> {
    const finalTripType = tripType ?? (arrivalDate ? TripType.RoundTrip : TripType.OneWay);

    finalTripType === TripType.RoundTrip
      ? this.flightBookingPage.setTripTypeRoundWay()
      : this.flightBookingPage.setTripTypeOneWay();

    if (from?.trim()) await this.flightBookingPage.setFromCity(from);
    if (to?.trim()) await this.flightBookingPage.setToCity(to);
    if (departureDate) await this.flightBookingPage.setDepartureDate(departureDate);
    if (arrivalDate) await this.flightBookingPage.setArrivalDate(arrivalDate);
    if (passengers != undefined) await this.flightBookingPage.setPassengers(passengers.toString());

    return this.flightBookingPage.searchFlights();
  }

  async searchOneWay(from: string, to: string, departureDate: Date): Promise<FlightBookingPage> {
    return this.search(from, to, departureDate, undefined, undefined, TripType.OneWay);
  }

  async searchRoundWay(
    from: string,
    to: string,
    departureDate: Date,
    arrivalDate: Date,
  ): Promise<FlightBookingPage> {
    return this.search(from, to, departureDate, arrivalDate, undefined, TripType.RoundTrip);
  }

  async searchOneWayFlightWithEmptyFields(): Promise<FlightBookingPage> {
    return this.search(undefined, undefined, undefined, undefined, undefined, TripType.OneWay);
  }

  async searchRoundWayFlightsWithEmptyFields(): Promise<FlightBookingPage> {
    return this.search(undefined, undefined, undefined, undefined, undefined, TripType.RoundTrip);
  }

  async searchOneWayWithoutOrigin(to: string, date: Date): Promise<FlightBookingPage> {
    return this.search(undefined, to, date, undefined, undefined, TripType.OneWay);
  }

  async searchOneWayWithoutDestination(from: string, date: Date): Promise<FlightBookingPage> {
    return this.search(from, undefined, date, undefined, undefined, TripType.OneWay);
  }

  async searchOneWayWithoutDepartureDate(from: string, to: string): Promise<FlightBookingPage> {
    return this.search(from, to, undefined, undefined, undefined, TripType.OneWay);
  }

  async searchRoundWayWithoutReturnDate(
    from: string,
    to: string,
    date: Date,
  ): Promise<FlightBookingPage> {
    return this.search(from, to, date, undefined, undefined, TripType.RoundTrip);
  }

  async searchOneWayWithPassengers(
    from: string,
    to: string,
    date: Date,
    passengers: number,
  ): Promise<FlightBookingPage> {
    return this.search(from, to, date, undefined, passengers, TripType.OneWay);
  }

  async openPaymentForFirstFlight(flightBookingPage: FlightBookingPage): Promise<PaymentModal> {
    try {
      flightBookingPage.selectFirstFlight();
      return new PaymentModal(this.page);
    } catch (error) {
      throw error;
    }
  }
}
