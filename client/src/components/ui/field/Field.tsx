import cn from "clsx"
import { InputHTMLAttributes } from "react"
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions
} from "react-hook-form"

export interface IField<T extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onChangeText" | "value"
  > {
  control: Control<T>
  name: FieldPath<T>
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >
}

const Field = <T extends Record<string, unknown>>({
  control,
  rules,
  name,
  className,
  ...rest
}: IField<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error }
      }) => (
        <div className='flex flex-col items-center'>
          <input
            autoCapitalize='none'
            onChange={onChange}
            onBlur={onBlur}
            value={(value || " ").toString()}
            className={cn(
              "text-black text-base w-[80%] border rounded-lg pb-4 pt-2.5 px-4 my-1.5 outline-none",
              error ? "border-red-500" : "border-gray-400",
              className
            )}
            {...rest}
          />
          {error && (
            <span className='text-red-500 text-sm'>
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  )
}

export default Field
