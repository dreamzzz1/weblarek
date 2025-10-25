// src/components/models/Products.ts
import  { IProduct, IApiProductsResponse } from '@/types';
import { EventEmitter } from '../Events';

export class Catalog extends EventEmitter {
  protected  productsList: IProduct [] = [];
  protected  selectedProduct: IProduct | null = null;

  setProductsList(products: IProduct[]): void {
    this.productsList = products;
    this.emit('catalog:changed');
  }

  getProductsList(): IProduct [] {
    return this.productsList;
  }

  getProductById(id: string): IProduct | null {
    return this.productsList.find(product => product.id === id) || null;
  }

  selectProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
