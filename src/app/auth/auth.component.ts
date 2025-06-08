import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Role } from '../enums';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { setRole } from '../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  authForm: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(\+91-|\+91|0)?\d{10}$|[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[a-z]$/),
    ]),
    role: new FormControl(null, [ Validators.required ]),
  });
  readonly role = Role;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {

  }

  onSubmit() {
    this.store.dispatch(setRole({ role: this.authForm.get('role')?.value }));
    this.router.navigate(['/dashboard']);
  }
}
