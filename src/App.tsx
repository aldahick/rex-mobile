import React from "react";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { Provider as MobxProvider } from "mobx-react";
import { ApolloProvider } from "react-apollo";
import { NativeRouter, Route, Switch } from "react-router-native";
import { SecureRoute } from "./component/auth";
import { UserState } from "./component/auth/UserState";
import { config } from "./config";
import { scenes } from "./scenes";

const client = new ApolloClient({
  link: setContext((_, { headers }: { headers: Record<string, string> }) => ({
    headers: {
      ...headers,
      authorization: UserState.token
    }
  })).concat(createHttpLink({
    uri: `${config.apiUrl}/graphql`
  })),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { errorPolicy: "all" },
    mutate: { errorPolicy: "all" }
  }
});

export const App: React.FC = () => (
  <NativeRouter>
    <MobxProvider>
      <ApolloProvider client={client}>
        <Switch>
          {scenes.map(scene => {
            const props = {
              key: scene.route,
              exact: true,
              path: scene.route,
              component: scene.component
            };
            return scene.authCheck !== undefined
              ? <SecureRoute {...props} check={scene.authCheck} />
              : <Route {...props} />;
          })}
        </Switch>
      </ApolloProvider>
    </MobxProvider>
  </NativeRouter>
);
