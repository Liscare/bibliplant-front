import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class ProductService {

  public productsSubject = new Subject<any>()

  public products: any

  constructor() {
    this.getAppareilsFromServer()
  }

  public getAppareilsFromServer(): void {
    fetch('./assets/json/regulateur.json').then(res => res.json())
      .then(json => {
        this.products = json;
        this.emitAppareilSubject()
      });
  }

  emitAppareilSubject(): void {
    this.productsSubject.next(this.products);
  }
}

