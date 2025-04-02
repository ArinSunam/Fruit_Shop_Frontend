import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const { user } = useSelector((store) => store.userInfo);

  return user === null ? (
    <Navigate to={"/login"} />
  ) : user.isAdmin ? (
    <Outlet />
  ) : (
    <h1>you are not authorized</h1>
  );
};

export default AdminRoutes;