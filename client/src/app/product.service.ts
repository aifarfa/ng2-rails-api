import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(): Promise<any[]> {
    const SAMPLE = [
      { id: 1, name: 'Foo', available: 200 },
      { id: 2, name: 'Bar', available: 100 }
    ];
    return Promise.resolve(SAMPLE);
  }

  getProduct(id: number): Promise<any> {
    return Promise.resolve({});
  }
}
