// src/components/models/Cart.ts
import type { IProduct } from 'C:/Users/mora/Desktop/NewWEBLarek/weblarek/src/types';

export class Cart {
  private items: IProduct[] = [];

  addProduct(product: IProduct): void {
    if (!this.items.find(p => p.id === product.id)) {
      this.items.push(product);
    }
  }

  getAll(): IProduct[] {
    return this.items.slice();
  }

  getTotal(): number {
    return this.items.reduce((sum, p) => sum + (p.price ?? 0), 0);
  }

  clear(): void {
    this.items = [];
  }

  hasProduct(productId: string): boolean {
    return this.items.some(p => p.id === productId);
  }
}
