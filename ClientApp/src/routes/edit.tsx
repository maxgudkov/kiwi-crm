import { useParams } from 'react-router-dom';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { getCustomer, updateCustomer } from '@/services/customerService';
import CustomerForm from '@/components/CustomerForm';
import { Suspense } from 'react';
import { Customer } from '@/lib/schemas';

export default function EditPage() {
  return (
    <div className="w-96 mx-auto">
      <h1 className="mb-4">Edit Customer</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Edit />
      </Suspense>
    </div>
  );
}

function Edit() {
  const { id } = useParams();
  const { data } = useSuspenseQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id!),
  });

  const { mutate } = useMutation({
    mutationFn: updateCustomer,
  });

  const onSubmit = (values: Omit<Customer, 'id'>) => {
    mutate({ ...values, id: +id! });
  };

  return <CustomerForm customer={data} onSubmit={onSubmit} />;
}
