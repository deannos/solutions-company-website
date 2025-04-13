import { useState, useEffect } from "react";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="py-16 bg-[#0033A0] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Hear directly from our clients about their experience working with TCS
          </p>
        </div>
        
        <div className="testimonial-slider relative max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`testimonial-slide bg-white/10 p-8 rounded-lg backdrop-blur-sm transition-opacity duration-500 ${currentTestimonial === index ? 'block opacity-100' : 'hidden opacity-0'}`}
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-white/80">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
              <blockquote className="text-lg italic">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${currentTestimonial === index ? 'bg-white/80' : 'bg-white/30'}`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
