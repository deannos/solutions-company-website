import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";

export default function Careers() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Careers at DWS</h1>

          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              Join DWS and be part of a global team that's transforming
              businesses through technology and innovation.
            </p>
          </div>

          <div className="bg-[#00A0DF] p-8 rounded-lg text-black mb-12">
            <h2 className="text-2xl font-bold mb-4">Find Your Perfect Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <select className="w-full p-3 rounded">
                  <option>Select Location</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia Pacific</option>
                  <option>India</option>
                  <option>Middle East & Africa</option>
                  <option>Latin America</option>
                </select>
              </div>
              <div>
                <select className="w-full p-3 rounded">
                  <option>Select Experience Level</option>
                  <option>Students & Graduates</option>
                  <option>Experienced Professionals</option>
                  <option>Leadership</option>
                </select>
              </div>
              <div>
                <button className="w-full bg-gray-900 text-white p-3 rounded font-medium hover:bg-gray-800">
                  Search Jobs
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">
                Students & Graduates
              </h2>
              <p className="mb-4">
                Start your career journey with DWS and gain valuable experience
                in cutting-edge technologies.
              </p>
              <Link href="/careers/students">
                <a className="text-[#00A0DF] font-medium hover:underline">
                  Learn more →
                </a>
              </Link>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">
                Experienced Professionals
              </h2>
              <p className="mb-4">
                Take your career to the next level with challenging
                opportunities across industries and technologies.
              </p>
              <Link href="/careers/professionals">
                <a className="text-[#00A0DF] font-medium hover:underline">
                  Learn more →
                </a>
              </Link>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">
                Life at DWS
              </h2>
              <p className="mb-4">
                Discover our culture, benefits, and what makes DWS a great place
                to build your career.
              </p>
              <Link href="/careers/life-at-tcs">
                <a className="text-[#00A0DF] font-medium hover:underline">
                  Learn more →
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
