
import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from 'app/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  order$:any;

  constructor(
    private authService: AuthService,
    private orderService: OrderService){

    this.order$ = this.authService.user$
      .pipe(switchMap(u => this.orderService.getOrdersByUser(u?u.uid:'')));
     
      
    }

  }
