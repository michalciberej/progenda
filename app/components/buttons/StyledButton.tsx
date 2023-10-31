import { StyledButtonProps } from '@/typings';
import clsx from 'clsx';

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  primary,
  secondary,
  accent,
  fullWidth,
  disabled,
  func,
}) => {
  return (
    <button
      onClick={func}
      disabled={disabled}
      className={clsx(
        `flex
        justify-center
        items-center
        py-2
        outline-none
        ring-2
        ring-inset
        ring-transparent
        font-semibold
        rounded-md
        shadow-sm
        tracking-widest
        transition-colors`,
        fullWidth && 'w-full',
        primary &&
          'bg-primary_LM/80 enabled:hover:bg-primary_LM focus-visible:bg-primary_LM',
        secondary &&
          'bg-secondary_LM/80 enabled:hover:bg-secondary_LM focus-visible:bg-secondary_LM',
        accent &&
          'bg-accent_LM/80 enabled:hover:bg-accent_LM text-white focus-visible:bg-accent_LM',
        disabled && 'opacity-50 cursor-default'
      )}>
      {children}
    </button>
  );
};

export default StyledButton;
