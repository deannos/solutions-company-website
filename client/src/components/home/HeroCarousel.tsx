import { useState, useEffect } from "react";
import { heroSlides } from "@/lib/data";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative bg-gray-900 h-[500px]">
      {heroSlides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`hero-slide absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <span className="bg-[#E31937] px-3 py-1 inline-block mb-4 text-sm font-medium">
                  {slide.tagline}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg mb-6">
                  {slide.description}
                </p>
                <a 
                  href={slide.cta.href} 
                  className="inline-block bg-[#E31937] text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
                >
                  {slide.cta.label}
                </a>
              </div>
            </div>
          </div>
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      
      {/* Carousel Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {heroSlides.map((_, index) => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
