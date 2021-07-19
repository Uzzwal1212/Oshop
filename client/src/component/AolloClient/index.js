import React from "react";
import propTypes from "prop-types";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";

const wsUrl = `ws://localhost:5000/graphql`;

const httpLink = createHttpLink({
  uri: `http://localhost:5000/graphql`,
});

const getHeaders = () => {
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  return {
    token: adminToken || userToken,
  };
};

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
    connectionParams: () => ({
      ...getHeaders(),
    }),
  },
});

const authLink = setContext((_, { headers }) => {
  const header = {
    ...headers,
    ...getHeaders(),
  };

  return {
    headers: {
      ...header,
      Authorization: header.token ? `Bearer ${header.token}` : "",
    },
  };
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

ApolloClientProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default ApolloClientProvider;
