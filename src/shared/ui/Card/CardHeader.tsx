import { forwardRef, HTMLAttributes } from "react"

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
))
CardHeader.displayName = "CardHeader"

export default CardHeader
