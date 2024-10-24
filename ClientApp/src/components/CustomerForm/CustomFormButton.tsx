import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

interface CustomFormButtonProps {
  loading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button';
  onClick?: () => void;
}

export default function CustomFormButton({
  type = 'button',
  loading,
  disabled,
  onClick,
  children,
}: React.PropsWithChildren<CustomFormButtonProps>) {
  return (
    <Button disabled={disabled || loading} type={type} onClick={onClick}>
      {loading ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
