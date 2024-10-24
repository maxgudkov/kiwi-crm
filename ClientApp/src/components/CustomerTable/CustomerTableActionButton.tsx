import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Customer } from '@/lib/schemas';
import { removeCustomer } from '@/services/customerService';
import { Button } from '../ui/button';

interface CustomerTableActionButtonProps {
  row: Row<Customer>;
}

export default function CustomerTableActionButton({
  row,
}: CustomerTableActionButtonProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['removeCustomer'],
    mutationFn: () => removeCustomer(row.original.id!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link to={`/${row.original.id}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => mutate()}>Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
