import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import PushNotification from "react-native-push-notification";
import { createApolloClient } from "./apollo";
import { IMutationRegisterNotificationDeviceArgs, INotificationPlatform } from "./graphql/types";
import { RootStore } from "./store/RootStore";
import { AggregateError } from "./util/AggregateError";

const MUTATION_REGISTER_NOTIFICATION_DEVICE = gql`
mutation Mobile_RegisterNotificationDevice($platform: NotificationPlatform!, $token: String!) {
  registerNotificationDevice(platform: $platform, token: $token)
}
`;

export const setupPushNotifications = (rootStore: RootStore): void => {
  const { statusStore } = rootStore;

  PushNotificationIOS.addEventListener("registrationError", err => {
    console.error(err);
    statusStore.setErrorMessage(err.message);
  });

  PushNotification.configure({
    onRegister: async ({ token }) => {
      const apolloClient = createApolloClient(rootStore);
      try {
        const res = await apolloClient.mutate<unknown, IMutationRegisterNotificationDeviceArgs>({
          mutation: MUTATION_REGISTER_NOTIFICATION_DEVICE,
          variables: {
            platform: INotificationPlatform.Ios,
            token
          }
        });
        if (res.errors) {
          throw new AggregateError(res.errors);
        }
      } catch (err) {
        let message = err instanceof Error ? err.message : err as string;
        if (typeof err === "object" && "errors" in err) {
          const { errors } = (err as { errors: ApolloError[] });
          message = errors[0].message;
        }
        statusStore.setErrorMessage(message);
      }
    },
    onNotification: notification => {
      console.log(notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    requestPermissions: false
  });
};
