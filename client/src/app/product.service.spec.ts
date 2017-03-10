import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        ProductService
      ]
    });
  });

  describe('getProducts', () => {
    beforeEach(inject([ProductService, XHRBackend], (service: ProductService, mockBackend) => {
      this.service = service;
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({id: 1, name: 'Foo', available: 100})
        })));
      });
    }))

    it('returns Promise', () => {
      let result = this.service.getProducts();
      expect(result.then).toBeDefined();
    })

    it('resolves array', (done) => {
      this.service.getProducts()
        .then(result => {
          // console.log('getProducts done..')
          expect(result).toBeTruthy();
          done();
        })
        .catch(done);
    })
  })
});
