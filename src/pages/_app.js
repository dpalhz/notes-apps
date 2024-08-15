import "@/styles/globals.css";

// pages/_app.js
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient"; // Import Apollo Client yang sudah dibuat
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
