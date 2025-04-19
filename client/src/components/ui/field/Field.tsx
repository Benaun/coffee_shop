import cn from "clsx"
import { InputHTMLAttributes } from "react"
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
  RegisterOptions
} from "react-hook-form"

export interface IField<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
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
}: IField<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        validate: (
          value: PathValue<T, FieldPath<T>>,
          formValues: T
        ) => {
          if (!value?.toString().trim() && !rules?.required)
            return true

          // Если есть кастомная валидация в rules - выполняем ее
          if (typeof rules?.validate === "function") {
            return rules.validate(value, formValues)
          }
          return true
        }
      }}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, isTouched }
      }) => (
        <div className='flex flex-col items-center'>
          <input
            autoCapitalize='none'
            onChange={onChange}
            onBlur={onBlur}
            value={value?.toString() ?? ""}
            className={cn(
              "text-black text-base w-[80%] border rounded-lg pb-4 pt-2.5 px-4 my-1.5 outline-none",
              error && isTouched
                ? "border-red-500"
                : "border-gray-400",
              className
            )}
            {...rest}
          />
          {error && isTouched && (
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
