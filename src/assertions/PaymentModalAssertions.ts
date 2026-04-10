import { expect } from '@playwright/test';
import { PaymentModal } from '../pages/PaymentModal';

export class PaymentModalAssertions {
  async shouldShowPaymentModal(paymentModal: PaymentModal, message: string): Promise<void> {
    const result = await paymentModal.paymentModalWindowAppeared();
    expect(result, message).toBeTruthy();
  }
}
