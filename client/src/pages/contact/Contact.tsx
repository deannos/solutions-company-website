import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Extend schema with more validations
const contactFormSchema = insertContactMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    }
  });
  
  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('/api/contact', 'POST', data);
    },
    onSuccess: (response) => {
      console.log("Success response:", response);
      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      reset();
      setFormSuccess(true);
    },
    onError: (error: any) => {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: error?.message || "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl mb-8">
                Whether you're looking to transform your business or want to join our team, we're here to help.
              </p>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Global Headquarters</h2>
                <address className="not-italic">
                  <p>TCS House</p>
                  <p>Raveline Street</p>
                  <p>Fort, Mumbai 400 001</p>
                  <p>Maharashtra, India</p>
                  <p className="mt-2">Phone: +91 22 6778 9999</p>
                </address>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Regional Offices</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold mb-2">North America</h3>
                    <p>New York, USA</p>
                    <p>Phone: +1 212 245 0044</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Europe</h3>
                    <p>London, UK</p>
                    <p>Phone: +44 20 7245 1500</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
              {formSuccess ? (
                <div className="bg-green-900/20 border border-green-500 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-green-400 mb-2">Message Sent!</h3>
                  <p>Thank you for your message. Our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setFormSuccess(false)}
                    className="mt-4 text-[#00A0DF] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">Name*</label>
                    <input
                      id="name"
                      type="text"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#00A0DF]"
                      placeholder="Your name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1">Email*</label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#00A0DF]"
                      placeholder="Your email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block mb-1">Company</label>
                      <input
                        id="company"
                        type="text"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#00A0DF]"
                        placeholder="Your company"
                        {...register("company")}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block mb-1">Phone</label>
                      <input
                        id="phone"
                        type="text"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#00A0DF]"
                        placeholder="Your phone number"
                        {...register("phone")}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1">Message*</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#00A0DF]"
                      placeholder="How can we help you?"
                      {...register("message")}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="w-full md:w-auto bg-[#00A0DF] text-white px-6 py-3 rounded font-medium hover:bg-[#0088c2] transition-colors"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}