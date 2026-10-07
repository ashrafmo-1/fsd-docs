import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Header = {
  headName: string;
  className?: string;
};

type TableBuilderProps<T> = {
  tableHeader?: ReactNode;
  tableHeadNames: Header[];
  tableData: T[];
  renderRow: (item: T, index: number) => ReactNode;
  emptyState?: ReactNode;
};

export function TableBuilder<T>({
  tableHeader,
  tableHeadNames,
  tableData,
  renderRow,
  emptyState,
}: TableBuilderProps<T>) {
  return (
    <div className="overflow-hidden rounded-sm border border-hairline bg-canvas">
      {tableHeader ? (
        <div className="border-b border-hairline px-3 py-2">{tableHeader}</div>
      ) : null}
      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="bg-[#0A319D14] hover:bg-[#0A319D14]">
            {tableHeadNames.map((column) => (
              <TableHead key={column.headName} className={cn(column.className)}>
                {column.headName}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={tableHeadNames.length}
                className="h-40 whitespace-normal"
              >
                {emptyState ?? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-sm font-semibold text-ink">No records</p>
                    <p className="mt-1 text-sm text-body-muted">
                      Nothing has been added yet.
                    </p>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item, index) => renderRow(item, index))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
