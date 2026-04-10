import { test as base } from '@playwright/test';
import { FlightBookingService } from '../../src/services/FlightBookingService';
import { FlightBookingAssertions } from '../../src/assertions/FlightBookingAssertions';
import { PaymentModalService } from '../../src/services/PaymentModalService';
import { PaymentModalAssertions } from '../../src/assertions/PaymentModalAssertions';

type FlightFixtures = {
  flightService: FlightBookingService;
  flightAssertions: FlightBookingAssertions;
  paymentService: PaymentModalService;
  paymentAssertions: PaymentModalAssertions;

  departureDate: Date;
  returnDate: Date;
};

export const test = base.extend<FlightFixtures>({
  flightService: async ({ page }, use) => {
    const service = new FlightBookingService(page);
    await service.init();
    await use(service);
  },

  flightAssertions: async ({ page }, use) => {
    await use(new FlightBookingAssertions());
  },

  paymentService: async ({ page }, use) => {
    await use(new PaymentModalService(page));
  },

  paymentAssertions: async ({ page }, use) => {
    await use(new PaymentModalAssertions());
  },

  departureDate: async ({}, use) => {
    await use(new Date());
  },

  returnDate: async ({}, use) => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    await use(date);
  },
});

export { expect } from '@playwright/test';
