import CustomerTable from '@/components/CustomerTable';
import { Button } from '@/components/ui/button';
import { Customer } from '@/lib/schemas';
import { getCustomers } from '@/services/customerService';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IndexPage() {
  return (
    <>
      <h1>Customers</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Index />
      </Suspense>
    </>
  );
}

function Index() {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  return (
    <>
      <CustomerTable data={data} />
      <Button className="mt-4" onClick={() => navigate('/add')}>
        Add Customer
      </Button>
    </>
  );
}
