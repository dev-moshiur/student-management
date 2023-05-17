import { Navigate, Outlet } from "react-router-dom";


export default function PrivateOutlet() {
  const role = localStorage.getItem('afghroll')

  const pass = role == "admin" ||  role ==  'chief admin' 
 

  return pass ? <Outlet /> : <Navigate to="/login" />;
  // return <Outlet />
}
