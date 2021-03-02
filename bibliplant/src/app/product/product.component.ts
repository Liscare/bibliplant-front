import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product : any;

  constructor() { }

  ngOnInit(): void {

  }

}
