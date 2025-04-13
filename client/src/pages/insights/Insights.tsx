import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { insights } from "@/lib/data";

export default function Insights() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Insights</h1>
          
          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              Discover our latest thinking, research, and insights on business transformation, technology innovation, and industry trends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {insights.map((insight) => (
              <div key={insight.id} className="bg-gray-900 rounded-lg overflow-hidden">
                <img 
                  src={insight.image} 
                  alt={insight.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#00A0DF]">{insight.category}</span>
                    <span className="text-sm text-gray-400">{insight.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                  <p className="text-gray-300 mb-4">{insight.description}</p>
                  <Link href={insight.link}>
                    <a className="text-[#00A0DF] font-medium hover:underline">Read more →</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Perspectives</h2>
              <p className="mb-4">Explore our thought leadership articles, blogs, and case studies.</p>
              <Link href="/insights/perspectives">
                <a className="text-[#00A0DF] font-medium hover:underline">View all perspectives →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Research and Innovation</h2>
              <p className="mb-4">Discover our latest research papers and innovation stories.</p>
              <Link href="/insights/research">
                <a className="text-[#00A0DF] font-medium hover:underline">Explore research →</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}