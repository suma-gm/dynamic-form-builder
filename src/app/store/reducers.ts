import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { DynamicForm } from "../models/form.model";
import { createReducer, Action, on } from "@ngrx/store";
import * as featureActions from "./actions";
import { Role } from "../enums";

export interface AppState {
  currentFormId: string | undefined;
  forms: EntityState<DynamicForm>;
  role: Role | undefined;
}

export const formsAdapter: EntityAdapter<DynamicForm> = createEntityAdapter<DynamicForm>({
  selectId: (form) => form.id,
});

export const initialAppState: AppState = {
  currentFormId: undefined,
  forms: formsAdapter.getInitialState({}),
  role: undefined,
};

const featureReducer = createReducer(
  initialAppState,
  on(featureActions.setRole, (state, { role }): AppState => ({ ...state, role })),
  on(featureActions.setCurrentForm, (state, { currentFormId }): AppState => ({ ...state, currentFormId })),
  on(featureActions.updateForms, (state, { forms }): AppState => ({ ...state, forms: formsAdapter.addMany(forms, state.forms) })),
  on(featureActions.deleteForms, (state, { formIds }): AppState => ({ ...state, forms: formsAdapter.removeMany(formIds, state.forms) })),
);

export function reducer(state: AppState | undefined, action: Action) {
  return featureReducer(state, action);
}
