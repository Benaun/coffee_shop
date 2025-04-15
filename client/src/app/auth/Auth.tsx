"use client"

import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import Button from "@/components/ui/button/Button"

import { IAuthFormData } from "@/types/auth.interface"

import AuthFields from "./AuthFields"

const AuthComponent: FC = () => {
  const [isRegistration, setIsRegistration] = useState(false)
  const { handleSubmit, control } = useForm<IAuthFormData>({
    mode: "onChange"
  })

  const onSubmit: SubmitHandler<IAuthFormData> = data => {
    console.log(data)
  }
  return (
    <div className='container items-center text-center'>
      <h1 className=' text-black text-3xl font-medium mb-8'>
        {isRegistration ? "Регистрация" : "Вход"}
      </h1>
      <AuthFields control={control} />
      <Button
        className='text-white'
        onClick={handleSubmit(onSubmit)}
      >
        {"Подтвердить"}
      </Button>
      <button
        onClick={() => setIsRegistration(!isRegistration)}
        className=' text-black text-base mt-6'
      >
        <span>
          {isRegistration
            ? "Уже есть аккаунт?"
            : "Нет аккаунта?"}
        </span>
        <span className='text-[#47AA52] ml-2'>
          {isRegistration ? "Войти" : "Регистрация"}
        </span>
      </button>
    </div>
  )
}

export default AuthComponent
