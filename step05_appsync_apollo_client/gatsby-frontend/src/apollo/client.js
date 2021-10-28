import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://ygevmqqogzc4djtcyf7lgjeh7m.appsync-api.us-east-2.amazonaws.com/graphql",
    fetch,
    headers: {
      "x-api-key": "da2-cuwkmsp36bgjnp4e6wwbvwhqsu",
    },
  }),
  cache: new InMemoryCache(),
});
