import { useState } from "react";

export type SelectOption<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  selected: T;
  label?: string;
  defaultValue?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  required?: boolean;
};

export default function SelectDropdown<T extends string | number>({
  selected,
  options,
  onChange,
  label,
  disabled,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label ?? label ?? "";

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="pl-1 col-start-1 row-start-1 flex items-center gap-3 pr-6">
          <span className="block truncate text-sm">{selectedLabel}</span>
        </span>
        <svg className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
          {options.map((option) => (
            <li
              key={`select-opt-${String(option.value)}`}
              className="relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 hover:bg-gray-100 select-none"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center">
                <span className="text-sm ml-3 block truncate font-normal">{option.label}</span>
              </div>
              {selected === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
