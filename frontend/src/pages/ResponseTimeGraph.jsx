import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import API_BASE_URL from "../config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ResponseTimeGraph() {

  const [times, setTimes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/performance/response-time`)
      .then(res => res.json())
      .then(data => setTimes(data.responseTimes))
      .catch(err => console.error(err));
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "API Response Time (ms)",
        data: times,
        borderColor: "#1f6c6c",
        backgroundColor: "rgba(31, 108, 108, 0.2)",
        tension: 0.4,
        fill: true
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <div className="graph-container">
        <div className="graph-header">
          <div>
            <h2>Response Time Graph</h2>
            <p className="graph-subtitle">
              Average backend API response performance
            </p>
          </div>
        </div>

        <div className="chart-wrapper">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
}