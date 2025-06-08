import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DynamicField } from '../../models/form.model';
import { InputType, Role } from '../../enums';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-form-fields',
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
  ],
  templateUrl: './form-fields.component.html',
  styleUrl: './form-fields.component.scss'
})
export class FormFieldsComponent {
  @Input() field: DynamicField | undefined;
  @Input() value: string = '';
  @Input() isAdmin: boolean = false;
  @Output() delete = new EventEmitter<{id: string}>();
  @Output() selectField = new EventEmitter<{id: string}>();

  readonly inputType = InputType;

  constructor(private store: Store<AppState>) {}

  onSelectField(id: string | undefined) {
    if(!id) return;
    this.selectField.emit({ id });
  }

  onDeleteField(id: string | undefined) {
    if(!id) return;
    this.delete.emit({ id });
  }
}
