import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getUser } from "../../services/actions/user";

export const ProtectedRouteElement = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(accessToken));
    setUserLoaded(true);
  }, [dispatch, accessToken]);

  const successRequest = useSelector((state) => state.user.success);

  if (!isUserLoaded) {
    return null;
  }

  return successRequest ? element : <Navigate to="/login" />;
}
