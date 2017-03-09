import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  products: any[] = [
    { name: 'Foo', available: 200 },
    { name: 'Bar', available: 100 }
  ]

  ngOnInit() {
    // console.log(this.products)
  }

}
