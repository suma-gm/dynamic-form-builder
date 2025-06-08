import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { FormBuilderComponent } from './form-builder.component';
import { updateForms } from '../../store/actions';
import { DynamicForm } from '../../models/form.model';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let store: MockStore;
  let fixture: ComponentFixture<FormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderComponent],
      providers: [provideMockStore()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBuilderComponent);
    store = TestBed.inject(Store) as MockStore;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('onSaveForm', () => {
    it('should dispatch action', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const action = updateForms({forms: [<DynamicForm>{ id: '12' }]});
      component.onSaveForm();
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    })
  });
});
