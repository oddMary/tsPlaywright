import { Page } from '@playwright/test';
import { Link } from '../core/Controls/Link';
import { FlightBookingPage } from './FlightBookingPage';
import { TestConstants } from '../core/constants/test-constants';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get flightBookingPageLInk(): Link {
    return new Link(this.page.locator("li a[href*='flight']"));
  }

  async openAutomationTestingPracticeHubPage(): Promise<void> {
    try {
      await this.page.goto('https://testerbud.com/practice-page-selection');
    } catch (error) {
      throw error;
    }
  }

  async goToFlightBookingPage(): Promise<FlightBookingPage> {
    this.openAutomationTestingPracticeHubPage();

    try {
      this.flightBookingPageLInk.scrollToCenterAndClick();
    } catch (error) {
      throw error;
    }

    this.page.waitForURL(TestConstants.FLIGHT_BOOKING_URL_PART);
    return new FlightBookingPage(this.page);
  }
}
