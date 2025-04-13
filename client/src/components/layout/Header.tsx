import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { menuItems, topBarLinks } from "@/lib/data";
import MegaMenu from "@/components/ui/MegaMenu";
import { Search, User, LogIn, LogOut, Settings, BarChart, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [location] = useLocation();
  const adminMenuRef = useRef<HTMLDivElement>(null);
  const { user, openLoginDialog, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on navigation
    setMobileMenuOpen(false);
    setAdminMenuOpen(false);
  }, [location]);

  // Add click outside handler for admin dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setAdminMenuOpen(false);
      }
    };

    if (adminMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [adminMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleAdminMenu = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };

  const handleMenuItemHover = (index: number) => {
    setOpenMenuIndex(index);
  };

  const handleMenuItemLeave = () => {
    setOpenMenuIndex(null);
  };

  const handleCloseMegaMenu = () => {
    setOpenMenuIndex(null);
  };

  const handleLogin = () => {
    openLoginDialog();
    setAdminMenuOpen(false);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    setAdminMenuOpen(false);
  };

  // Map menu item labels to appropriate routes
  const getMenuItemRoute = (label: string): string => {
    switch (label) {
      case 'What we do':
        return '/what-we-do';
      case 'Who we are':
        return '/who-we-are';
      case 'Insights':
        return '/insights';
      case 'Careers':
        return '/careers';
      case 'Newsroom':
        return '/newsroom';
      case 'Investors':
        return '/investors';
      default:
        return '/';
    }
  };

  return (
    <header className={`bg-black shadow-md fixed w-full z-50 transition-shadow ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <nav className="flex justify-between items-center py-4">
          {/* TCS Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img 
                src="https://www.tcs.com/etc.clientlibs/tcs/clientlibs/clientlib-site/resources/images/tata-consultancy-services-logo-tata-group-white.svg" 
                alt="TCS Logo" 
                className="h-8 mr-2"
              />
            </div>
          </Link>
          
          {/* Main Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <div 
                  key={index} 
                  className="menu-item relative"
                  onMouseEnter={() => handleMenuItemHover(index)}
                  onMouseLeave={handleMenuItemLeave}
                >
                  <Link 
                    href={getMenuItemRoute(item.label)}
                    className="py-2 text-white hover:text-[#00A0DF] font-medium text-sm inline-block"
                  >
                    {item.label} {item.submenu && <span>▾</span>}
                  </Link>
                  {item.submenu && (
                    <MegaMenu 
                      isOpen={openMenuIndex === index}
                      categories={item.submenu.categories}
                      onClose={handleCloseMegaMenu}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Admin Dropdown */}
            <div className="relative" ref={adminMenuRef}>
              <button 
                onClick={toggleAdminMenu}
                className="flex items-center text-white hover:text-[#00A0DF] text-xs font-semibold tracking-wider"
              >
                <User size={18} className="mr-1" />
                <span>{user ? 'ADMIN' : 'SIGN IN'}</span>
                <span className="ml-1">▾</span>
              </button>
              
              {adminMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded shadow-lg z-50">
                  <div className="py-2">
                    {user ? (
                      <>
                        <Link 
                          href="/admin" 
                          className="flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-[#00A0DF]"
                        >
                          <Settings size={16} className="mr-2" />
                          Dashboard
                        </Link>
                        <Link 
                          href="/admin/analytics" 
                          className="flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-[#00A0DF]"
                        >
                          <BarChart size={16} className="mr-2" />
                          Analytics
                        </Link>
                        <Link 
                          href="/admin/contact-messages" 
                          className="flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-[#00A0DF]"
                        >
                          <MessageSquare size={16} className="mr-2" />
                          Messages
                        </Link>
                        <div className="border-t border-gray-800 my-1"></div>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-[#00A0DF]"
                        >
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={handleLogin}
                          className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-[#00A0DF]"
                        >
                          <LogIn size={16} className="mr-2" />
                          Login
                        </button>
                        <div className="border-t border-gray-800 my-1"></div>
                        <div className="px-4 py-2 text-xs text-gray-400">
                          Admin password: admin123
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {topBarLinks.map((link, index) => {
              const href = link.label === 'CONTACT US' ? '/contact' : '#';
              return (
                <Link 
                  key={index} 
                  href={href}
                  className="text-white hover:text-[#00A0DF] text-xs font-semibold tracking-wider"
                >
                  {link.label}
                </Link>
              );
            })}
            <button className="text-white hover:text-[#00A0DF]">
              <Search size={20} />
            </button>
            <Link href="/" className="ml-2">
              <img 
                src="https://www.tcs.com/content/dam/global-tcs/en/images/home/tata-logo-white.svg" 
                alt="TATA Logo" 
                className="h-6"
              />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} bg-black w-full py-4 shadow-lg md:hidden`}>
        <div className="container mx-auto px-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={getMenuItemRoute(item.label)} 
                  className="block py-2 text-white font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/contact" 
                className="block py-2 text-white font-medium"
              >
                CONTACT US
              </Link>
            </li>
            
            {/* Mobile Admin Options */}
            <li className="pt-2 border-t border-gray-800">
              <div className="text-white font-medium py-2 flex items-center">
                <User size={16} className="mr-2" />
                {user ? 'ADMIN MENU' : 'ADMIN SIGN IN'}
              </div>
              <ul className="ml-6 mt-1 space-y-2">
                {user ? (
                  <>
                    <li>
                      <Link 
                        href="/admin" 
                        className="block py-1 text-gray-300 hover:text-[#00A0DF] flex items-center"
                      >
                        <Settings size={14} className="mr-2" />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/admin/analytics" 
                        className="block py-1 text-gray-300 hover:text-[#00A0DF] flex items-center"
                      >
                        <BarChart size={14} className="mr-2" />
                        Analytics
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/admin/contact-messages" 
                        className="block py-1 text-gray-300 hover:text-[#00A0DF] flex items-center"
                      >
                        <MessageSquare size={14} className="mr-2" />
                        Messages
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="block py-1 text-gray-300 hover:text-[#00A0DF] flex items-center"
                      >
                        <LogOut size={14} className="mr-2" />
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button 
                        onClick={handleLogin}
                        className="block py-1 text-gray-300 hover:text-[#00A0DF] flex items-center"
                      >
                        <LogIn size={14} className="mr-2" />
                        Login (password: admin123)
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
