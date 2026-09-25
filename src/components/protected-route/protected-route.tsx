import { getUserSelector, getIsAuthCheckedSelector } from '@slices/user-slice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '@services/store';

import type { TProtectedRouteProps } from './type';
import type { ReactNode } from 'react';

export function ProtectedRoute({
  children,
  onlyUnAuth,
}: TProtectedRouteProps): ReactNode {
  const user = useSelector(getUserSelector);
  const isAuthChecked = useSelector(getIsAuthCheckedSelector);
  const location = useLocation();

  const state = location.state as { from?: string } | null;
  const from = state?.from ?? '/';

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    return <Navigate to={from} replace />;
  }
  return children;
}
