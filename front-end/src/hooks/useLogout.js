import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    // remove token from local storage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
