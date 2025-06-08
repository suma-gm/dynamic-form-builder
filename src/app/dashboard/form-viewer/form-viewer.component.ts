import { EMPTY, Observable } from 'rxjs';
import { Component, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { forms } from '../../store/selectors';
import { FormFieldsComponent } from "../../shared/form-fields/form-fields.component";
import { DynamicForm } from '../../models/form.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormFieldsComponent,
    MatCardModule,
],
  templateUrl: './form-viewer.component.html',
  styleUrl: './form-viewer.component.scss'
})
export class FormViewerComponent implements OnInit {
  dynamicForms = signal<DynamicForm[]>([]);

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(forms).subscribe(dynForms => this.dynamicForms.set([...dynForms]));
  }
}
