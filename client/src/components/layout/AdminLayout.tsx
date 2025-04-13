import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BarChart, Users, MessageSquare, Home, Settings } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [location] = useLocation();

  // Simple admin password - in a real app, this would be more secure
  const adminPassword = "admin123";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsPasswordCorrect(true);
      setError(null);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // Define admin navigation items
  const navItems = [
    { 
      label: "Dashboard", 
      path: "/admin", 
      icon: <Home className="w-5 h-5 mr-2" />,
      description: "Overview of site activity and metrics" 
    },
    { 
      label: "Analytics", 
      path: "/admin/analytics", 
      icon: <BarChart className="w-5 h-5 mr-2" />,
      description: "Detailed analytics and insights"
    },
    { 
      label: "Messages", 
      path: "/admin/contact-messages", 
      icon: <MessageSquare className="w-5 h-5 mr-2" />,
      description: "View and manage contact form submissions"
    },
    { 
      label: "Users", 
      path: "/admin/users", 
      icon: <Users className="w-5 h-5 mr-2" />,
      description: "Manage user accounts and permissions"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{title}</h1>
          
          {!isPasswordCorrect ? (
            <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Admin Authentication</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block mb-1">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#00A0DF]"
                    placeholder="Enter admin password"
                  />
                  {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#00A0DF] text-white px-4 py-2 rounded font-medium hover:bg-[#0088c2] transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Admin Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h2 className="text-xl font-bold mb-4 px-2">Admin Panel</h2>
                  <nav className="space-y-1">
                    {navItems.map((item, index) => {
                      const isActive = location === item.path;
                      return (
                        <div key={index} className="relative group">
                          <Link 
                            href={item.path}
                            className={`flex items-center px-2 py-2 rounded transition duration-150 ease-in-out ${
                              isActive 
                                ? "bg-[#00A0DF] text-white" 
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                          {item.description && (
                            <div className="absolute hidden group-hover:block left-full ml-2 top-0 z-10 w-48 p-2 bg-gray-800 rounded shadow-lg text-xs text-gray-300">
                              {item.description}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-4">
                {children}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}