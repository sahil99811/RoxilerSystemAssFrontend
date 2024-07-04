import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function DataChart( analysis ) {
  const chartDataStudents = {
    labels: ["Total Users","Total Stores","Total Rating"],
    datasets: [
      {
        data: [`${analysis?.data?.totalUser}`,`${analysis?.data?.totalStores}`,`${analysis?.data?.totalRating}`],
        backgroundColor: ["#FF6384", "#36A2EB","#553F02"],
      },
      
    ],
  };


  const options = {
    // Options for the Pie chart
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-[#161D29] p-6">
      <p className="text-lg font-bold text-[#F1F2FF]">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          className={"rounded-sm p-1 px-3 transition-all duration-200 bg-[#2C333F] text-[#FFD60A]"}
        >
          Analytics
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-[200px] w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={chartDataStudents}
          options={options}
        />
      </div>
    </div>
  );
}
