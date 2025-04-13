import { useQuery } from "@tanstack/react-query";
import { ContactMessage } from "@shared/schema";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

export default function AdminAnalytics() {
  const { data, isLoading, isError } = useQuery<{ success: boolean; data: ContactMessage[] }>({
    queryKey: ['/api/contact-messages'],
  });

  // Process data for time-based analysis
  const processTimeData = () => {
    if (!data?.data || data.data.length === 0) {
      return {
        hourly: [],
        dayOfWeek: [],
      };
    }

    // Initialize counters
    const hourCount: Record<number, number> = {};
    const dayCount: Record<number, number> = {};

    // Count messages by hour and day of week
    data.data.forEach((message) => {
      const date = new Date(message.createdAt);
      const hour = date.getHours();
      const day = date.getDay();

      hourCount[hour] = (hourCount[hour] || 0) + 1;
      dayCount[day] = (dayCount[day] || 0) + 1;
    });

    // Format data for charts
    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: hourCount[i] || 0,
      label: `${i}:00`,
    }));

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekData = Array.from({ length: 7 }, (_, i) => ({
      day: i,
      count: dayCount[i] || 0,
      name: dayNames[i],
    }));

    return {
      hourly: hourlyData,
      dayOfWeek: dayOfWeekData,
    };
  };

  // Process data for email domain analysis
  const processEmailData = () => {
    if (!data?.data || data.data.length === 0) {
      return [];
    }

    // Count emails by domain
    const domainCount: Record<string, number> = {};
    
    data.data.forEach((message) => {
      const email = message.email;
      const domain = email.split('@')[1] || 'unknown';
      
      domainCount[domain] = (domainCount[domain] || 0) + 1;
    });

    // Convert to array and sort by count
    return Object.entries(domainCount)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 domains
  };

  // Process message length data
  const processMessageLengthData = () => {
    if (!data?.data || data.data.length === 0) {
      return [];
    }

    // Define length buckets
    const buckets = [
      { min: 0, max: 50, label: '0-50 chars' },
      { min: 51, max: 100, label: '51-100 chars' },
      { min: 101, max: 200, label: '101-200 chars' },
      { min: 201, max: 500, label: '201-500 chars' },
      { min: 501, max: Infinity, label: '500+ chars' },
    ];

    // Initialize bucket counts
    const lengthCounts: Record<string, number> = {};
    buckets.forEach(bucket => {
      lengthCounts[bucket.label] = 0;
    });

    // Count messages by length bucket
    data.data.forEach((message) => {
      const length = message.message.length;
      
      // Find which bucket this length belongs to
      const bucket = buckets.find(b => length >= b.min && length <= b.max);
      if (bucket) {
        lengthCounts[bucket.label]++;
      }
    });

    // Convert to array format for chart
    return Object.entries(lengthCounts).map(([label, count]) => ({
      label,
      count,
    }));
  };

  const timeData = processTimeData();
  const emailData = processEmailData();
  const messageLengthData = processMessageLengthData();
  
  const COLORS = ['#00A0DF', '#0088c2', '#006b99', '#004c70', '#003347', '#001824'];

  const analyticsContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">Loading analytics data...</p>
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
        {/* Messages by Time of Day */}
        <div className="bg-gray-900 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Messages by Time of Day</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeData.hourly}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis 
                  dataKey="label" 
                  stroke="#ccc"
                  tick={{ fill: '#ccc' }}
                  tickFormatter={(value) => value}
                />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: any) => [`${value} messages`, 'Count']}
                  labelFormatter={(label) => `Hour: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Messages"
                  stroke="#00A0DF"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Message by Day of Week */}
          <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-4">Messages by Day of Week</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timeData.dayOfWeek}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ccc"
                    tick={{ fill: '#ccc' }}
                  />
                  <YAxis stroke="#ccc" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Messages" 
                    fill="#00A0DF" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Top Email Domains */}
          <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-4">Top Email Domains</h3>
            <div className="h-72">
              {emailData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emailData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="domain"
                      label={({ domain, percent }) => `${domain}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {emailData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value: any) => [`${value} messages`, 'Count']}
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
        
        {/* Message Length Distribution */}
        <div className="bg-gray-900 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Message Length Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={messageLengthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis 
                  dataKey="label" 
                  stroke="#ccc"
                  tick={{ fill: '#ccc' }}
                />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: any) => [`${value} messages`, 'Count']}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Message Count" 
                  fill="#00A0DF" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout title="Analytics Dashboard">
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-gray-400">In-depth analysis of contact form submissions</p>
        </div>
        {analyticsContent()}
      </div>
    </AdminLayout>
  );
}