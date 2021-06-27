import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
  classNames?: string
}

export function Button({
  isOutlined = false,
  classNames,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button ${classNames} ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  )
}
