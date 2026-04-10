import { Page } from '@playwright/test';
import { Checkbox } from '../core/Controls/Checkbox';
import { Select } from '../core/Controls/Select';
import { TextInput } from '../core/Controls/TextInput';
import { Button } from '../core/Controls/Button';
import { LabelControl } from '../core/Controls/LabelControl';
import { BasePage } from './BasePage';

export class FlightBookingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //Selectors
  private get oneWayCheckbox(): Checkbox {
    return new Checkbox(this.page.locator('#oneWay'));
  }

  private get fromSelect(): Select {
    return new Select(this.page.locator('#from'));
  }

  private get toSelect(): Select {
    return new Select(this.page.locator('#to'));
  }

  private get departureDateInput(): TextInput {
    return new TextInput(this.page.locator('#departureDate'));
  }

  private get arrivalDate(): TextInput {
    return new TextInput(this.page.locator('#returnDate'));
  }

  private get searchFlightsButton(): Button {
    return new Button(this.page.locator("//button[contains(text(), 'Search Flights')]"));
  }

  private get passengersInput(): TextInput {
    return new TextInput(this.page.locator('#passengers'));
  }

  private get resultCards(): LabelControl {
    return new LabelControl(this.page.locator('.list-group button'));
  }

  private get flightDepartureDateInfoText(): LabelControl {
    return new LabelControl(
      this.page.locator(
        "//h6[contains(normalize-space(.), 'Departure')]/following-sibling::small[1]",
      ),
    );
  }

  private get flightArrivalDateInfoText(): LabelControl {
    return new LabelControl(
      this.page.locator("//h6[contains(normalize-space(.), 'Return')]/following-sibling::small[1]"),
    );
  }

  private get bookingSuccessfulMessage(): LabelControl {
    return new LabelControl(this.page.locator('h4.text-success'));
  }

  private get fromRequiredErrorMessage(): LabelControl {
    return new LabelControl(this.page.locator("//select[@id='from']/following-sibling::small"));
  }

  private get toRequiredErrorMessage(): LabelControl {
    return new LabelControl(this.page.locator("//select[@id='to']/following-sibling::small"));
  }

  private get departureDateRequiredErrorMessage(): LabelControl {
    return new LabelControl(
      this.page.locator("//input[@id='departureDate']/following-sibling::small"),
    );
  }

  private get arrivalDateRequiredErrorMessage(): LabelControl {
    return new LabelControl(
      this.page.locator("//input[@id='returnDate']/following-sibling::small"),
    );
  }

  async setTripTypeOneWay(): Promise<FlightBookingPage> {
    await this.oneWayCheckbox.scrollToCenterAndClick();
    return this;
  }

  async setTripTypeRoundWay(): Promise<void> {
    if (await this.oneWayCheckbox.isSelected()) {
      await this.oneWayCheckbox.click();
    }
  }

  async setFromCity(city: string): Promise<FlightBookingPage> {
    await this.fromSelect.SelectOption(city);
    return this;
  }

  async setToCity(city: string): Promise<FlightBookingPage> {
    await this.toSelect.SelectOption(city);
    return this;
  }

  async setDepartureDate(date: Date): Promise<FlightBookingPage> {
    await this.departureDateInput.setFormattedText(date);
    return this;
  }

  async setArrivalDate(date: Date): Promise<FlightBookingPage> {
    await this.arrivalDate.setFormattedText(date);
    return this;
  }

  async searchFlights(): Promise<FlightBookingPage> {
    await this.searchFlightsButton.click();
    return this;
  }

  async setPassengers(passengers: string): Promise<FlightBookingPage> {
    await this.passengersInput.fillText(passengers);
    return this;
  }

  async getListOfAwailableFlights(): Promise<LabelControl[]> {
    const result = await this.resultCards.getList();
    return result;
  }

  async getDepartureFlightsDateTextInfo(): Promise<LabelControl[]> {
    const result = await this.flightDepartureDateInfoText.getList();
    return result;
  }

  async getArrivalFlightsDateTextInfo(): Promise<LabelControl[]> {
    const result = await this.flightArrivalDateInfoText.getList();
    return result;
  }

  async getBookingSuccessfulMessage(): Promise<string> {
    const result = await this.bookingSuccessfulMessage.getText();
    return result;
  }

  async getOriginRequiredErrorMessage(): Promise<string> {
    const result = await this.fromRequiredErrorMessage.getText();
    return result;
  }

  async getDestinationRequiredErrorMessage(): Promise<string> {
    const result = await this.toRequiredErrorMessage.getText();
    return result;
  }

  async getDepartureDateRequiredErrorMessage(): Promise<string> {
    const result = await this.departureDateRequiredErrorMessage.getText();
    return result;
  }

  async getArrivalDateRequiredErrorMessage(): Promise<string> {
    const result = await this.arrivalDateRequiredErrorMessage.getText();
    return result;
  }

  async selectFirstFlight(): Promise<void> {
    const list = await this.getListOfAwailableFlights();
    if (!list || list.length == 0) {
      throw new Error('No flights available to select the first flight.');
    }
    await list[0].click();
  }
}
