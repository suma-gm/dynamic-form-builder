import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { InputType, Role } from '../../enums';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';
import { DynamicField } from '../../models/form.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldsComponent } from '../../shared/form-fields/form-fields.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { updateForms } from '../../store/actions';
import { role } from '../../store/selectors';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DragDropModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    FormFieldsComponent,
  ],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent implements OnInit {
  selectedField = signal<DynamicField | undefined>(undefined);
  savedFields: DynamicField[] = [];
  fieldForm = new FormGroup({
    label: new FormControl('', Validators.required),
    required: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    helpText: new FormControl(''),
    options: new FormControl(''),
  });
  isAdmin = signal<boolean>(false);
  readonly inputType = InputType;

  fieldTypes = [
    { type: InputType.Text, label: 'Text Input', icon: 'text_fields' },
    { type: InputType.TextArea, label: 'Text Area', icon: 'text_fields' },
    { type: InputType.Dropdown, label: 'Dropdown', icon: 'more_vert' },
    { type: InputType.Checkbox, label: 'Checkbox', icon: 'checkbox' },
    { type: InputType.Radio, label: 'Radio', icon: 'checkbox' },
    { type: InputType.Date, label: 'Date Picker', icon: 'access_time' }
  ];

  formFields: DynamicField[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(role).subscribe(role => {
      this.isAdmin.set(role === Role.Admin);
    });
  }

  onDropToCanvas(event: CdkDragDrop<any[]>) {
    if (event.previousContainer.data === event.container.data) return;

    const droppedField = event.item.data;
    const newField = { ...droppedField, id: uuidv4() };

    this.formFields.push(newField);
  }

  onSelectField({ id }: { id: string }) {
    this.selectedField.set(this.formFields[this.formFields.findIndex(field => field.id == id)]);
    const { helpText, label, options, required, type } = this.selectedField() || {};
    this.fieldForm.setValue({
      helpText: helpText || '',
      label: label || '',
      options: options?.toString() || '',
      required: required ? 'true' : 'false',
      type: type  || '',
    });
  }

  onDeleteField({ id }: { id: string }) {
    const deleteFieldIndex = this.formFields.findIndex(field => field.id === id);
    this.formFields.splice(deleteFieldIndex, 1);
  }

  onSaveField(id: string | undefined) {
    if(!this.selectedField() || !id) return;
    const fieldIndex = this.savedFields.findIndex(field => field.id === id);
    const { label, required, options, type, helpText } = this.fieldForm.value;
    if (label && required && type && options !== null && helpText !== null) {
      const updateField = { id, label, required: !!required, options: options ? [options] : undefined, type: <InputType>type, helpText };
      if(fieldIndex === -1) {
        this.savedFields.push(updateField);
      } else {
        this.savedFields.fill(updateField, fieldIndex);
      }
    }
    alert('Saved the field');
    this.selectedField.set(undefined);
    this.fieldForm.reset();
  }

  onSaveForm() {
    let formName = prompt("Please enter the form name:");
    this.store.dispatch(updateForms({ forms: [{ id: uuidv4(), name: formName || '', fields: this.savedFields }] }));
    alert('Saved the form - check the Form View');
    this.selectedField.set(undefined);
    this.fieldForm.reset();
    this.savedFields = [];
  }
}
