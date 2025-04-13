export default function HighlightedContent() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="bg-[#00A0DF]/20 text-[#00A0DF] px-3 py-1 inline-block mb-4 text-sm font-medium rounded">
              INNOVATION
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Leading with Innovation in Business Transformation
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              We help organizations navigate their digital journey by harnessing technology to drive business transformation, enhance customer experiences, and create new business models.
            </p>
            <ul className="space-y-3 mb-8 text-gray-300">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#00A0DF] mt-1 mr-3"></i>
                <span>AI-powered solutions for intelligent enterprise</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#00A0DF] mt-1 mr-3"></i>
                <span>Cloud-first approach for agility and scalability</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#00A0DF] mt-1 mr-3"></i>
                <span>Advanced cybersecurity frameworks</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#00A0DF] mt-1 mr-3"></i>
                <span>Digital workplace solutions for enhanced productivity</span>
              </li>
            </ul>
            <a 
              href="#" 
              className="inline-block bg-[#E31937] text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
            >
              Discover Our Approach
            </a>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
              alt="Business Transformation" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
