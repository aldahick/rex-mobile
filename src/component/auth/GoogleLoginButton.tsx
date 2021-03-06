import React from "react";
import { GoogleSignin, GoogleSigninButton } from "@react-native-community/google-signin";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { View } from "react-native";
import { IAuthClientType, IAuthToken, IMutation, IMutationCreateAuthTokenGoogleArgs } from "../../graphql/types";
import { callMutationSafe } from "../../util/graphql";

const MUTATION_CREATE_AUTH_TOKEN_GOOGLE = gql`
mutation Mobile_CreateAuthTokenGoogle($googleIdToken: String!) {
  authToken: createAuthTokenGoogle(
    googleIdToken: $googleIdToken,
    clientType: ${IAuthClientType.Mobile}
  ) {
    token
    user {
      roles {
        name
        permissions {
          action
          resource
        }
      }
    }
  }
}
`;

export const GoogleLoginButton: React.FC<{
  clientId: string;
  onSuccess: (authToken: IAuthToken) => Promise<void>;
}> = ({ clientId, onSuccess }) => {
  const [createAuthToken] = useMutation<{
    authToken: IMutation["createAuthTokenGoogle"];
  }, Omit<IMutationCreateAuthTokenGoogleArgs, "clientType">>(MUTATION_CREATE_AUTH_TOKEN_GOOGLE);

  GoogleSignin.configure({
    iosClientId: clientId
  });

  const onLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      if (user.idToken === null) {
        throw new Error("No ID token");
      }
      const { authToken } = await callMutationSafe(createAuthToken, {
        googleIdToken: user.idToken
      });
      await onSuccess(authToken);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <GoogleSigninButton
        onPress={onLogin}
      />
    </View>
  );
};
