import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: any[]

  ngOnInit() {
    this.productService.getProducts()
    .then(result => {
      console.log('getProducts done..', result);
      this.products = result
    })
    .catch(e => console.warn(e))
  }

}
