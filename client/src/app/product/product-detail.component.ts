import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { ProductService }           from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  productId: number

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.productId = params['id'];
        console.log('activated route params', this.productId)
      })
  }

}
