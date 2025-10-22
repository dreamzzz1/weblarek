// src/components/models/Products.ts
import type { IProduct, IApiProductsResponse } from '@/types';


export class Products {
  private items: IProduct[] = [];
  private selected: IProduct | null = null;

  setProducts(items: IProduct[]): void {
    this.items = Array.isArray(items) ? items.slice() : [];
  }

  getAll(): IProduct[] {
    return this.items.slice();
  }

  getItemById(id: string): IProduct | null {
    return this.items.find(i => i.id === id) ?? null;
  }

  setSelected(item: IProduct | null): void {
    this.selected = item;
  }

  getSelected(): IProduct | null {
    return this.selected;
  }
}
