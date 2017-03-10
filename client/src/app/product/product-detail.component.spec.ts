import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../product.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const mockService = new ProductService() // todo override service
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
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse params["id"]', () => {
    expect(component.productId).toEqual(100);
  })

  describe('OnInit', () => {
    const product = { id: 100, name: 'Foo', available: 500 }

    beforeEach(async(() => {
      spyOn(mockService, 'getProduct').and.returnValue(Promise.resolve(product));
      component.ngOnInit();
    }))

    it('should calls getProduct with id: 100', () => {
      expect(mockService.getProduct).toHaveBeenCalledWith(100);
    })

    it('set current product details', () => {
      expect(component.product).toBeDefined();
      expect(component.product).toEqual(product);
    })
  })
});
