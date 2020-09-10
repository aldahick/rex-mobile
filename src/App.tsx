import React from "react";
import { Provider as MobxProvider } from "mobx-react";
import { ApolloProvider } from "react-apollo";
import { NativeRouter, Route, Switch } from "react-router-native";
import "mobx-react-lite/batchingForReactNative";
import { createApolloClient } from "./apollo";
import { SecureRoute } from "./component/auth";
import { Layout } from "./component/Layout";
import { setupPushNotifications } from "./pushNotifications";
import { scenes } from "./scenes";
import { RootStore } from "./store/RootStore";

const rootStore = new RootStore();
let apolloClient = createApolloClient(rootStore);

rootStore.authStore.init().then(() => {
  apolloClient = createApolloClient(rootStore);
  setupPushNotifications(rootStore);
}).catch(err => {
  console.error(err);
});

export const App: React.FC = () => (
  <NativeRouter>
    <MobxProvider {...rootStore.allStores}>
      <ApolloProvider client={apolloClient}>
        <Layout>
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
        </Layout>
      </ApolloProvider>
    </MobxProvider>
  </NativeRouter>
);
