"use client"
import DashboardLayout from '@/components/DashboardLayout';
import StackedBarChart from '@/components/StackedBarChart';
import { FileDown, LoaderCircle } from 'lucide-react';
import React from 'react';
import { CSVLink } from 'react-csv';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { GET_MOVEMENTS } from '@/graphql/queries/queries';
import { useUser } from '@auth0/nextjs-auth0/client';
import { formatBalance } from '@/utils/formatBalance';
import { format } from 'date-fns';

const Reports = () => {
  const { user, isLoading } = useUser();
  const { data, loading, error } = useQuery(GET_MOVEMENTS, {
    skip: !user,
  });

  if (loading || !data) {
    return (
      <main className="w-full h-screen flex flex-col gap-5 items-center justify-center text-xl">
        Cargando... <LoaderCircle size={20} className="animate-spin" />
      </main>
    );
  }

  const totalAmount: number = data?.movements?.reduce((sum: number, movement: { amount: number }): number => sum + movement.amount, 0);

  const csvHeaders = [
    { label: 'Fechas', key: 'date' },
    { label: 'Movimientos', key: 'amount' }
  ];

  const csvData = data?.movements?.map((movement: { date: string; amount: number }) => ({
    date: format(new Date(Number(movement.date)), 'dd/MM/yyyy'),
    amount: movement.amount
  }));

  return (
    <DashboardLayout>
      <Head>
        <title>Financy App - Reportes</title>
      </Head>
      <div className="flex flex-col w-full">
        <h2 className="font-semibold text-xl text-colorBlack">Reportes de movimientos (Ingresos y Gastos)</h2>
        <p className='text-sm text-colorBlack/50'>Informacion general</p>
      </div>
      <div className='w-full flex flex-col gap-10 overflow-x-auto overflow-y-auto h-[49.1rem]'>
        <div className='w-3/5 flex justify-between gap-3 text-colorBlack items-end border p-4 rounded-lg shadow'>
          <div className='flex flex-col gap-3'>
            <div>
              <h3 className="font-semibold text-xl">Saldo actual</h3>
              <p className='text-sm text-colorBlack/50'>Monto total del saldo</p>
            </div>

            <h1 className='text-3xl font-semibold'>{formatBalance(totalAmount)}</h1>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CSVLink
                  className="flex items-center gap-3 text-sm px-4 py-2 rounded-md text-white bg-black hover:bg-black/85 duration-200"
                  data={csvData}  // Usar los datos formateados
                  headers={csvHeaders}
                  filename="reporte_financiero.csv"
                >
                  Generar <FileDown size={18} />
                </CSVLink>
              </TooltipTrigger>
              <TooltipContent>
                Descargar reporte
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>
        <StackedBarChart data={data.movements} />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
