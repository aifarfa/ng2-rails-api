import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../product.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const mockService = new ProductService(null) // todo override service
  const product = { id: 100, name: 'Foo', available: 500 }
  const routes = {
    params: {
      subscribe: (callback) => callback({ id: 100 })
    }
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ProductDetailComponent],
        providers: [
          { provide: ProductService, useValue: mockService },
          { provide: ActivatedRoute, useValue: routes }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(mockService, 'getProduct').and.returnValue(Promise.resolve(product));
  });

  describe('OnInit', () => {

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ProductDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }))

    it('should parse params["id"]', () => {
      expect(component.productId).toEqual(100);
    })

    it('should calls getProduct with id: 100', () => {
      expect(mockService.getProduct).toHaveBeenCalledWith(100);
    })

    it('set current product details', () => {
      expect(component.product).toBeDefined();
      expect(component.product).toEqual(product);
    })
  })
});
