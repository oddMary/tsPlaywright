import { Page } from '@playwright/test';
import { PaymentModal } from '../pages/PaymentModal';
import { FlightBookingPage } from '../pages/FlightBookingPage';

export class PaymentModalService {
  page: Page;
  paymentModal: PaymentModal;

  constructor(page: Page) {
    this.page = page;
    this.paymentModal = new PaymentModal(page);
  }

  async CompleteBookingWithValidData(
    paymentModal: PaymentModal,
    cardNumber: string,
    expiryMmYy: string,
    cvv: string,
  ): Promise<FlightBookingPage> {
    paymentModal.enterCard(cardNumber, expiryMmYy, cvv);
    return paymentModal.submitPayment();
  }
}
