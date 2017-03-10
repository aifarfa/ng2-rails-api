import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getProducts(): Promise<any[]> {
    return this.http.get('/products')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getProduct(id: number): Promise<any> {
    const url = `/products/${id}`;
    console.log('getProduct called with', url)
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
