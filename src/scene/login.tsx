import React, { useState } from "react";
import { observer } from "mobx-react";
import { StyleSheet, View } from "react-native";
import PushNotification from "react-native-push-notification";
import { Redirect } from "react-router";
import { GoogleLoginButton } from "../component/auth";
import { config } from "../config";
import { IAuthToken } from "../graphql/types";
import { useStores } from "../hook/useStores";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export const LoginScene: React.FC = observer(() => {
  const { authStore } = useStores();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = async ({ token, user: { roles } }: IAuthToken) => {
    await authStore.setAuth(token, roles ?? []);
    await PushNotification.requestPermissions();
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
});
