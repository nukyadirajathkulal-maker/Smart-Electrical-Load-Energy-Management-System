import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
      alert("Failed to load dashboard");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!dashboard) {
    return (
      <h2 className="text-center mt-20 text-2xl font-bold">
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-blue-700 text-white flex justify-between items-center px-10 py-5 shadow-lg">
        <h1 className="text-3xl font-bold">
          Smart Electrical Load & Energy Management
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-8">

        {/* Navigation Button */}
        <div className="flex justify-end mb-8">
          <Link
            to="/appliances"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Manage Appliances
          </Link>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-600 text-lg">Total Appliances</h2>
            <p className="text-4xl font-bold text-blue-600 mt-3">
              {dashboard.totalAppliances}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-600 text-lg">Total Power (W)</h2>
            <p className="text-4xl font-bold text-green-600 mt-3">
              {dashboard.totalPower}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-600 text-lg">Daily Units (kWh)</h2>
            <p className="text-4xl font-bold text-orange-600 mt-3">
              {dashboard.dailyUnits}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-600 text-lg">Estimated Bill (₹)</h2>
            <p className="text-4xl font-bold text-red-600 mt-3">
              ₹ {dashboard.estimatedBill}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;