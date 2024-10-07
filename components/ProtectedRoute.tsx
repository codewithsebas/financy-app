import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRouteProps } from '@/types/protectedRoute';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { roles, isLoading } = useAuth();

  // Se verifica si el usuario tiene el rol "user"
  const isUser = roles?.some((role: { name: string; }) => role.name === 'user');
  const isDashboardRoute = router.pathname === '/dashboard';

  useEffect(() => {
    if (!isLoading && isUser && !isDashboardRoute) {
      // Redirige a la página de dashboard si el rol es "user"
      router.replace('/dashboard');
    }
  }, [isLoading, isUser, isDashboardRoute, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
