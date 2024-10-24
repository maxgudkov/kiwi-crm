import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Customer, CustomerSchema } from '@/lib/schemas';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomerStatus } from '@/lib/statuses';
import CustomFormButton from './CustomFormButton';
import CustomerFormOpportunities from './CustomerFormOpportunities';

const defaultValues: Customer = {
  name: '',
  email: '',
  phone: '',
  status: 'Active',
  opportunities: [],
};

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (values: Customer) => void;
}

export default function CustomerForm({
  customer,
  onSubmit,
}: CustomerFormProps) {
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      ...(customer ?? defaultValues),
    },
  });

  const handleSubmit = (values: Customer) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">
                    {CustomerStatus.Active}
                  </SelectItem>
                  <SelectItem value="NonActive">
                    {CustomerStatus.NonActive}
                  </SelectItem>
                  <SelectItem value="Lead">{CustomerStatus.Lead}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomerFormOpportunities />

        <CustomFormButton type="submit" loading={form.formState.isSubmitting}>
          Save
        </CustomFormButton>
      </form>
    </Form>
  );
}
