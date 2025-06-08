import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Role } from '../../enums';
import { EMPTY, Observable } from 'rxjs';
import { role } from '../../store/selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule, MatMenuModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  role$: Observable<Role | undefined> = EMPTY;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.role$ = this.store.select(role);
  }
}
