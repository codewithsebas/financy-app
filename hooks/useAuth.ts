// hooks/useAuth.ts
import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import axios from 'axios';
import { useUserRoles } from '../context/UserRolesContext';

interface Role {
  id: string;
  name: string;
  description: string;
}

export const useAuth = () => {
  const { user, error, isLoading } = useAuth0User();
  const { roles, setRoles } = useUserRoles();

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user || roles) return; // Solo ejecuta si hay un usuario y no se han recuperado los roles

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
