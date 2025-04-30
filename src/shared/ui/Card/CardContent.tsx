import { forwardRef, HTMLAttributes } from "react"

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

export default CardContent
