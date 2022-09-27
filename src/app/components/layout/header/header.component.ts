import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountComponent } from '../../auth/account/account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search_quary!: string;
  window_width!: number;

  ngOnInit() {
    this.window_width = window.innerWidth;
  }

  openDialog(): void {
    this.dialog.open(AccountComponent, {
      width: '250px',
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '1000ms',
      hasBackdrop: true
    });
  }

  constructor(private dialog: MatDialog) { }
}
