import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { OrderService } from 'app/order.service';



@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  order$:any;

  constructor(auth: AuthService,private orderService: OrderService, private router: Router) {
    this.order$ = orderService.getOrders();
    }

}
