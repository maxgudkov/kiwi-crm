import { Customer } from '@/lib/schemas';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import CustomerTableActionButton from './CustomerTableActionButton';
import CustomerTableSortHeader from './CustomerTableSortHeader';
import { getCustomerStatus } from '@/lib/statuses';

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <CustomerTableSortHeader column={column}>ID</CustomerTableSortHeader>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <CustomerTableSortHeader column={column}>Name</CustomerTableSortHeader>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <CustomerTableSortHeader column={column}>Email</CustomerTableSortHeader>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <CustomerTableSortHeader column={column}>Created</CustomerTableSortHeader>
    ),
    cell: ({ row }) => new Date(row.getValue('createdAt')).toLocaleDateString(),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <CustomerTableSortHeader column={column}>Status</CustomerTableSortHeader>
    ),
    cell: ({ row }) => getCustomerStatus(row.getValue('status')),
  },
  {
    accessorKey: 'opportunities',
    header: 'Opportunities',
    cell: ({ row }) =>
      row.getValue<Customer['opportunities']>('opportunities')?.length ?? 0,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CustomerTableActionButton row={row} />,
  },
];

interface CustomerTableProps {
  data: Customer[];
}

export default function CustomerTable({ data }: CustomerTableProps) {
  return <DataTable columns={columns} data={data} />;
}
