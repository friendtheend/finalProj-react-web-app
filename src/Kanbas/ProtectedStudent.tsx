import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedStudent({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role!=="STUDENT") {
    return null;
  } 
  return children
}
