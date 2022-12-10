
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { UserService } from './user.service';
import { AppUser } from './models/app-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;
  
  constructor(
    private afAuth: AngularFireAuth,
    private route:ActivatedRoute,
    private userService: UserService,
    private router:Router
    ) 
    { 
    this.user$ = afAuth.authState;
  }

  login(){
    const returlUrl = this.route.snapshot.queryParamMap.get('returlUrl') || '/';
    localStorage.setItem('returnUrl',returlUrl);

     this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      
  }
  
  logout(){
    this.afAuth.signOut();
  }
  
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) 
          return this.userService.get(user.uid);
        
        return of(null);
      }));
  }  
}
