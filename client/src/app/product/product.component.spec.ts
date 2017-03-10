import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductService } from '../product.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let service = new ProductService();

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ProductComponent],
        imports: [RouterModule],
        providers: [
          { provide: ProductService, useValue: service }
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
      spyOn(service, 'getProducts').and.callFake(() => Promise.resolve(products));
      component.ngOnInit();
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
