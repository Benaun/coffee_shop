import { FC } from "react"
import { Control } from "react-hook-form"

import Field from "@/components/ui/field/Field"

import { IAuthFormData } from "@/types/auth.interface"

import { validEmail } from "@/utils/email.regex"

interface IAuthFields {
  control: Control<IAuthFormData>
}

const AuthFields: FC<IAuthFields> = ({ control }) => {
  return (
    <>
      <Field<IAuthFormData>
        type='email'
        placeholder='Введите email'
        control={control}
        name='email'
        rules={{
          required: "Email обязателен",
          pattern: {
            value: validEmail,
            message: "Попробуйте снова, невалидный email"
          }
        }}
      />
      <Field<IAuthFormData>
        type='text'
        placeholder='Введите пароль'
        control={control}
        name='password'
        rules={{
          required: "Пароль обязателен",
          minLength: {
            value: 6,
            message: "Длинна не должна быть меньше 6 символов"
          }
        }}
      />
    </>
  )
}

export default AuthFields
