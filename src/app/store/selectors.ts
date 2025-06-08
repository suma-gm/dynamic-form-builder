import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, formsAdapter } from "./reducers";

const { selectAll } = formsAdapter.getSelectors();

const appState = createFeatureSelector<AppState>('app');

const currentFormId = createSelector(appState, state => state.currentFormId);

export const forms = createSelector(appState, state => selectAll(state.forms));

export const role = createSelector(appState, state => state.role);

export const currentForm = createSelector(forms, currentFormId, (allForms, curFormId) => {
    return allForms.find(({ id }) => id === curFormId);
  }
);
