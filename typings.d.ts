export interface StyledButtonProps {
  children: string | React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  func?: (string) => void;
}

export interface StyledLinkProps {
  src: string;
  children: string;
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  fullWidth?: boolean;
}

export interface TaskData {
  title: string;
  body: string;
  date: string;
}
