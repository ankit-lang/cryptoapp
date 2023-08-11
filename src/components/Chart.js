import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Chart = ({ arr, currency, days }) => {
  const prices = [];
  const date = [];

  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    debugger;
    if (days === "24h") {
      date.push(new Date(arr[i][0]).toLocaleTimeString());
    } else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }

  // console.log(date);
  // console.log(prices);
  const data = {
    labels: date,
    datasets: [
      {
        label: `Prices in ${currency}`,
        data: prices,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(255,99,132,0.5)",
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
      }}
      data={data}
    />
  );
};

export default Chart;
