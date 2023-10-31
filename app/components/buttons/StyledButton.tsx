import clsx from 'clsx';

interface StyledButtonProps {
  children: string | JSX.Element;
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  fullWidth?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  primary,
  secondary,
  accent,
  fullWidth,
}) => {
  return (
    <button
      className={clsx(
        `flex
        justify-center
        items-center
        py-2
        font-semibold
        rounded-md
        shadow-sm
        tracking-widest
        transition-colors`,
        fullWidth && 'w-full',
        primary && 'bg-primary_LM/80 hover:bg-primary_LM',
        secondary && 'bg-secondary_LM/80 hover:bg-secondary_LM',
        accent && 'bg-accent_LM/80 hover:bg-accent_LM text-white'
      )}>
      {children}
    </button>
  );
};

export default StyledButton;
