import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { industries } from "@/lib/data";

export default function Industries() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Industries</h1>

          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              DWS partners with enterprises across industries, helping them
              harness the power of technology to achieve their business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/what-we-do/industries/${industry.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <a className="bg-gray-900 p-6 rounded-lg transition-transform hover:transform hover:scale-105">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#00A0DF]/20 mb-4">
                    <i
                      className={`fas fa-${industry.icon} text-[#00A0DF] text-2xl`}
                    ></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{industry.title}</h3>
                  <p className="text-gray-300 mb-4">
                    Explore how we're transforming the{" "}
                    {industry.title.toLowerCase()} industry with innovative
                    solutions.
                  </p>
                  <span className="text-[#00A0DF] font-medium">
                    Learn more →
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
