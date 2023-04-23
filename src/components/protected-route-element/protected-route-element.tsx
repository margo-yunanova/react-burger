import React, { FC, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getUser } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../utils/types';

type TProtectedRouteElement = {
  element: React.ReactElement;
}

export const ProtectedRouteElement: FC<TProtectedRouteElement> = ({ element }) => {
  const dispatch = useAppDispatch();
  const successRequest = useAppSelector((state) => state.user.success);
  const request = useAppSelector((state) => state.user.request);
  const isLogout = useAppSelector((state) => state.user.isLogout);
  const [isRequestSent, setRequestSent] = useState(false);

  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
    setRequestSent(true);
  }, [dispatch]);

  if (!isRequestSent || request) {
    return null;
  }

  if (!successRequest || isLogout) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return element;
};
