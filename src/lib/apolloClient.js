// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create an instance of Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
  cache: new InMemoryCache(),
});

export default client;
