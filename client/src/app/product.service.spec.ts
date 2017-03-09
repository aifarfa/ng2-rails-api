import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
  });

  describe('getProducts', () => {
    beforeEach(inject([ProductService], (service: ProductService) => {
      this.service = service;
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
