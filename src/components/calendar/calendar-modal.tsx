import { Event } from '@/store';
import { currentDate } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useRef, useState } from 'react';
import { CalendarForm } from '..';
import { CalendarEventView } from './calendar-event-view';

export type CalendarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  date?: Date;
  event?: Event;
  usedColors?: string[];
};

export function CalendarModal({
  isOpen,
  onClose,
  date,
  event,
  usedColors,
}: CalendarModalProps) {
  const focusRef = useRef<HTMLInputElement | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | undefined>(event);
  const [isViewMode, setIsViewMode] = useState<boolean>(!!event);

  const dateString = date
    ? date.toLocaleDateString('en', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  function changeViewMode(isView: boolean) {
    setIsViewMode(isView);
  }

  function handleClose() {
    if (!event) {
      onClose();
    } else {
      setIsViewMode(true);
    }
  }

  const isPastDate = (date ?? new Date()).getDate() < currentDate.getDate();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={onClose}
        initialFocus={focusRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-xl transform rounded-2xl bg-white py-6 px-10 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-base md:text-lg font-medium leading-6 text-gray-900 mb-3"
                >
                  {isViewMode
                    ? `View Event ${dateString}`
                    : event
                    ? `Edit Event ${dateString}`
                    : `Add Event to ${dateString}`}
                  {isPastDate && !isViewMode && !event ? (
                    <div className="text-red-500 italic text-xs">
                      *You are adding event on a past date
                    </div>
                  ) : null}
                </Dialog.Title>
                <button className="absolute right-8 top-5" onClick={onClose}>
                  <XMarkIcon className="w-7 h-7" />
                </button>
                {!isViewMode ? (
                  <CalendarForm
                    focusRef={focusRef}
                    date={date}
                    event={currentEvent}
                    setCurrentEvent={setCurrentEvent}
                    changeViewMode={changeViewMode}
                    onClose={handleClose}
                    usedColors={usedColors}
                  />
                ) : (
                  <CalendarEventView
                    event={currentEvent}
                    date={date ?? currentDate}
                    changeViewMode={changeViewMode}
                    onClose={onClose}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
