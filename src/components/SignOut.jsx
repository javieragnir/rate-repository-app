import React from "react";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { Navigate } from "react-router-native";

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();


  useEffect(() => {
    const removeToken = async () => {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
    }

    removeToken()
  }, []);

  return (
    <Navigate to="/" replace />
  )
}

export default SignOut;