import { forwardRef, HTMLAttributes } from "react"

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
))
TableCell.displayName = "TableCell"

export default TableCell
