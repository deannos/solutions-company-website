import { insights } from "@/lib/data";

export default function InsightsSection() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Latest Insights</h2>
            <p className="text-lg text-gray-300">
              Stay informed with our latest research, thought leadership, and industry perspectives
            </p>
          </div>
          <a href="#" className="hidden md:inline-block text-[#00A0DF] font-medium hover:underline">
            View All Insights <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((article) => (
            <article key={article.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-sm text-[#00A0DF] font-medium">{article.category}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-gray-400">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                <p className="text-gray-300 mb-4">{article.description}</p>
                <a 
                  href={article.link} 
                  className="text-[#00A0DF] font-medium flex items-center"
                >
                  Read More <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-10 md:hidden">
          <a 
            href="#" 
            className="inline-block border-2 border-[#00A0DF] text-[#00A0DF] px-8 py-3 rounded-full font-medium hover:bg-[#00A0DF] hover:text-gray-900 transition-colors"
          >
            View All Insights
          </a>
        </div>
      </div>
    </section>
  );
}
