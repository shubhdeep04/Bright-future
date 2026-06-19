import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

const roles = ["user", "donor", "volunteer", "admin"];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/users")
      .then((r) => setUsers(r.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateRole = async (id, role) => {
    try {
      await api.put(`/users/${id}`, { role });
      toast.success("Role updated");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update");
    }
  };

  const toggleActive = async (u) => {
    try {
      await api.put(`/users/${u._id}`, { isActive: !u.isActive });
      toast.success(u.isActive ? "User deactivated" : "User activated");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success("User removed");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="font-display font-bold text-3xl mb-6">Users</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : users.length === 0 ? (
        <p className="text-slate">No users found.</p>
      ) : (
        <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate border-b border-white/10">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-white/10 last:border-0">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">{u.phone || "-"}</td>
                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => updateRole(u._id, e.target.value)}
                      disabled={u.role === "admin"}
                      className="px-3 py-1.5 rounded-full border-2 border-white/10 text-xs font-semibold capitalize bg-paper disabled:opacity-60"
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(u)}
                      disabled={u.role === "admin"}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.isActive ? "bg-leaf/15 text-leaf" : "bg-terracotta/15 text-terracotta"
                      } disabled:opacity-60`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-4">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="p-4">
                    {u.role !== "admin" && (
                      <button onClick={() => handleDelete(u._id)} className="text-terracotta hover:text-red-600">
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
