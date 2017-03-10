import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getProducts(): Promise<any[]> {
    return this.http.get('/api/products')
      .toPromise()
      .then(response => response.json())
  }

  getProduct(id: number): Promise<any> {
    const url = `/api/products/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
  }
}
