import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { config } from "./config";
import { RootStore } from "./store/RootStore";

export const createApolloClient = ({ authStore }: RootStore): ApolloClient<NormalizedCacheObject> => new ApolloClient({
  link: setContext((_, { headers }: { headers: Record<string, string> }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${authStore.token ?? ""}`
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
