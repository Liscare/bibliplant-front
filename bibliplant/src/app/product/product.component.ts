import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Line} from "../line";

/**
 * Component to display a product
 * \\ TODO Display field according to the FieldStyle
 * @author Liscare
 */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product : Line = new Line();

  constructor() { }

  ngOnInit(): void {

  }

}
