// src/components/models/Buyer.ts
import type { IBuyer, TPayment } from '@/types';


export class Buyer {
  private data: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: '',
  };

  setEmail(email: string) { this.data.email = email; }
  setPhone(phone: string) { this.data.phone = phone; }
  setAddress(address: string) { this.data.address = address; }
  setPayment(payment: TPayment) { this.data.payment = payment; }

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
}
