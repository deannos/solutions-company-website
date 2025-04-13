// Navigation
export interface MenuItem {
  label: string;
  href: string;
  submenu?: {
    categories: SubMenuCategory[];
  };
}

export interface SubMenuCategory {
  title: string;
  links: SubMenuLink[];
}

export interface SubMenuLink {
  label: string;
  href: string;
}

// Hero Carousel
export interface HeroSlide {
  id: number;
  tagline: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: string;
}

// Services
export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

// Industries
export interface IndustryItem {
  id: number;
  title: string;
  icon: string;
  href: string;
}

// Testimonials
export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
}

// Insights
export interface InsightArticle {
  id: number;
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

// News
export interface NewsItem {
  id: number;
  date: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

// Events
export interface EventItem {
  id: number;
  date: {
    day: string;
    month: string;
  };
  title: string;
  description: string;
  location: string;
  time: string;
  isOnline: boolean;
  link: string;
}
