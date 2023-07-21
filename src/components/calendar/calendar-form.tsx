import { Event, addEvent, editEvent, useAppDispatch } from '@/store';
import {
  formatISO8601,
  generateRandomId,
  generateTimeOptions,
  getRandomColor,
} from '@/utils';
import { Dispatch, Ref, SetStateAction, useReducer } from 'react';
import { Slide, toast } from 'react-toastify';
import {
  FieldUnion,
  FormField,
  TimeSelect,
  eventFormReducer,
  initialEventFormState,
  validateForm,
} from '..';

export type CalendarFormProps = {
  onClose: () => void;
  changeViewMode: (isEdit: boolean) => void;
  setCurrentEvent: Dispatch<SetStateAction<Event | undefined>>;
  date?: Date;
  event?: Event;
  focusRef?: Ref<HTMLInputElement>;
};

export function CalendarForm({
  date = new Date(),
  event,
  setCurrentEvent,
  onClose,
  changeViewMode,
  focusRef,
}: CalendarFormProps) {
  const dateString = formatISO8601(date);
  const dispatch = useAppDispatch();

  const options = generateTimeOptions();

  const [stateForm, dispatchStateForm] = useReducer(eventFormReducer, {
    ...initialEventFormState,
    values: {
      ...initialEventFormState.values,
      ...event,
    },
  });

  function onChange(field: FieldUnion) {
    dispatchStateForm({
      ...field,
      type: 'change-field',
      isEnableValidate: true,
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm(stateForm.values);
    const hasError = Object.values(errors).some((value) => Boolean(value));

    if (!hasError) {
      const formattedInvitees = stateForm.values.invitees
        .split(',')
        .map((email: string) => email.trim())
        .join(', ');
      if (!event) {
        dispatch(
          addEvent({
            date: dateString,
            event: {
              color: getRandomColor(),
              id: generateRandomId(),
              name: stateForm.values.name,
              time: stateForm.values.time,
              invitees: formattedInvitees,
            },
          })
        );
        toast.success(`Event added`, {
          position: toast.POSITION.TOP_CENTER,
          transition: Slide,
        });
      } else {
        dispatch(
          editEvent({
            date: dateString,
            event: {
              id: event.id,
              name: stateForm.values.name,
              invitees: formattedInvitees,
              time: stateForm.values.time,
            },
          })
        );
        toast.success(`Event updated`, {
          position: toast.POSITION.TOP_CENTER,
          transition: Slide,
        });
        setCurrentEvent({
          ...event,
          ...stateForm.values,
          invitees: formattedInvitees,
        });
      }
      onClose();
    } else {
      dispatchStateForm({
        type: 'change-error',
        value: errors,
      });
    }
  }

  return (
    <div className="mt-7 flex flex-col gap-y-3">
      <FormField
        ref={focusRef}
        label="Name"
        value={stateForm.values.name}
        error={stateForm.errors.name}
        onChange={(e) => {
          e.preventDefault();
          onChange({ name: 'name', value: e.target.value });
        }}
        placeholder="Event Name"
      />
      <FormField
        label="Time"
        error={stateForm.errors.time}
        renderChild={() => (
          <TimeSelect
            onSelect={(value) => {
              onChange({ name: 'time', value });
            }}
            value={stateForm.values.time}
            options={options}
          />
        )}
      />
      <FormField
        label="Invitees"
        value={stateForm.values.invitees}
        error={stateForm.errors.invitees}
        placeholder="Invitees email (Separate by comma)"
        onChange={(e) => {
          e.preventDefault();
          onChange({ name: 'invitees', value: e.target.value });
        }}
      />
      <div className="flex justify-end mt-5">
        {event ? (
          <button
            type="button"
            className="w-[100px] mr-2 rounded bg-red-500 px-4 py-1.5 text-center text-sm font-medium text-white shadow-md transition-all duration-150 hover:opacity-90"
            onClick={() => changeViewMode(true)}
          >
            Cancel
          </button>
        ) : null}
        <button
          type="button"
          className="w-[100px] rounded bg-primary px-4 py-1.5 text-center text-sm font-medium text-white shadow-md transition-all duration-150 hover:opacity-90"
          onClick={onSubmit}
        >
          {!event ? 'Save' : 'Update'}
        </button>
      </div>
    </div>
  );
}
