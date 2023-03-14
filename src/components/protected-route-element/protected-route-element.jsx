import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getUser } from "../../services/actions/user";

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch();
  const successRequest = useSelector((state) => state.user.success);
  const request = useSelector((state) => state.user.request);
  const [isRequestSent, setRequestSent] = useState(false);

  useEffect(() => {
    dispatch(getUser());
    setRequestSent(true)
  }, [dispatch]);

  if (!isRequestSent || request) {
    return null;
  }

  return successRequest ? element : <Navigate to="/login" />;
};
