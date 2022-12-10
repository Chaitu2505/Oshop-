import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

import { ShoppingCart } from '../models/shopping-cart';
import { Product } from 'app/models/Product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart; 
  dataSource: any;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	
		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
    	}
    }

}