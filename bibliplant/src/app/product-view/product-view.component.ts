import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  public products: any[] = []

  private productSubscription: Subscription | undefined

  constructor(private productService: ProductService) {
    this.productService.getAppareilsFromServer()
    this.products = this.productService.products
  }

  ngOnInit(): void {
    this.productSubscription = this.productService.productsSubject.subscribe(
      (products: any[]) => {
        this.products = products;
      }
    );
    this.productService.emitAppareilSubject();
  }

}
