import { useState } from "react";
import { newsItems, events } from "@/lib/data";

export default function NewsEventsSection() {
  const [currentNewsPage, setCurrentNewsPage] = useState(0);
  const [currentEventsPage, setCurrentEventsPage] = useState(0);

  const newsPerPage = 3;
  const eventsPerPage = 3;

  const totalNewsPages = Math.ceil(newsItems.length / newsPerPage);
  const totalEventsPages = Math.ceil(events.length / eventsPerPage);

  const displayedNews = newsItems.slice(
    currentNewsPage * newsPerPage,
    (currentNewsPage + 1) * newsPerPage
  );

  const displayedEvents = events.slice(
    currentEventsPage * eventsPerPage,
    (currentEventsPage + 1) * eventsPerPage
  );

  const handleNewsPrev = () => {
    setCurrentNewsPage((prev) => (prev - 1 + totalNewsPages) % totalNewsPages);
  };

  const handleNewsNext = () => {
    setCurrentNewsPage((prev) => (prev + 1) % totalNewsPages);
  };

  const handleEventsPrev = () => {
    setCurrentEventsPage(
      (prev) => (prev - 1 + totalEventsPages) % totalEventsPages
    );
  };

  const handleEventsNext = () => {
    setCurrentEventsPage((prev) => (prev + 1) % totalEventsPages);
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              News & Events
            </h2>
            <p className="text-lg text-gray-300">
              Stay updated with the latest news and upcoming events from DWS
            </p>
          </div>
          <div className="hidden md:flex space-x-3">
            <button
              className="w-10 h-10 bg-gray-800 rounded-full shadow-md flex items-center justify-center text-[#00A0DF] hover:bg-[#00A0DF] hover:text-gray-900 transition-colors"
              onClick={handleNewsPrev}
              aria-label="Previous news"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="w-10 h-10 bg-gray-800 rounded-full shadow-md flex items-center justify-center text-[#00A0DF] hover:bg-[#00A0DF] hover:text-gray-900 transition-colors"
              onClick={handleNewsNext}
              aria-label="Next news"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Latest News
              </h3>

              <div className="space-y-6">
                {displayedNews.map((newsItem, index) => (
                  <div
                    key={newsItem.id}
                    className={`${
                      index < displayedNews.length - 1
                        ? "border-b border-gray-700 pb-6"
                        : ""
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-400">
                        {newsItem.date}
                      </span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-sm text-[#00A0DF] font-medium">
                        {newsItem.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {newsItem.title}
                    </h4>
                    <p className="text-gray-300">{newsItem.description}</p>
                    <a
                      href={newsItem.link}
                      className="text-[#00A0DF] font-medium mt-2 inline-block hover:underline"
                    >
                      Read More
                    </a>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="text-[#00A0DF] font-medium mt-6 inline-block"
              >
                View All News <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Upcoming Events
              </h3>

              <div className="space-y-6">
                {displayedEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`flex ${
                      index < displayedEvents.length - 1
                        ? "border-b border-gray-700 pb-6"
                        : ""
                    }`}
                  >
                    <div className="flex-shrink-0 bg-[#00A0DF]/20 text-[#00A0DF] rounded-lg p-4 text-center mr-4">
                      <span className="block text-xl font-bold">
                        {event.date.day}
                      </span>
                      <span className="block text-sm">{event.date.month}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        {event.title}
                      </h4>
                      <p className="text-gray-300 mb-2">{event.description}</p>
                      <p className="text-sm text-gray-400">
                        <i
                          className={`fas fa-${
                            event.isOnline ? "globe" : "map-marker-alt"
                          } mr-1`}
                        ></i>{" "}
                        {event.location} | <i className="fas fa-clock mr-1"></i>{" "}
                        {event.time}
                      </p>
                      <a
                        href={event.link}
                        className="text-[#00A0DF] font-medium mt-2 inline-block hover:underline"
                      >
                        Register Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="text-[#00A0DF] font-medium mt-6 inline-block"
              >
                View All Events <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
