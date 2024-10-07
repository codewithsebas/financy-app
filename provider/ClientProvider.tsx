import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { UserRolesProvider } from '@/context/UserRolesContext'; // Proveedor de roles de usuario
import ProtectedRoute from '../components/ProtectedRoute'; // Protector de rutas

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <UserRolesProvider>
          <ProtectedRoute>
            {children} {/* El contenido se protege y se pasa por varios contextos */}
          </ProtectedRoute>
        </UserRolesProvider>
      </ApolloProvider>
    </UserProvider>
  );
}
