import { List, Task } from '@prisma/client';

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
  id?: string;
  list?: string;
}

export type Variant = 'today' | 'tomorrow' | 'total';

export interface TaskToUpdate {
  title: string;
  body: string;
  date: string;
  list?: List;
  id?: string;
}

export interface ListData {
  title: string;
  color: string;
}

interface TaskWithList extends Task {
  list?: List;
}

interface ListWithTaskCount extends List {
  _count: { task: number };
}
