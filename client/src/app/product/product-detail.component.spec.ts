import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './product.service';
import { Subject } from 'rxjs/Subject';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const params = new Subject<Params>();
  const product = { id: 100, name: 'Foo', available: 500 };
  const spy = jasmine.createSpy('getProduct');

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ProductDetailComponent],
        imports: [FormsModule],
        providers: [
          { provide: ProductService, useValue: { getProduct: spy } },
          { provide: ActivatedRoute, useValue: { params } }
        ]
      })
      .compileComponents();
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  })

  describe('when route params change', () => {
    beforeEach(async(() => { // await subscribe callback done
      spy.and.returnValue(Promise.resolve(product));
      params.next({ id: 100 })
    }))

    it('set productId', () => {
      expect(component.productId).toEqual(100);
    })

    it('calls getProduct with productId', () => {
      expect(spy).toHaveBeenCalledWith(100);
    })

    it('set current product details', () => {
      expect(component.product).toEqual(product);
    })

    it('update productId', fakeAsync(() => {
      params.next({ 'id': 99 });
      expect(spy).toHaveBeenCalledWith(99);
    }))

  })
});
