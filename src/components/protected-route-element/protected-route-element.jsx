import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { getUser } from "../../services/actions/user";

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch();
  const successRequest = useSelector((state) => state.user.success);
  const request = useSelector((state) => state.user.request);
  const [isRequestSent, setRequestSent] = useState(false);

  const location = useLocation()

  useEffect(() => {
    dispatch(getUser());
    setRequestSent(true)
  }, [dispatch]);

  if (!isRequestSent || request) {
    return null;
  }

  if(!successRequest) {
    localStorage.setItem('protectLocation', JSON.stringify(location))
    return <Navigate to='/login' />
  }

  return element
};
