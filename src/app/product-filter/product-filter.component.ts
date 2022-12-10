import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'app/category.service';


@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category: any;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
   }

  ngOnInit():void {
  }

}