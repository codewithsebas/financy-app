import { render } from '@testing-library/react';
import ClientProviders from '@/provider/ClientProvider';

jest.mock('@apollo/client', () => {
  const actualApollo = jest.requireActual('@apollo/client');
  return {
    ...actualApollo,
    ApolloClient: jest.fn().mockImplementation(() => ({
      query: jest.fn()
    })),
    ApolloProvider: ({ client, children }: { client: any; children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    InMemoryCache: jest.fn().mockImplementation(() => ({}))
  };
});

jest.mock('@auth0/nextjs-auth0/client', () => ({
  UserProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('@/context/UserRolesContext', () => ({
  UserRolesProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('../components/ProtectedRoute', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('ClientProviders', () => {
  it('Verifica que los hijos se esten renderizando', () => {
    const { getByText } = render(
      <ClientProviders>
        <div>Test Child</div>
      </ClientProviders>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
