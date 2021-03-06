import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Subscription} from "rxjs";
import {Field} from "../field";
import {FieldStyle} from "../field-style";
import {Line} from "../line";

/**
 * Component displaying all products
 *
 * @author Liscare
 */
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  public products: Object[] = []
  public productsStyle: any[] = []

  public lines: Line[] = []
  public fieldStyles: Map<string, FieldStyle> = new Map<string, FieldStyle>()

  private productSubscription: Subscription | undefined
  private productStyleSubscription: Subscription | undefined

  constructor(private productService: ProductService) {
    this.productService.getAppareilsFromServer()
    this.products = this.productService.products
  }

  /**
   * Get data from the ProductService and generate Lines and FieldStyles
   */
  ngOnInit(): void {
    this.productSubscription = this.productService.productsSubject.subscribe(
      (products: any[]) => {
        this.products = products;
      }
    );
    this.productService.emitProductsSubject();
    this.productStyleSubscription = this.productService.productsStyleSubject.subscribe(
      (productsStyle: any[]) => {
        this.productsStyle = productsStyle;
        this.generateFieldStyle()
        this.generateFields()
      }
    );
  }

  private generateFieldStyle() {
    this.productsStyle.forEach(value => this.addFieldStyle(value))
  }

  /**
   * Create fieldStyle from raw data
   * @param valueJson Raw value from the JSON file
   * @private
   */
  private addFieldStyle(valueJson: any | undefined) {
    let fieldStyle: FieldStyle = new FieldStyle()
    fieldStyle.name = valueJson.name
    fieldStyle.style = valueJson.style
    fieldStyle.displayName = valueJson.displayName
    this.fieldStyles.set(fieldStyle.name, fieldStyle)
  }

  private generateFields() {
    if (this.products == null) {
      console.error("No products")
      return
    }
    this.products.forEach(value => this.addLine(value))
  }

  /**
   * Generate Line object with their fields
   * @param valueJson Raw data from a JSON file
   * @private
   */
  private addLine(valueJson: any) {
    let line: Line = new Line()
    line.id = 0
    for (let key in valueJson) {
      if (valueJson.hasOwnProperty(key)) {
        line.fields.push(this.addField(key, valueJson[key]))
      }
    }
    this.lines.push(line)
  }

  /**
   * Create Field object and associate it to the FieldStyle object corresponding
   * @param key Data name in the JSON file
   * @param value Raw data from the JSON file
   * @private
   */
  private addField(key: string, value: any): Field {
    let field: Field = new Field()
    field.data = value
    field.id = 0
    if (this.fieldStyles.has(key)) {
      field.style = this.fieldStyles.get(key)
    }
    return field
  }

}
