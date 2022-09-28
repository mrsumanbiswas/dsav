import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  authState!: boolean;
  data: any;

  constructor(public auth: AuthenticationService) {
    this.authState = this.auth.isLogedIn();
  }

  ngOnInit(): void {
    this.authState = this.auth.isLogedIn()
    this.data = {
      displayName: localStorage.getItem('displayName'),
      photoURL: localStorage.getItem('photoURL')
    }
  }
}
