import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../product.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let service: ProductService;

  const product = { id: 100, name: 'Foo', available: 500 }
  const routes = {
    params: {
      subscribe: (callback) => callback({ id: 100 })
    }
  };
  const serviceStub = {
    getProduct: null
  }

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ProductDetailComponent],
        providers: [
          { provide: ProductService, useValue: serviceStub },
          { provide: ActivatedRoute, useValue: routes }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(ProductService);
    spyOn(service, 'getProduct').and.returnValue(Promise.resolve(product));
  })

  describe('OnInit', () => {
    beforeEach(async(() => { // await ngOnInit to be done
      fixture = TestBed.createComponent(ProductDetailComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
    }));

    it('should parse params["id"]', () => {
      expect(component.productId).toEqual(100);
    })

    it('should calls getProduct with id: 100', () => {
      expect(service.getProduct).toHaveBeenCalledWith(100);
    })

    it('set current product details', () => {
      expect(component.product).toEqual(product);
    })
  })
});
