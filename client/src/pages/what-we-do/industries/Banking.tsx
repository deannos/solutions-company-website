import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";

export default function Banking() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center text-sm mb-6">
            <Link href="/">
              <a className="text-gray-400 hover:text-[#00A0DF]">Home</a>
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <Link href="/what-we-do">
              <a className="text-gray-400 hover:text-[#00A0DF]">What We Do</a>
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <Link href="/what-we-do/industries">
              <a className="text-gray-400 hover:text-[#00A0DF]">Industries</a>
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-[#00A0DF]">Banking</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">Banking</h1>

          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              DWS partners with leading banks globally to help them transform
              their operations, enhance customer experience, and navigate the
              changing regulatory landscape.
            </p>
          </div>

          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
              alt="Banking Technology"
              className="w-full h-80 md:h-96 object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#00A0DF]">
                Digital Banking Transformation
              </h2>
              <p className="mb-4">
                Help banks create seamless, personalized digital experiences
                across channels and touchpoints.
              </p>
              <Link href="#digital-banking">
                <a className="text-[#00A0DF] font-medium hover:underline">
                  Learn more →
                </a>
              </Link>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#00A0DF]">
                Core Banking Modernization
              </h2>
              <p className="mb-4">
                Transform legacy systems to create agile, future-ready core
                banking platforms.
              </p>
              <Link href="#core-banking">
                <a className="text-[#00A0DF] font-medium hover:underline">
                  Learn more →
                </a>
              </Link>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#00A0DF]">
                Risk & Compliance
              </h2>
              <p className="mb-4">
                Navigate complex regulatory requirements with intelligent
                compliance solutions.
              </p>
              <Link href="#risk-compliance">
                <a className="text-[#00A0DF] font-medium hover:underline">
                  Learn more →
                </a>
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Banking Solutions</h2>
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-[#00A0DF]">
                    DWS BaNCS
                  </h3>
                  <p className="mb-4">
                    A comprehensive suite of solutions for banks, capital
                    markets, and insurance firms that helps them become more
                    agile and intelligent.
                  </p>
                  <Link href="/what-we-do/products-platforms/tcs-bancs">
                    <a className="text-[#00A0DF] font-medium hover:underline">
                      Explore DWS BaNCS →
                    </a>
                  </Link>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-[#00A0DF]">
                    Quartz Blockchain
                  </h3>
                  <p className="mb-4">
                    A comprehensive set of blockchain solutions and services for
                    creating, deploying, and managing distributed ledger
                    applications.
                  </p>
                  <Link href="/what-we-do/products-platforms/quartz">
                    <a className="text-[#00A0DF] font-medium hover:underline">
                      Explore Quartz →
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                  alt="Banking Case Study"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Leading European Bank Transforms Digital Experience
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Learn how a major European bank partnered with DWS to
                    transform its digital channels and improve customer
                    experience.
                  </p>
                  <Link href="/insights/case-studies/european-bank">
                    <a className="text-[#00A0DF] font-medium hover:underline">
                      Read case study →
                    </a>
                  </Link>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                  alt="Banking Case Study"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    US Bank Accelerates Cloud Migration
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Discover how a US-based bank worked with DWS to migrate its
                    applications to the cloud and reduce operational costs.
                  </p>
                  <Link href="/insights/case-studies/us-bank-cloud">
                    <a className="text-[#00A0DF] font-medium hover:underline">
                      Read case study →
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
