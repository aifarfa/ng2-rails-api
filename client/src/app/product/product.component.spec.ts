import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductService } from './product.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let service: ProductService;

  const serviceStub = {
    getProducts: null
  }
  const products = [
    { id: 1, name: 'Awesome', available: 100 },
    { id: 2, name: 'Foo', available: 100 },
    { id: 3, name: 'Bar', available: 200 },
  ]

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ProductComponent],
        imports: [RouterModule],
        providers: [
          { provide: ProductService, useValue: serviceStub }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(ProductService); // cloned stub
    spyOn(service, 'getProducts').and.returnValue(Promise.resolve(products));
  });

  describe('OnInit', () => {
    beforeEach(async(() => { // await ngOnInit
      fixture = TestBed.createComponent(ProductComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('should calls getProducts', () => {
      expect(service.getProducts).toHaveBeenCalled();
    });

    it('should set products', () => {
      expect(component.products.length).toEqual(3);
      expect(component.products[0].name).toEqual('Awesome');
    });

  })

});
