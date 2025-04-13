import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { newsItems } from "@/lib/data";

export default function Newsroom() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Newsroom</h1>
          
          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              Stay updated with the latest news, press releases, and announcements from TCS.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {newsItems.map((news) => (
              <div key={news.id} className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[#00A0DF]">{news.category}</span>
                  <span className="text-sm text-gray-400">{news.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{news.title}</h3>
                <p className="text-gray-300 mb-4">{news.description}</p>
                <Link href={news.link}>
                  <a className="text-[#00A0DF] font-medium hover:underline">Read more →</a>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">News Archives</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href="/newsroom/2022">
                <a className="bg-gray-900 p-4 rounded text-center hover:bg-gray-800">2022</a>
              </Link>
              <Link href="/newsroom/2021">
                <a className="bg-gray-900 p-4 rounded text-center hover:bg-gray-800">2021</a>
              </Link>
              <Link href="/newsroom/2020">
                <a className="bg-gray-900 p-4 rounded text-center hover:bg-gray-800">2020</a>
              </Link>
              <Link href="/newsroom/archive">
                <a className="bg-gray-900 p-4 rounded text-center hover:bg-gray-800">All Archives</a>
              </Link>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Press Releases</h2>
              <p className="mb-4">Browse our official press releases and announcements.</p>
              <Link href="/newsroom/press-releases">
                <a className="text-[#00A0DF] font-medium hover:underline">View all press releases →</a>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#00A0DF]">Media Contacts</h2>
              <p className="mb-4">Get in touch with our media relations team.</p>
              <Link href="/newsroom/media-contacts">
                <a className="text-[#00A0DF] font-medium hover:underline">Contact media team →</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}