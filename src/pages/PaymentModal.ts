import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TextInput } from '../core/Controls/TextInput';
import { Button } from '../core/Controls/Button';
import { FlightBookingPage } from './FlightBookingPage';

export class PaymentModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get cardNumberInput(): TextInput {
    return new TextInput(this.page.locator('#cardNumber'));
  }

  private get expiryDateInput(): TextInput {
    return new TextInput(this.page.locator('#expiryDate'));
  }

  private get cvvInput(): TextInput {
    return new TextInput(this.page.locator('#cvv'));
  }

  private get SubmitPaymentButton(): Button {
    return new Button(this.page.locator('div.modal-body button'));
  }

  private get paymentModalWindow() {
    return this.page.locator('.modal-header');
  }

  async paymentModalWindowAppeared(): Promise<boolean> {
    try {
      return this.paymentModalWindow.isVisible();
    } catch (error) {
      return false;
    }
  }

  async enterCard(cardNumber: string, expiryMmYy: string, cvv: string): Promise<PaymentModal> {
    this.cardNumberInput.fillText(cardNumber);
    this.expiryDateInput.fillText(expiryMmYy);
    this.cardNumberInput.fillText(cvv);
    return this;
  }

  async submitPayment(): Promise<FlightBookingPage> {
    this.SubmitPaymentButton.scrollToCenterAndClick();
    return new FlightBookingPage(this.page);
  }
}
