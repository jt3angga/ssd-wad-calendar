import { Event } from '@/store';
import { validateEmailList } from '@/utils';

export interface Fields extends Omit<Event, 'color' | 'id'> {}

export type Errors = Partial<{
  [FieldKey in keyof Fields]: string;
}>;

export type FieldUnion = {
  [FieldName in keyof Fields]: {
    name: FieldName;
    value: Fields[FieldName];
  };
}[keyof Fields];

export interface State {
  values: Fields;
  errors: Errors;
}

export type Payload =
  | ({ type: 'change-field'; isEnableValidate?: boolean } & FieldUnion)
  | {
      type: 'change-error';
      value: Errors;
    };

export const initialEventFormState: State = {
  values: {
    name: '',
    time: '',
    invitees: '',
  },
  errors: {
    name: '',
    time: '',
    invitees: '',
  },
};

export function eventFormReducer(state: State, payload: Payload) {
  if (payload.type === 'change-field') {
    const values = {
      ...state.values,
      [payload.name]: payload.value,
    };
    return {
      ...state,
      values,
      errors: payload.isEnableValidate
        ? {
            ...state.errors,
            [payload.name]: validateForm(values)[payload.name],
          }
        : state.errors,
    };
  }
  if (payload.type === 'change-error') {
    return {
      ...state,
      errors: payload.value,
    };
  }
  return state;
}

export function validateForm(values: Fields) {
  const errors: Errors = {};
  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Name field is required';
  }
  if (!values.time) {
    errors.time = 'Time field is required';
  }
  if (!values.invitees) {
    errors.invitees = 'Invitees field is required';
  } else if (!validateEmailList(values.invitees)) {
    errors.invitees =
      'Enter unique & valid email addresses and separated by commas';
  }
  return errors;
}
