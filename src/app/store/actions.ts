import { createAction, props } from "@ngrx/store";
import { DynamicForm } from "../models/form.model";
import { Role } from "../enums";

export enum ActionTypes {
  SetRole = '[AppState] Set role',
  SetCurrentForm = '[AppState] Set current form',
  UpdateForms = '[AppState] Update forms',
  DeleteForms = '[AppState] Delete forms',
  SubmitForm = '[AppState] Submit form',
};

export const setRole = createAction(ActionTypes.SetRole, props<{ role: Role }>());

export const setCurrentForm = createAction(ActionTypes.SetCurrentForm, props<{ currentFormId: string }>());

export const updateForms = createAction(ActionTypes.UpdateForms, props<{ forms: DynamicForm[] }>());

export const deleteForms = createAction(ActionTypes.DeleteForms, props<{ formIds: string[] }>());

export const submitForm = createAction(ActionTypes.SubmitForm, props<{ form: DynamicForm }>());
