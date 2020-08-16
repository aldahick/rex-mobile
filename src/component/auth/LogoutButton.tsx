import React, { useState } from "react";
import { Button } from "react-native";
import { Redirect } from "react-router";
import { UserState } from "./UserState";

export const LogoutButton: React.FC = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const onLogout = async () => {
    await UserState.removeAuth();
    setIsLoggedOut(true);
  };

  if (isLoggedOut) {
    return <Redirect to="/" />;
  }

  return (
    <Button title="Logout" onPress={onLogout}>
      Log Out
    </Button>
  );
};
