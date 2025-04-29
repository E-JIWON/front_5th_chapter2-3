import { forwardRef, HTMLAttributes } from "react"

interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))
TableHeader.displayName = "TableHeader"

export default TableHeader
