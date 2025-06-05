import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const IndustryGraph = () => {
  const { companyId } = useParams();
  const location = useLocation();
  const monthlyData = location.state?.monthlyData || [];

  const [selectedYear, setSelectedYear] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const monthOrder = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
  };

  monthlyData.sort((a, b) => a.year - b.year || monthOrder[a.month_name] - monthOrder[b.month_name]);
  const uniqueYears = [...new Set(monthlyData.map((data) => data.year))];

  useEffect(() => {
    if (selectedYear === null && uniqueYears.length > 0) {
      setSelectedYear(uniqueYears[0]);
    }
  }, [uniqueYears, selectedYear]);

  const filteredData = monthlyData.filter((data) => data.year === selectedYear);
  const labels = filteredData.map((data) => data.month_name);
  const emissionValues = filteredData.map((data) => data.data_value);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: `Carbon Emission (tons)`,
        data: emissionValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        fill: true,
      },
    ],
  };

  const pieChartData = {
    labels,
    datasets: [
      {
        label: "Carbon Emission",
        data: emissionValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "90%", margin: "20px auto", textAlign: "center" }}>
      <h2>Industry Carbon Emission Graph</h2>
      <h3>Company ID: {companyId}</h3>

      <select
        value={selectedYear || uniqueYears[0]}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        style={{ padding: "5px", marginBottom: "20px", borderRadius: "5px" }}
      >
        {uniqueYears.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {/* Charts Container */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "500px", background: "#f9f9f9", padding: "15px", borderRadius: "10px" }}>
          <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
        </div>

        <div style={{ width: "100%", maxWidth: "500px", background: "#f9f9f9", padding: "15px", borderRadius: "10px" }}>
          <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
        </div>
      </div>

      {/* Data Table */}
      <div style={{ marginTop: "30px" }}>
        <h3>Carbon Emission Data</h3>
        <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#ddd" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Month</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Year</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Carbon Emission (tons)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{data.month_name}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{data.year}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{data.data_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndustryGraph;
