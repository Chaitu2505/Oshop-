import {  switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {  Observable, Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from 'app/models/Product';
import { ShoppingCart } from 'app/models/shopping-cart';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string | null;
  categories$!: Observable<any>;
  cart$!: Observable<ShoppingCart>;
  subscription!: Subscription;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute, 
    private shoppingCartService: ShoppingCartService) {}

    async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart(); // Used here because constructors cannot be async
      this.populateProducts();
    }
  
    private populateProducts() {
      this.productService.getAll()
      .pipe(
        switchMap(products => {
          if(products != null) {
            this.products = products;
          }
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
    }
  
    private applyFilter() {
      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    }
  }
