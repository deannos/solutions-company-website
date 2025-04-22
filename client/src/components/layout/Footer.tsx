import { Link } from "wouter";
import {
  footerServices,
  footerIndustries,
  footerCompany,
  footerResources,
} from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <a href="#" className="inline-block mb-6">
              <img
                src="/assets/deannoswork-logo.png"
                alt="DWS Logo"
                className="h-16"
              />
            </a>
            <p className="text-gray-400 mb-6">
              DeannosWork Solution is an IT services, consulting and business
              solutions organization that has been partnering with many of the
              world's largest businesses in their transformation journeys for
              over 50 years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-[#00A0DF]">Services</h4>
            <ul className="space-y-3">
              {footerServices.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00A0DF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-[#00A0DF]">
              Industries
            </h4>
            <ul className="space-y-3">
              {footerIndustries.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00A0DF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-[#00A0DF]">Company</h4>
            <ul className="space-y-3">
              {footerCompany.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00A0DF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-[#00A0DF]">Resources</h4>
            <ul className="space-y-3">
              {footerResources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00A0DF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-gray-400 text-sm">
              <p>
                &copy; {new Date().getFullYear()} DeannosWork Solution Limited.
                All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm md:justify-end">
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                Terms of Use
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00A0DF]">
                Accessibility
              </a>
              <Link
                href="/admin"
                className="text-gray-400 hover:text-[#00A0DF]"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
