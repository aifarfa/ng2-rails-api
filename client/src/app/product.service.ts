import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve([]), 500);
    })
  }
}
