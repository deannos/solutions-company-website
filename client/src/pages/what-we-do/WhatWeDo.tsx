import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function WhatWeDo() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">What We Do</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Industries</h2>
              <p className="mb-4">We serve clients across various industries with specialized solutions and domain expertise.</p>
              <Link href="/what-we-do/industries">
                <a className="text-[#00A0DF] font-medium hover:underline">Learn more →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Services</h2>
              <p className="mb-4">Our comprehensive services portfolio helps organizations transform and grow.</p>
              <Link href="/what-we-do/services">
                <a className="text-[#00A0DF] font-medium hover:underline">Learn more →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Products and Platforms</h2>
              <p className="mb-4">Innovative products and platforms that accelerate digital transformation.</p>
              <Link href="/what-we-do/products-platforms">
                <a className="text-[#00A0DF] font-medium hover:underline">Learn more →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Research & Innovation</h2>
              <p className="mb-4">Explore our groundbreaking research and innovation initiatives.</p>
              <Link href="/what-we-do/research-innovation">
                <a className="text-[#00A0DF] font-medium hover:underline">Learn more →</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}