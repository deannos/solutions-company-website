import { services } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Driving digital transformation and business growth through our comprehensive portfolio of services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#00A0DF] mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <a 
                  href={service.link}
                  className="text-[#00A0DF] font-medium flex items-center"
                >
                  Learn More <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="#" 
            className="inline-block border-2 border-[#00A0DF] text-[#00A0DF] px-8 py-3 rounded-full font-medium hover:bg-[#00A0DF] hover:text-gray-900 transition-colors"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}
