import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  baseUrl: string

  constructor(private http: Http) {
    console.log('environment', environment.envName)
    this.baseUrl = environment.endpoint;
  }

  getProducts(): Promise<any[]> {
    return this.http.get(`${this.baseUrl}/api/products`)
      .toPromise()
      .then(response => response.json())
  }

  getProduct(id: number): Promise<any> {
    const url = `${this.baseUrl}/api/products/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
  }
}
