import { InputType } from "../enums";

export interface DynamicField {
  id: string;
  label: string;
  required: boolean;
  type: InputType;
  helpText?: string;
  options?: string[];
  validations?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface DynamicForm {
  id: string;
  name: string;
  fields: DynamicField[];
}

export interface FormRow {
  id: string;
  fields: DynamicField[];
}
