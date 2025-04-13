import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";

export default function WhoWeAre() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Who We Are</h1>
          
          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              TCS is an IT services, consulting and business solutions organization that has been partnering with the world's largest businesses in their transformation journeys for the last fifty years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">About Us</h2>
              <p className="mb-4">Learn about our company, leadership, values, and history that have shaped us into an industry leader.</p>
              <Link href="/who-we-are/about">
                <a className="text-[#00A0DF] font-medium hover:underline">Read more →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Partners & Alliances</h2>
              <p className="mb-4">Discover our strategic partnerships and alliances that help us deliver exceptional value to clients.</p>
              <Link href="/who-we-are/partners">
                <a className="text-[#00A0DF] font-medium hover:underline">Read more →</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}