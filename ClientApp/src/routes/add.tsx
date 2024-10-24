import CustomerForm from '@/components/CustomerForm';
import { Customer } from '@/lib/schemas';
import { addCustomer } from '@/services/customerService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function AddPage() {
  return (
    <div className="w-96 mx-auto">
      <h1 className="mb-4">New Customer</h1>
      <Add />
    </div>
  );
}

function Add() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addCustomer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] }),
  });

  const onSubmit = (values: Omit<Customer, 'id'>) => {
    mutate(values);
    navigate('/');
  };

  return <CustomerForm onSubmit={onSubmit} />;
}
