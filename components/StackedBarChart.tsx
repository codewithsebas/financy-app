"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';
import { StackedBarChartProps } from '@/types/stackedBarChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  // Configuracion de la interfas de colores, data renderizada y hover label
  const chartData = {
    labels: data.map((item) => format(new Date(Number(item.date)), 'dd/MM/yyyy')),
    datasets: [
      {
        label: 'Ingresos',
        data: data.map((item) => item.amount),
        backgroundColor: '#10b981',
      }
    ]
  };

  // Configuracion del responsive y posicion
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
  };

  return (
    <div className='w-3/4'>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
