import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { SubMenuCategory, SubMenuLink } from "@shared/types";

interface MegaMenuProps {
  isOpen: boolean;
  categories: SubMenuCategory[];
  onClose: () => void;
}

export default function MegaMenu({ isOpen, categories, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  // Function to generate route path from category and link
  const generatePath = (category: string, link: string): string => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    
    // Handle special cases first
    if (category === "Overview") {
      if (link === "Overview") {
        return "/what-we-do";
      }
    }
    
    if (category === "Industries") {
      if (link === "Industries") {
        return "/what-we-do/industries";
      }
      return `/what-we-do/industries/${link.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    if (category === "Services") {
      if (link === "Services") {
        return "/what-we-do/services";
      }
      return `/what-we-do/services/${link.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    if (category === "Products and Platforms") {
      if (link === "Overview") {
        return "/what-we-do/products-platforms";
      }
      return `/what-we-do/products-platforms/${link.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    if (category === "Research & Innovation") {
      if (link === "Overview") {
        return "/what-we-do/research-innovation";
      }
      return `/what-we-do/research-innovation/${link.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    if (category === "About Us") {
      if (link === "About Us") {
        return "/who-we-are/about";
      }
      return `/who-we-are/${link.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    if (category === "Partners & Alliances") {
      if (link === "Overview") {
        return "/who-we-are/partners";
      }
      return `/who-we-are/partners/${link.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    if (category === "Perspectives") {
      if (link === "All Perspectives") {
        return "/insights/perspectives";
      }
      return `/insights/${link.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    if (category === "Research and Innovation") {
      return `/insights/research/${link.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    // Default case
    return `/${categorySlug}/${link.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div 
      ref={menuRef}
      className="mega-menu absolute left-0 w-screen bg-black shadow-lg p-8 mt-3 grid grid-cols-1 md:grid-cols-5 gap-8 z-50 animate-fadeIn border-t border-gray-800"
    >
      {categories.map((category, index) => (
        <div key={index} className="mb-6">
          <h3 className="font-medium text-gray-400 mb-3 text-sm uppercase tracking-wide">{category.title}</h3>
          <ul className="space-y-1.5">
            {category.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link 
                  href={generatePath(category.title, link.label)} 
                  className="text-white hover:text-[#00A0DF] text-sm font-normal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
