import React, { useState } from "react";
import { View } from "react-native";
import { Redirect } from "react-router";
import { UserState } from "../component/auth";
import { GoogleLoginButton } from "../component/auth/GoogleLoginButton";
import { config } from "../config";
import { IAuthToken } from "../graphql/types";

export const LoginScene: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = async ({ token, user: { roles } }: IAuthToken) => {
    await UserState.setAuth(token, roles ?? []);
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <View>
      <GoogleLoginButton
        clientId={config.googleClientId}
        onSuccess={onLogin}
      />
    </View>
  );
};
