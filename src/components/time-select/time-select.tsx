import { Listbox } from '@headlessui/react';

export type TimeSelectProps = {
  value: string;
  onSelect: (val: string) => void;
  options: string[];
};

export function TimeSelect({ value, onSelect, options }: TimeSelectProps) {
  return (
    <Listbox
      value={value}
      onChange={onSelect}
      className="relative z-30"
      as="div"
    >
      <Listbox.Button className="flex-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-1 outline-none block w-full p-2">
        {value}
      </Listbox.Button>
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
    </Listbox>
  );
}
