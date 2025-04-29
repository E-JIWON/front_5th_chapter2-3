import { forwardRef, HTMLAttributes } from "react"

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string
}
const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))
Table.displayName = "Table"

export default Table
