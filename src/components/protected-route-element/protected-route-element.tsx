import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { getUser } from '../../services/actions/user';

type TProtectedRouteElement = {
  element: React.ReactElement;
}

export const ProtectedRouteElement: FC<TProtectedRouteElement> = ({ element }) => {
  const dispatch = useDispatch();
  const successRequest = useSelector((state: any) => state.user.success);
  const request = useSelector((state: any) => state.user.request);
  const [isRequestSent, setRequestSent] = useState(false);

  const location = useLocation();

  useEffect(() => {
    dispatch(getUser() as any);
    setRequestSent(true);
  }, [dispatch]);

  if (!isRequestSent || request) {
    return null;
  }

  if (!successRequest) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return element;
};
