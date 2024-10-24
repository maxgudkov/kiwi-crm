import { useFieldArray, useFormContext } from 'react-hook-form';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { OpportunityStatus } from '@/lib/statuses';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '../ui/form';
import { Customer } from '@/lib/schemas';

export default function CustomerFormOpportunities() {
  const { control } = useFormContext<Customer>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'opportunities',
  });

  return (
    <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-3">
      <FormLabel>Opportunities</FormLabel>
      {fields.map(({ id }, i) => (
        <div className="flex gap-2 items-end" key={id}>
          <FormField
            control={control}
            name={`opportunities.${i}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>&nbsp;</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`opportunities.${i}.status`}
            render={({ field }) => (
              <FormItem className="w-1/3 shrink-0">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="New">{OpportunityStatus.New}</SelectItem>
                    <SelectItem value="ClosedWon">
                      {OpportunityStatus.ClosedWon}
                    </SelectItem>
                    <SelectItem value="ClosedLost">
                      {OpportunityStatus.ClosedLost}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage>&nbsp;</FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="button"
            className="w-9 shrink-0 self-center mt-1"
            variant="outline"
            size="icon"
            onClick={() => remove(i)}
          >
            <Cross1Icon className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="self-center"
        onClick={() => append({ status: 'New', name: '' })}
      >
        Add
      </Button>
    </div>
  );
}
