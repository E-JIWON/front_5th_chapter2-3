import { forwardRef, HTMLAttributes } from "react"

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
))
TableBody.displayName = "TableBody"

export default TableBody
