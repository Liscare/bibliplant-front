import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

/**
 * Service getting data from JSON files
 * // TODO Make it generic (get data from any JSON file)
 * @author Liscare
 */
@Injectable()
export class ProductService {

  public productsSubject = new Subject<any>()
  public productsStyleSubject = new Subject<any>()

  public products: any
  public productsStyle: any

  constructor(private httpClient: HttpClient) {
    this.getAppareilsFromServer()
  }

  public getAppareilsFromServer(): void {
    this.httpClient.get<any>('assets/json/regulateurs.json').subscribe(data => this.initProducts(data))
    this.httpClient.get<any>('assets/json/regulateurs-style.json').subscribe(data => this.initProductStyles(data))
  }

  /**
   * Initialize products from JSON
   * @param data Data from a JSON file
   * @private
   */
  private initProducts(data: any) {
    this.products = data
    this.emitProductsSubject()
  }

  /**
   * Initialize product styles from JSON
   * @param data Data from a JSON file
   * @private
   */
  private initProductStyles(data: any) {
    this.productsStyle = data
    this.emitProductsStyleSubject()
  }

  emitProductsSubject(): void {
    this.productsSubject.next(this.products);
  }

  emitProductsStyleSubject(): void {
    this.productsStyleSubject.next(this.productsStyle);
  }
}

