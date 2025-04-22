import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Services</h1>

          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              Explore DWS's comprehensive portfolio of services designed to help
              enterprises navigate their transformation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <Link
                    href={`/what-we-do/services/${service.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <a className="text-[#00A0DF] font-medium hover:underline">
                      Learn more →
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Business 4.0™ Framework</h2>
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4">
                    Our Business 4.0™ framework helps organizations leverage
                    digital technologies to address business challenges and
                    create new opportunities.
                  </p>
                  <p className="mb-4">
                    The framework focuses on four key behaviors:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Driving mass personalization</li>
                    <li>Creating exponential value</li>
                    <li>Leveraging ecosystems</li>
                    <li>Embracing risk</li>
                  </ul>
                  <Link href="/what-we-do/services/business-4-0">
                    <a className="text-[#00A0DF] font-medium hover:underline">
                      Discover Business 4.0™ →
                    </a>
                  </Link>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                    alt="Business 4.0 Framework"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link href="/what-we-do/services/cognitive-business-operations">
              <a className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
                <h3 className="text-lg font-bold mb-2 text-[#00A0DF]">
                  Cognitive Business Operations
                </h3>
                <p className="text-sm text-gray-300">
                  Using AI and automation to transform business operations
                </p>
              </a>
            </Link>

            <Link href="/what-we-do/services/consulting">
              <a className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
                <h3 className="text-lg font-bold mb-2 text-[#00A0DF]">
                  Consulting
                </h3>
                <p className="text-sm text-gray-300">
                  Strategic business and technology consulting services
                </p>
              </a>
            </Link>

            <Link href="/what-we-do/services/cybersecurity">
              <a className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
                <h3 className="text-lg font-bold mb-2 text-[#00A0DF]">
                  Cybersecurity
                </h3>
                <p className="text-sm text-gray-300">
                  Comprehensive security services and solutions
                </p>
              </a>
            </Link>

            <Link href="/what-we-do/services/iot-digital-engineering">
              <a className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
                <h3 className="text-lg font-bold mb-2 text-[#00A0DF]">
                  IoT & Digital Engineering
                </h3>
                <p className="text-sm text-gray-300">
                  Engineering the connected future
                </p>
              </a>
            </Link>

            <Link href="/what-we-do/services/tcs-interactive">
              <a className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
                <h3 className="text-lg font-bold mb-2 text-[#00A0DF]">
                  DWS Interactive
                </h3>
                <p className="text-sm text-gray-300">
                  Digital design and customer experience solutions
                </p>
              </a>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
