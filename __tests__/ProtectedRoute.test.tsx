import { render, screen } from '@testing-library/react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ProtectedRoute', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/other-route',
      replace: mockReplace,
    });
  });

  test('Debe redirigir a /dashboard si el usuario tiene rol "user" y no está en /dashboard', () => {
    (useAuth as jest.Mock).mockReturnValue({
      roles: [{ name: 'user' }],
      isLoading: false,
    });

    render(
      <ProtectedRoute>
        <div>Contenido protegido</div>
      </ProtectedRoute>
    );

    // Verificar que el usuario ha sido redirigido a '/dashboard'
    expect(mockReplace).toHaveBeenCalledWith('/dashboard');
  });


  test('Debe permitir el acceso si el usuario tiene un rol diferente al de "user"', () => {
    (useAuth as jest.Mock).mockReturnValue({
      roles: [{ name: 'admin' }],
      isLoading: false,
    });

    render(
      <ProtectedRoute>
        <div>Contenido protegido</div>
      </ProtectedRoute>
    );

    // Verifica que el contenido protegido se muestra
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
