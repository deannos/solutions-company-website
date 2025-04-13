import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";

export default function Investors() {
  const financialResults = [
    { quarter: "Q4", year: "2022-23", date: "April 12, 2023" },
    { quarter: "Q3", year: "2022-23", date: "January 9, 2023" },
    { quarter: "Q2", year: "2022-23", date: "October 10, 2022" },
    { quarter: "Q1", year: "2022-23", date: "July 8, 2022" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Investor Relations</h1>
          
          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              Access financial information, reports, and resources for TCS investors and stakeholders.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Stock Information</h2>
              <div className="mb-4">
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span>BSE</span>
                  <span className="font-bold">3,471.85 <span className="text-green-500">+1.75%</span></span>
                </div>
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span>NSE</span>
                  <span className="font-bold">3,473.20 <span className="text-green-500">+1.82%</span></span>
                </div>
                <div className="text-sm text-gray-400 mt-2">As of April 8, 2023 - 16:00 IST</div>
              </div>
              <Link href="/investors/stock-info">
                <a className="text-[#00A0DF] font-medium hover:underline">View detailed stock information →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Financial Highlights</h2>
              <div className="mb-4">
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span>Revenue (FY 2022-23)</span>
                  <span className="font-bold">$25.7 Billion</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span>Net Income (FY 2022-23)</span>
                  <span className="font-bold">$5.2 Billion</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span>Operating Margin</span>
                  <span className="font-bold">24.3%</span>
                </div>
              </div>
              <Link href="/investors/financial-highlights">
                <a className="text-[#00A0DF] font-medium hover:underline">View detailed financials →</a>
              </Link>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Financial Results</h2>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="py-3 px-4 text-left">Quarter</th>
                    <th className="py-3 px-4 text-left">Financial Year</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {financialResults.map((result, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3 px-4">{result.quarter}</td>
                      <td className="py-3 px-4">{result.year}</td>
                      <td className="py-3 px-4">{result.date}</td>
                      <td className="py-3 px-4">
                        <Link href={`/investors/results/${result.year}/${result.quarter.toLowerCase()}`}>
                          <a className="text-[#00A0DF] hover:underline">View</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link href="/investors/results">
                <a className="text-[#00A0DF] font-medium hover:underline">View all results →</a>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#00A0DF]">Annual Reports</h2>
              <p className="mb-4">Access our annual reports and financial statements.</p>
              <Link href="/investors/annual-reports">
                <a className="text-[#00A0DF] font-medium hover:underline">View reports →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#00A0DF]">Investor Presentations</h2>
              <p className="mb-4">Browse our latest investor presentations and roadshows.</p>
              <Link href="/investors/presentations">
                <a className="text-[#00A0DF] font-medium hover:underline">View presentations →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#00A0DF]">ESG</h2>
              <p className="mb-4">Learn about our Environmental, Social, and Governance initiatives.</p>
              <Link href="/investors/esg">
                <a className="text-[#00A0DF] font-medium hover:underline">Learn more →</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}