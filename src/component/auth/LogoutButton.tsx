import React, { useState } from "react";
import gql from "graphql-tag";
import { observer } from "mobx-react";
import { useMutation } from "react-apollo";
import { Button } from "react-native";
import PushNotification from "react-native-push-notification";
import { Redirect } from "react-router";
import { IMutationDeregisterNotificationDeviceArgs, INotificationPlatform } from "../../graphql/types";
import { useStores } from "../../hook/useStores";
import { callMutationSafe } from "../../util/graphql";

const MUTATION_DEREGISTER_NOTIFICATION_DEVICE = gql`
mutation Mobile_DeregisterNotificationDevice($platform: NotificationPlatform) {
  deregisterNotificationDevice(platform: $platform)
}
`;

export const LogoutButton: React.FC = observer(() => {
  const [deregisterNotificationDevice] = useMutation<unknown, IMutationDeregisterNotificationDeviceArgs>(MUTATION_DEREGISTER_NOTIFICATION_DEVICE);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { authStore, statusStore } = useStores();

  const onLogout = async () => {
    try {
      await callMutationSafe(deregisterNotificationDevice, {
        platform: INotificationPlatform.Ios
      });
    } catch (err) {
      // statusStore.setErrorMessage(err instanceof Error ? err.message : err);
    }
    try {
      await authStore.removeAuth();
    } catch (err) {
      statusStore.setErrorMessage(err instanceof Error ? err.message : err);
    }
    PushNotification.abandonPermissions();
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
});
