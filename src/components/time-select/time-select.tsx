import { clsxm } from '@/utils';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

export type TimeSelectProps = {
  value: string;
  onSelect: (val: string) => void;
  options: string[];
  error?: string;
};

export function TimeSelect({
  value,
  error,
  onSelect,
  options,
}: TimeSelectProps) {
  return (
    <Listbox
      value={value}
      onChange={onSelect}
      className="relative z-30"
      as="div"
    >
      <div className="relative">
        <Listbox.Button
          className={clsxm(
            'relative w-32 text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-1 outline-none block py-2 pl-2 pr-10',
            {
              'border-red-500': error && error !== '',
              'text-gray-400': !value || value === '',
            }
          )}
        >
          <span className="block truncate">{value || 'Choose'}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute left-0 z-30 max-h-60 w-28 overflow-auto bg-white py-1 text-gray-500 shadow-md outline-none">
            {options.map((time, index) => (
              <Listbox.Option
                key={`${index}-${time}`}
                value={time}
                className="relative cursor-pointer select-none px-2 py-1 hover:bg-gray-200 text-sm"
              >
                {time}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
