import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
      this.authService.getLogOut();
      this.route.navigate(['']);
  }


}
