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
import 'rxjs/add/observable/throw';

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

    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(mockHttp, 'get');
      spy.and.returnValue(Observable.of({
        json: () => mockResponse
      }))
    })

    it('resolves with given response', fakeAsync(() => {
      this.service.getProducts()
        .then(result => {
          expect(mockHttp.get).toHaveBeenCalledWith('/api/products')
          expect(result).toEqual(mockResponse)
        })
    }))

    it('reject with errors', fakeAsync(() => {
      spy.and.returnValue(Observable.throw('NONO'))
      this.service.getProducts()
        .catch((error: any) => {
          expect(mockHttp.get).toHaveBeenCalledWith('/api/products')
          expect(error).toEqual('NONO')
        })
    }))
  })

  describe('getProduct(id)', () => {
    const mockResponse = { id: 1, name: 'Foo', available: 100 }

    beforeEach(() => {
      this.spy = spyOn(mockHttp, 'get')
      this.spy.and.returnValue(Observable.of({
        json: () => mockResponse
      }))
    })

    it('resolves with given response', fakeAsync(() => {
      this.service.getProduct(100)
        .then(result => {
          expect(mockHttp.get).toHaveBeenCalledWith('/api/products/100')
          expect(result).toEqual(mockResponse);
        });
    }))

    it('reject with errors', fakeAsync(() => {
      this.spy.and.returnValue(Observable.throw('NONO'))
      this.service.getProduct(1)
        .catch((error: any) => {
          expect(mockHttp.get).toHaveBeenCalledWith('/api/products/1')
          expect(error).toEqual('NONO')
        })
    }))
  })

});
