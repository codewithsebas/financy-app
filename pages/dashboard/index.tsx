import React, { useState } from 'react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ModalCreate } from '@/components/modals/ModalCreate';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MOVEMENTS } from '@/graphql/queries/queries';
import { Movement } from '@/types/movement';
import { formatBalance } from '@/utils/formatBalance';
import { ADD_MOVEMENT } from '@/graphql/mutation/mutations';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAuth } from '@/hooks/useAuth';
import { LoaderCircle } from 'lucide-react';
import Head from 'next/head';

const Dashboard = () => {
  const { user } = useUser();
  const { roles } = useAuth();
  const [open, setOpen] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const role = roles?.[0]?.name;
  const { data, loading, error } = useQuery(GET_MOVEMENTS, {
    skip: !user,
  });
  const [addMovement] = useMutation(ADD_MOVEMENT, {
    refetchQueries: [GET_MOVEMENTS],
    onError: (error) => {
      console.error("Error creando el movimiento:", error);
    },
  });

  interface Amount {
    amount: string;
    concept: string;
    date: string;
  }

  const handleMovement = async (data: Amount) => {
    const { amount, concept, date } = data;
    setLoadingEdit(true);
    try {
      const isoDate = new Date(date).toISOString();

      await addMovement({
        variables: {
          amount: parseFloat(amount),
          concept,
          date: isoDate,
          userId: user?.sub,
        },
      });
      setLoadingEdit(false);
      setOpen(false);
    } catch (error) {
      console.error("Error guardando el movimiento:", error);
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Financy App - Dashboard</title>
      </Head>
      <div className="flex justify-between items-center gap-3">
        <div>
          <h2 className="font-semibold text-xl text-colorBlack">Gestión de ingresos y egresos</h2>
          <p className='text-sm text-colorBlack/50'>Información general</p>
        </div>
        {role === 'admin' && (
          <ModalCreate
            onSave={(amount, concept, date) => handleMovement({ amount, concept, date })}
            open={open}
            setOpen={setOpen}
            loadingEdit={loadingEdit}
            setLoadingEdit={setLoadingEdit}
          />
        )}
      </div>
      <div className="w-full h-[49rem] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Usuario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.movements?.map((item: Movement) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.concept}</TableCell>
                <TableCell>{formatBalance(item.amount)}</TableCell>
                <TableCell>{format(new Date(Number(item.date)), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{item.user?.name ? item.user.name : user?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!data || data?.movements?.length === 0 && <p className='w-full my-5'>No hay movimientos disponibles.</p>}
        {loading && <div className='w-full flex flex-col gap-2 items-center justify-center  my-5'>Cargando movimientos... <LoaderCircle size={20} className="animate-spin" /></div>}
        {error && <p className='w-full my-5'>Error al cargar los movimientos: <b>{error.message}</b></p>}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
