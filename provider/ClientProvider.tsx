"use client";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { UserRolesProvider } from '@/context/UserRolesContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <UserRolesProvider>
          {children}
        </UserRolesProvider>
      </ApolloProvider>
    </UserProvider>
  );
}
