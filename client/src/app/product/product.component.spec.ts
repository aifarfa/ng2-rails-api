import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductService } from '../product.service';

// for override service
class MockProductService extends ProductService {}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  const mockService = new MockProductService()

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ProductComponent],
        imports: [RouterModule],
        providers: [
          { provide: ProductService, useValue: mockService }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have empty products', () => {
    expect(component.products).not.toBeNull()
  });

  describe('OnInit', () => {
    const products = [
      { id: 1, name: 'Awesome', available: 100 },
      { id: 2, name: 'Foo', available: 100 },
      { id: 3, name: 'Bar', available: 200 },
    ]

    beforeEach(async(() => { // await ngOnInit
      spyOn(mockService, 'getProducts').and.returnValue(Promise.resolve(products));
      component.ngOnInit();
    }));

    it('should calls getProducts', () => {
      expect(mockService.getProducts).toHaveBeenCalled();
    });

    it('should set products', () => {
      expect(component.products.length).toEqual(3);
      expect(component.products[0].name).toEqual('Awesome');
    });

  })

});
