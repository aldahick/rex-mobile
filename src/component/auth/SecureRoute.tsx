import React from "react";
import { Text } from "react-native";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-native";
import { AuthCheck } from "./AuthCheck";
import { UserState } from "./UserState";

export const SecureRoute: React.FC<RouteProps & {
  check: AuthCheck;
  component: React.ComponentClass | React.FunctionComponent;
}> = ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  component: Component,
  check,
  ...rest
}) => {
  const render = (props: RouteComponentProps) => {
    const component = () => <Component {...props} />;

    if (!UserState.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return UserState.isAuthorized(check) ? component() : (
      <Text>
        Access denied.
      </Text>
    );
  };

  return (
    <Route {...rest} render={render} />
  );
};
