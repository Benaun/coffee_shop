import cn from "clsx"
import { ButtonHTMLAttributes, FC, ReactNode } from "react"

export interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string
  children: ReactNode
}

const Button: FC<IButton> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={cn(
        "self-center mt-3.5 bg-[#47AA52] w-[80%] py-3 font-light rounded-lg",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
