import { Event, deleteEvent, useAppDispatch } from '@/store';
import { convertEmailListToArray, formatISO8601 } from '@/utils';
import { ReactNode } from 'react';
import { Slide, toast } from 'react-toastify';

export type CalendarEventViewProps = {
  date: Date;
  event?: Event;
  changeViewMode: (isEdit: boolean) => void;
  onClose: () => void;
};

export function CalendarEventView({
  date,
  event,
  onClose,
  changeViewMode,
}: CalendarEventViewProps) {
  const dispacth = useAppDispatch();

  function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    dispacth(
      deleteEvent({
        date: formatISO8601(date),
        event_id: event?.id || '',
      })
    );
    toast.success(`Event deleted`, {
      position: toast.POSITION.TOP_CENTER,
      transition: Slide,
    });
    onClose();
  }

  return (
    <div className="mt-7 flex flex-col gap-y-3">
      <ListView label="Name" value={event?.name ?? ''} />
      <ListView label="Time" value={event?.time ?? ''} />
      <ListView
        label="Invitees"
        renderChild={() => (
          <div>
            {convertEmailListToArray(event?.invitees ?? '').map(
              (email, index) => (
                <div key={`list-email-${email}-${index}`}>
                  <div className="text-sm">- {email}</div>
                </div>
              )
            )}
          </div>
        )}
      />
      <div className="flex justify-end mt-5">
        <button
          type="button"
          className="w-[100px] rounded bg-primary px-4 py-1.5 text-center text-sm font-medium text-white shadow-md transition-all duration-150 hover:opacity-90"
          onClick={() => changeViewMode(false)}
        >
          Edit
        </button>
        <button
          type="button"
          className="w-[100px] ml-2 rounded bg-red-500 px-4 py-1.5 text-center text-sm font-medium text-white shadow-md transition-all duration-150 hover:opacity-90"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

type ListViewProps = {
  label: string;
  value?: string;
  renderChild?: () => ReactNode;
};
function ListView({ label, value, renderChild }: ListViewProps) {
  return (
    <div>
      <div className="flex items-start flex-col md:flex-row">
        <label className="mr-5 w-14 font-bold text-sm text-gray-900">
          {label}
        </label>
        {renderChild ? (
          renderChild()
        ) : (
          <div className="flex flex-1 text-sm flex-col w-full">{value}</div>
        )}
      </div>
    </div>
  );
}
