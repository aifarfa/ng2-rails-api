import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../product.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async(() => {
    const routes = {
      params: {
        subscribe: (callback) => callback({ id: 100 })
      }
    };

    TestBed
      .configureTestingModule({
        declarations: [ProductDetailComponent],
        providers: [ProductService,
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
});
