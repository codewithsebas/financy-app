import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
  });

  test('Debe mostrar la navegación solo para el administrador', () => {
    render(<Navbar role="admin" />);

    // Verifica si los enlaces de navegación para admin están presentes
    expect(screen.getByText('Gestión principal')).toBeInTheDocument();
    expect(screen.getByText('Gestión de Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Reportes')).toBeInTheDocument();
  });

  test('Debe mostrar la navegación solo para el usuario', () => {
    render(<Navbar role="user" />);

    // Verifica que los enlaces de gestión de usuarios y reportes no estén presentes
    expect(screen.queryByText('Gestión de Usuarios')).not.toBeInTheDocument();
    expect(screen.queryByText('Reportes')).not.toBeInTheDocument();
  });
});
