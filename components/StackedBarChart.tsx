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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FinancialData {
  date: string;
  amount: number;
}

interface StackedBarChartProps {
  data: FinancialData[];
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
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
