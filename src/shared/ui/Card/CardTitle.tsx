import { forwardRef, HTMLAttributes } from "react"

interface CardTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(({ className = "", ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"

export default CardTitle
