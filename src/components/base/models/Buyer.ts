import type { IBuyer, TPayment } from '@/types';

export class Buyer {
  private data: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: '',
  };

  setEmail(email: string) {
    this.data.email = email.trim();
  }

  setPhone(phone: string) {
    this.data.phone = phone.trim();
  }

  setAddress(address: string) {
    this.data.address = address.trim();
  }

  setPayment(payment: TPayment) {
    this.data.payment = payment;
  }

  getBuyer(): IBuyer {
    return { ...this.data };
  }

  clear(): void {
    this.data = {
      payment: null,
      email: '',
      phone: '',
      address: '',
    };
  }


  validate(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!this.data.email) errors.email = 'Укажите e-mail';
    if (!this.data.phone) errors.phone = 'Укажите телефон';
    if (!this.data.address) errors.address = 'Укажите адрес доставки';
    if (!this.data.payment) errors.payment = 'Выберите способ оплаты';

    return errors;
  }

  isValid(): boolean {
    return Object.keys(this.validate()).length === 0;
  }
}

