import { clsxm } from '@/utils';
import { InputHTMLAttributes, ReactNode, Ref, forwardRef } from 'react';

export interface FormFieldType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  renderChild?: () => ReactNode;
}
const FormFieldComponent = (
  props: FormFieldType,
  ref: Ref<HTMLInputElement>
) => {
  const { label, placeholder, error, renderChild, ...rest } = props;
  return (
    <div className="h-16 md:h-12">
      <div className="flex items-start md:items-center flex-col md:flex-row">
        <label className="mr-5 w-14 text-sm font-medium text-gray-900">
          {label}
        </label>
        {renderChild ? (
          renderChild()
        ) : (
          <div className="flex flex-1 flex-col w-full">
            <input
              ref={ref}
              className={clsxm(
                'flex-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-1 outline-none block w-full p-2',
                {
                  'border-red-500': error && error !== '',
                }
              )}
              required
              placeholder={placeholder}
              {...rest}
            />
          </div>
        )}
      </div>
      {error && error !== '' ? (
        <p className="text-red-500 italic text-right text-xs">{error}</p>
      ) : null}
    </div>
  );
};

export const FormField = forwardRef(FormFieldComponent);
