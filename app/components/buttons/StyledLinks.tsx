import clsx from 'clsx';
import Link from 'next/link';
import { StyledLinkProps } from '@/typings';

const StyledLink: React.FC<StyledLinkProps> = ({
  src,
  children,
  primary,
  secondary,
  accent,
  fullWidth,
}) => {
  return (
    <Link
      href={src}
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
        secondary && 'bg-secondary_LM/80 hover:bg-secondary_LM ',
        accent && 'bg-accent_LM/80 hover:bg-accent_LM'
      )}>
      {children}
    </Link>
  );
};

export default StyledLink;
