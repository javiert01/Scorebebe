import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }
  helper = new JwtHelperService();
  ngOnInit() {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0);
      });

      const token = localStorage.getItem('token');
      if (token !== null) {
        if (this.helper.isTokenExpired(token)) {
          this.authService.logoutUser();
        } else {
          console.log('token válido');
        }
      }
  }
}
