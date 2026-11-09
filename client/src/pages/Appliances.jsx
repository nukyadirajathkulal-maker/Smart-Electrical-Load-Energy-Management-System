import { useEffect, useState } from "react";
import api from "../services/api";

function Appliances() {
  const [appliances, setAppliances] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    appliance_name: "",
    power: "",
    hours_per_day: "",
    quantity: "",
    room: "",
  });

  useEffect(() => {
    fetchAppliances();
  }, []);

  // =========================
  // Fetch Appliances
  // =========================
  const fetchAppliances = async () => {
    try {
      const res = await api.get("/appliances");
      setAppliances(res.data.appliances);
    } catch (err) {
      console.log(err);
      alert("Failed to load appliances");
    }
  };

  // =========================
  // Handle Input
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Add / Update Appliance
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/appliances/${editingId}`, formData);
        alert("Appliance Updated Successfully");
      } else {
        await api.post("/appliances", formData);
        alert("Appliance Added Successfully");
      }

      setFormData({
        appliance_name: "",
        power: "",
        hours_per_day: "",
        quantity: "",
        room: "",
      });

      setEditingId(null);

      fetchAppliances();

    } catch (err) {
      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  // =========================
  // Edit Appliance
  // =========================
  const editAppliance = (item) => {
    setEditingId(item.id);

    setFormData({
      appliance_name: item.appliance_name,
      power: item.power,
      hours_per_day: item.hours_per_day,
      quantity: item.quantity,
      room: item.room,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // Delete Appliance
  // =========================
  const deleteAppliance = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appliance?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/appliances/${id}`);

      alert("Appliance Deleted Successfully");

      fetchAppliances();

    } catch (err) {

      alert(err.response?.data?.message || "Delete Failed");

    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Appliance Management
      </h1>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="appliance_name"
            placeholder="Appliance Name"
            value={formData.appliance_name}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            type="number"
            name="power"
            placeholder="Power (W)"
            value={formData.power}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            type="number"
            name="hours_per_day"
            placeholder="Hours Per Day"
            value={formData.hours_per_day}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            type="text"
            name="room"
            placeholder="Room"
            value={formData.room}
            onChange={handleChange}
            className="border rounded p-3 md:col-span-2"
            required
          />

        </div>

        <button
          type="submit"
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {editingId ? "Update Appliance" : "Add Appliance"}
        </button>

      </form>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3">Name</th>
              <th>Power</th>
              <th>Hours</th>
              <th>Quantity</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {appliances.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No Appliances Found
                </td>
              </tr>
            ) : (
              appliances.map((item) => (

                <tr
                  key={item.id}
                  className="border-b text-center hover:bg-gray-100"
                >

                  <td className="p-3">{item.appliance_name}</td>
                  <td>{item.power}</td>
                  <td>{item.hours_per_day}</td>
                  <td>{item.quantity}</td>
                  <td>{item.room}</td>

                  <td className="space-x-2">

                    <button
                      onClick={() => editAppliance(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteAppliance(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Appliances;