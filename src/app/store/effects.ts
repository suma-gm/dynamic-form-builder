import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { submitForm } from "./actions";
import { concatMap, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DynamicFormsEffects {
  constructor(private readonly actions$: Actions, private readonly http: HttpClient){}
}
