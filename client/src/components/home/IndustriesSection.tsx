import { industries } from "@/lib/data";

export default function IndustriesSection() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Industries We Serve</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Helping businesses across industries innovate and transform for sustainable growth
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {industries.map((industry) => (
            <a 
              key={industry.id}
              href={industry.href} 
              className="bg-gray-800 p-8 rounded-lg shadow text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <i className={`fas fa-${industry.icon} text-4xl text-[#00A0DF] mb-4`}></i>
              <h3 className="font-medium text-white">{industry.title}</h3>
            </a>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="#" 
            className="inline-block border-2 border-[#00A0DF] text-[#00A0DF] px-8 py-3 rounded-full font-medium hover:bg-[#00A0DF] hover:text-black transition-colors"
          >
            Explore All Industries
          </a>
        </div>
      </div>
    </section>
  );
}
