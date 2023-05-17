


import { Navigate, Outlet } from "react-router-dom";


export default function PrivateOutlet() {
  const role = localStorage.getItem('afghroll')
 

  // chief
  return role == 'chief admin' ? <Outlet /> : <Navigate to="/login" />;
  // return <Outlet />
}
