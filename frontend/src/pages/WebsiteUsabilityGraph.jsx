import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function WebsiteUsabilityGraph() {

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalScholarships: 0,
    totalApplications: 0
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/analytics/usability")
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.error(err));
  }, []);

  const data = {
    labels: ["Users", "Scholarships", "Applications"],
    datasets: [
      {
        label: "Platform Growth",
        data: [
          analytics.totalUsers,
          analytics.totalScholarships,
          analytics.totalApplications
        ],
        backgroundColor: [
          "#1f6c6c",
          "#2f8686",
          "#4bb3b3"
        ],
        borderRadius: 8
      },
    ],
  };

  return (
    <div className="admin-dashboard">

      <div className="graph-container">

        <div className="graph-header">
          <div>
            <h2>Website Usability Graph</h2>
            <p className="graph-subtitle">
              Overview of platform activity and usage statistics
            </p>
          </div>
        </div>

        <div className="chart-wrapper">
          <Bar data={data} />
        </div>

      </div>

    </div>
  );
}