import { useState, useEffect } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, BarElement, Tooltip, Legend);

const IndustryGraph = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetch("http://localhost:5000/admin/all_data")
      .then((response) => response.json())
      .then((result) => {
        if (result.status) {
          setData(result.data);
          const uniqueYears = [...new Set(result.data.map((item) => item.year))];
          if (uniqueYears.length > 0) setSelectedYear(uniqueYears[0]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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

  const sortedData = data.sort((a, b) => a.year - b.year || monthOrder[a.month_name] - monthOrder[b.month_name]);
  const uniqueYears = [...new Set(sortedData.map((item) => item.year))];

  const filteredData = sortedData.filter((item) => item.year === selectedYear);
  const labels = filteredData.map((item) => item.month_name);
  const emissionValues = filteredData.map((item) => item.data_value);

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

  // Calculate average emissions by company
  const companyAverages = {};
  data.forEach(({ company_name, data_value }) => {
    if (!companyAverages[company_name]) {
      companyAverages[company_name] = { total: 0, count: 0 };
    }
    companyAverages[company_name].total += data_value;
    companyAverages[company_name].count += 1;
  });

  const companyAverageData = Object.entries(companyAverages).map(([company, { total, count }]) => ({
    company,
    average: total / count,
  }));

  const pieChartData = {
    labels: companyAverageData.map((item) => item.company),
    datasets: [
      {
        label: "Average Carbon Footprint",
        data: companyAverageData.map((item) => item.average),
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

  const barChartData = {
    labels: companyAverageData.map((item) => item.company),
    datasets: [
      {
        label: "Avg Carbon Emission (tons)",
        data: companyAverageData.map((item) => item.average),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const top5LowEmissionCompanies = companyAverageData
    .sort((a, b) => a.average - b.average)
    .slice(0, 5);

  return (
    <div style={{ width: "90%", margin: "20px auto", textAlign: "center" }}>
      <h2>Industry Carbon Emission Graph</h2>

      <select
        value={selectedYear || uniqueYears[0]}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        style={{ padding: "5px", marginBottom: "20px", borderRadius: "5px" }}
      >
        {uniqueYears.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "500px", background: "#f9f9f9", padding: "15px", borderRadius: "10px" }}>
          <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
        </div>

        <div style={{ width: "100%", maxWidth: "500px", background: "#f9f9f9", padding: "15px", borderRadius: "10px" }}>
          <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
        </div>

        <div style={{ width: "100%", maxWidth: "1000px", background: "#f9f9f9", padding: "15px", borderRadius: "10px" }}>
          <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
        </div>
      </div>

      <h3>Top 5 Companies with Lowest Average Carbon Footprint</h3>
      <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#ddd" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Company</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Avg Carbon Emission (tons)</th>
          </tr>
        </thead>
        <tbody>
          {top5LowEmissionCompanies.map(({ company, average }, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{company}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{average.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndustryGraph;
