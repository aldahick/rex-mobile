import React from "react";
import { observer } from "mobx-react";
import { Text } from "react-native";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-native";
import { useStores } from "../../hook/useStores";
import { AuthCheck } from "./AuthCheck";

export const SecureRoute: React.FC<RouteProps & {
  check: AuthCheck;
  component: React.ComponentClass | React.FunctionComponent;
}> = observer(({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  component: Component,
  check,
  ...rest
}) => {
  const { authStore } = useStores();

  const render = (props: RouteComponentProps) => {
    const component = () => <Component {...props} />;

    if (!authStore.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return authStore.isAuthorized(check) ? component() : (
      <Text>
        Access denied.
      </Text>
    );
  };

  return (
    <Route {...rest} render={render} />
  );
});
