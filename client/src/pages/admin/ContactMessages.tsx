import { useQuery } from "@tanstack/react-query";
import { ContactMessage } from "@shared/schema";
import AdminLayout from "@/components/layout/AdminLayout";

export default function ContactMessages() {
  const { data, isLoading, isError } = useQuery<{ success: boolean; data: ContactMessage[] }>({
    queryKey: ['/api/contact-messages'],
  });

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
      return dateString; // Return original string if date parsing fails
    }
  };

  const Content = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">Loading messages...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">Error loading messages. Please try again.</p>
        </div>
      );
    }

    if (data?.data.length === 0) {
      return (
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <p className="text-gray-400">No contact messages yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {data?.data.map((message) => (
          <div key={message.id} className="bg-gray-900 rounded-lg p-6">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-[#00A0DF]">{message.name}</h3>
              <span className="text-sm text-gray-400">{formatDate(message.createdAt)}</span>
            </div>
            <div className="text-sm text-gray-400 mb-2">
              <span>{message.email}</span>
              {message.company && <span> | {message.company}</span>}
              {message.phone && <span> | {message.phone}</span>}
            </div>
            <p className="mt-3 whitespace-pre-wrap">{message.message}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout title="Contact Messages">
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-gray-400">View all contact form submissions</p>
        </div>
        <Content />
      </div>
    </AdminLayout>
  );
}