import { memo } from 'react';

export interface BlankLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: BlankLayoutProps) => <>{children}</>);
