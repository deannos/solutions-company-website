import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import { PlusCircle, Search, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";

// Simulated user data - in a real app, this would come from an API
const simulatedUsers = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "admin", active: true, lastLogin: "2025-04-09T12:32:10Z" },
  { id: 2, name: "Marketing Manager", email: "marketing@example.com", role: "editor", active: true, lastLogin: "2025-04-08T09:15:22Z" },
  { id: 3, name: "Content Creator", email: "content@example.com", role: "contributor", active: true, lastLogin: "2025-04-07T14:45:33Z" },
  { id: 4, name: "Sales Team", email: "sales@example.com", role: "viewer", active: true, lastLogin: "2025-04-05T11:21:09Z" },
  { id: 5, name: "Former Employee", email: "former@example.com", role: "viewer", active: false, lastLogin: "2025-03-15T08:05:43Z" },
];

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  lastLogin: string;
};

const roles = ["admin", "editor", "contributor", "viewer"];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "viewer",
    active: true
  });

  // In a real application, this would be a useQuery call to your backend API
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['admin-users'],
    queryFn: () => Promise.resolve(simulatedUsers),
  });

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleUpdateUser = () => {
    // In a real app, you would make an API call to update the user
    console.log("Updating user:", editingUser);
    
    // Reset editing state
    setEditingUser(null);
  };

  const handleAddUser = () => {
    // In a real app, you would make an API call to create the user
    console.log("Adding new user:", newUser);
    
    // Reset form and state
    setNewUser({
      name: "",
      email: "",
      role: "viewer",
      active: true
    });
    setIsAddingUser(false);
  };

  const handleDeleteUser = (userId: number) => {
    // In a real app, you would make an API call to delete the user
    console.log("Deleting user with ID:", userId);
  };

  const toggleActiveStatus = (user: User) => {
    // In a real app, you would make an API call to toggle the status
    console.log("Toggling active status for user:", user.id);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  // Filter users based on search term and active status
  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showInactive ? true : user.active;
    return matchesSearch && matchesStatus;
  });

  const UsersContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">Loading users...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#00A0DF] text-white"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-[#00A0DF] focus:ring-[#00A0DF]"
                checked={showInactive}
                onChange={() => setShowInactive(!showInactive)}
              />
              <span className="text-gray-300">Show Inactive</span>
            </label>
            <button
              onClick={() => setIsAddingUser(true)}
              className="flex items-center space-x-1 px-4 py-2 bg-[#00A0DF] text-white rounded hover:bg-[#0088c2] transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left text-gray-300">Name</th>
                <th className="py-3 px-4 text-left text-gray-300">Email</th>
                <th className="py-3 px-4 text-left text-gray-300">Role</th>
                <th className="py-3 px-4 text-left text-gray-300">Status</th>
                <th className="py-3 px-4 text-left text-gray-300">Last Login</th>
                <th className="py-3 px-4 text-left text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                  <td className="py-3 px-4 text-white">{user.name}</td>
                  <td className="py-3 px-4 text-white">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      user.role === 'admin' ? 'bg-red-900/50 text-red-300' :
                      user.role === 'editor' ? 'bg-blue-900/50 text-blue-300' :
                      user.role === 'contributor' ? 'bg-green-900/50 text-green-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center ${user.active ? 'text-green-400' : 'text-red-400'}`}>
                      {user.active ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-1" />
                          Inactive
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{formatDate(user.lastLogin)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-blue-400 hover:text-blue-300"
                        title="Edit User"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => toggleActiveStatus(user)}
                        className={`p-1 ${user.active ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}`}
                        title={user.active ? "Deactivate User" : "Activate User"}
                      >
                        {user.active ? <XCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-red-400 hover:text-red-300"
                        title="Delete User"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers?.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-white">Edit User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-300">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-300">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-300">Role</label>
                  <select
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active-status"
                    className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-[#00A0DF] focus:ring-[#00A0DF]"
                    checked={editingUser.active}
                    onChange={(e) => setEditingUser({...editingUser, active: e.target.checked})}
                  />
                  <label htmlFor="active-status" className="text-gray-300">Active</label>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateUser}
                    className="px-4 py-2 bg-[#00A0DF] text-white rounded hover:bg-[#0088c2] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {isAddingUser && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-white">Add New User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-300">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-300">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-300">Role</label>
                  <select
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="new-active-status"
                    className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-[#00A0DF] focus:ring-[#00A0DF]"
                    checked={newUser.active}
                    onChange={(e) => setNewUser({...newUser, active: e.target.checked})}
                  />
                  <label htmlFor="new-active-status" className="text-gray-300">Active</label>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsAddingUser(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUser}
                    className="px-4 py-2 bg-[#00A0DF] text-white rounded hover:bg-[#0088c2] transition-colors"
                    disabled={!newUser.name || !newUser.email}
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminLayout title="User Management">
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-400">Add, edit, and manage user accounts and permissions</p>
        </div>
        
        <UsersContent />
      </div>
    </AdminLayout>
  );
}