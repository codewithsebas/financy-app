export interface FinancialData {
    date: string;
    amount: number;
}
  
export interface StackedBarChartProps {
    data: FinancialData[];
}