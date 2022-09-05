import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);

  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { credentials: { username: username, password: password } }})
    const accessToken = data.authenticate.accessToken
    await authStorage.setAccessToken(accessToken)
    apolloClient.resetStore();

    return accessToken;
  };

  return [signIn, result];
}

export default useSignIn;