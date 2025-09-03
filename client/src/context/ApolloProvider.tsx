"use client";

import createApolloClient from "@/config/apollo-client";
import { ApolloProvider as ReactApolloProvider } from "@apollo/client/react";

type ApolloProviderProps = {
  children: React.ReactNode;
};

export default function ApolloProvider({ children }: ApolloProviderProps) {
  const client = createApolloClient();
  return <ReactApolloProvider client={client}>{children}</ReactApolloProvider>;
}
