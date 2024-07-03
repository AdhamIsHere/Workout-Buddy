import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, name, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
      return;
    }
    if (response.ok) {
      // save token to local storage
      localStorage.setItem("user", JSON.stringify(data));

      // update auth context
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
