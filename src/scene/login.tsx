import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Redirect } from "react-router";
import { GoogleLoginButton, UserState } from "../component/auth";
import { config } from "../config";
import { IAuthToken } from "../graphql/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

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
    <View style={styles.container}>
      <GoogleLoginButton
        clientId={config.googleClientId}
        onSuccess={onLogin}
      />
    </View>
  );
};
