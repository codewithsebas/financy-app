import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import axios from 'axios';
import { useUserRoles } from '../context/UserRolesContext';
import { Role } from '@/types/useAuth';

export const useAuth = () => {
  const { user, error, isLoading } = useAuth0User();
  const { roles, setRoles } = useUserRoles();

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user || roles) return; // Solo ejecuta si hay un usuario y no se han recuperado los roles

      // Se realiza la obtencion del rol del usuario autenticado por medio de la API de AUTH0
      try {
        const response = await axios.get<Role[]>(`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${user?.sub}/roles`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MGMT_API_ACCESS_TOKEN}`,
          },
        });

        setRoles(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoles();
  }, [user, roles, setRoles]);

  return { roles, error, isLoading };
};
