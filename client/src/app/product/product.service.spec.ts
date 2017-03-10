import { fakeAsync, TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
} from '@angular/http';
import { ProductService } from './product.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

describe('ProductService', () => {
  let mockHttp: Http;
  // let service: ProductService;

  beforeEach(() => {
    const httpStub = { get: null } as Http;

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: Http, useValue: httpStub },
        ProductService
      ]
    });
  });

  beforeEach(inject([ProductService], (service: ProductService) => {
    this.service = service;
    mockHttp = TestBed.get(Http);
  }))

  describe('getProducts', () => {
    const mockResponse = [
      { id: 1, name: 'Foo', available: 100 },
      { id: 2, name: 'Bar', available: 0 },
    ];

    beforeEach(() => {
      spyOn(mockHttp, 'get').and.returnValue(Observable.of({
        json: () => mockResponse
      }));
    })

    it('resolves with given response', fakeAsync(() => {
      this.service.getProducts()
        .then(result => {
          expect(mockHttp.get).toHaveBeenCalledWith('/products')
          expect(result).toEqual(mockResponse);
        });
    }))
  })

  describe('getProduct(id)', () => {
    const mockResponse = { id: 1, name: 'Foo', available: 100 }

    beforeEach(() => {
      spyOn(mockHttp, 'get').and.returnValue(Observable.of({
        json: () => mockResponse
      }));
    })

    it('resolves with given response', fakeAsync(() => {
      this.service.getProduct(100)
        .then(result => {
          expect(mockHttp.get).toHaveBeenCalledWith('/products/100')
          expect(result).toEqual(mockResponse);
        });
    }))
  })

});
