import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from './models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
   return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }
  get(productId:any){
    return this.db.object<Product>('/products/' + productId).valueChanges();

  }
  update(productId: any,product: any){
   return this.db.object('/products/' + productId).update(product);
  }
  delete(productId:any){
    return this.db.object('/products/' + productId).remove();

  }
}
