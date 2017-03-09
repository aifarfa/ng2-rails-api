import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(): Promise<any[]> {
    const SAMPLE = [
      { id: 1, name: 'Foo', available: 200 },
      { id: 2, name: 'Bar', available: 100 }
    ];
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(SAMPLE), 500);
    })
  }
}
