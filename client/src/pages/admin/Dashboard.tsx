import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ContactMessage } from "@shared/schema";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery<{ success: boolean; data: ContactMessage[] }>({
    queryKey: ['/api/contact-messages'],
  });

  // Data processing for visualizations
  const processDataForCharts = () => {
    if (!data?.data || data.data.length === 0) {
      return {
        byDay: [],
        byCompany: [],
        withPhone: 0,
        withoutPhone: 0,
        messageLength: [],
      };
    }

    // Group messages by day
    const messagesGroupedByDay = data.data.reduce((acc: Record<string, number>, message) => {
      const date = new Date(message.createdAt);
      const dateString = date.toLocaleDateString();
      
      acc[dateString] = (acc[dateString] || 0) + 1;
      return acc;
    }, {});

    const byDay = Object.entries(messagesGroupedByDay).map(([date, count]) => ({
      date,
      count,
    }));

    // Group by company
    const messagesGroupedByCompany = data.data.reduce((acc: Record<string, number>, message) => {
      const company = message.company || 'Not Specified';
      acc[company] = (acc[company] || 0) + 1;
      return acc;
    }, {});

    const byCompany = Object.entries(messagesGroupedByCompany)
      .map(([company, count]) => ({
        company,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 companies

    // Count messages with/without phone
    const withPhone = data.data.filter(message => message.phone && message.phone.length > 0).length;
    const withoutPhone = data.data.length - withPhone;

    // Message length distribution
    const messageLength = data.data.map(message => ({
      id: message.id,
      length: message.message.length,
      name: message.name,
    }));

    return {
      byDay,
      byCompany,
      withPhone,
      withoutPhone,
      messageLength,
    };
  };

  const chartData = processDataForCharts();
  const COLORS = ['#00A0DF', '#0088c2', '#006b99', '#004c70', '#003347'];
  const PHONE_COLORS = ['#00A0DF', '#333333'];

  // For pie chart data
  const phoneData = [
    { name: 'With Phone', value: chartData.withPhone },
    { name: 'Without Phone', value: chartData.withoutPhone },
  ];

  const dashboardContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">Loading data...</p>
        </div>
      );
    }
    
    if (isError) {
      return (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">Error loading data. Please try again.</p>
        </div>
      );
    }
    
    if (!data?.data || data.data.length === 0) {
      return (
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <p className="text-gray-400">No contact messages to analyze.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">Total Messages</h3>
            <p className="text-4xl font-bold text-[#00A0DF]">{data?.data.length || 0}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">With Phone Number</h3>
            <p className="text-4xl font-bold text-[#00A0DF]">{chartData.withPhone}</p>
            <p className="text-gray-400 text-sm">
              {data?.data.length ? Math.round((chartData.withPhone / data.data.length) * 100) : 0}% of total
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">Unique Companies</h3>
            <p className="text-4xl font-bold text-[#00A0DF]">
              {Object.keys(chartData.byCompany).length}
            </p>
          </div>
        </div>
        
        {/* Messages by Day Chart */}
        <div className="bg-gray-900 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Messages by Day</h3>
          <div className="h-72">
            {chartData.byDay.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData.byDay}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none' }} 
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="count" name="Messages" fill="#00A0DF" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400">Not enough data for visualization</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Two Column Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Companies Chart */}
          <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-4">Top Companies</h3>
            <div className="h-72">
              {chartData.byCompany.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData.byCompany}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis type="number" stroke="#ccc" />
                    <YAxis dataKey="company" type="category" stroke="#ccc" width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', border: 'none' }} 
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" name="Messages" fill="#00A0DF" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Not enough data for visualization</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Phone Number Distribution */}
          <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-4">Phone Number Distribution</h3>
            <div className="h-72">
              {(chartData.withPhone > 0 || chartData.withoutPhone > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={phoneData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {phoneData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PHONE_COLORS[index % PHONE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', border: 'none' }} 
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Not enough data for visualization</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recent Messages */}
        <div className="bg-gray-900 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Company</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.slice(0, 5).map((message) => (
                  <tr key={message.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">{message.name}</td>
                    <td className="py-3 px-4">{message.email}</td>
                    <td className="py-3 px-4">{message.company || '-'}</td>
                    <td className="py-3 px-4">{new Date(message.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Use our custom admin layout
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Contact Form Analytics</h2>
            <p className="text-gray-400">Visualize metrics from contact form submissions</p>
          </div>
          <Link 
            href="/admin/contact-messages" 
            className="bg-gray-800 text-white px-4 py-2 rounded font-medium hover:bg-gray-700 transition-colors"
          >
            View All Messages
          </Link>
        </div>
        
        {dashboardContent()}
      </div>
    </AdminLayout>
  );
}