import type { ReactNode } from 'react';

export type TProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};
