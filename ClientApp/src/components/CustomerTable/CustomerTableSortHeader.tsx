import { Customer } from '@/lib/schemas';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';
import { Button } from '../ui/button';

export default function CustomerTableSortHeader({
  children,
  column,
}: React.PropsWithChildren<{ column: Column<Customer, unknown> }>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}
