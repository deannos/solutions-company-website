import {
  MenuItem,
  HeroSlide,
  ServiceItem,
  IndustryItem,
  Testimonial,
  InsightArticle,
  NewsItem,
  EventItem,
} from "@shared/types";

// Navigation Menu based on DWS website
export const menuItems: MenuItem[] = [
  {
    label: "What we do",
    href: "#",
    submenu: {
      categories: [
        {
          title: "Overview",
          links: [{ label: "Overview", href: "#" }],
        },
        {
          title: "Industries",
          links: [
            { label: "Banking", href: "#" },
            { label: "Capital Markets", href: "#" },
            { label: "Consumer Packaged Goods and Distribution", href: "#" },
            {
              label: "Communications, Media, and Information Services",
              href: "#",
            },
            { label: "Education", href: "#" },
            { label: "Energy, Resources, and Utilities", href: "#" },
            { label: "Healthcare", href: "#" },
            { label: "High Tech", href: "#" },
            { label: "Insurance", href: "#" },
            { label: "Life Sciences", href: "#" },
            { label: "Manufacturing", href: "#" },
            { label: "Public Services", href: "#" },
            { label: "Retail", href: "#" },
            { label: "Travel and Logistics", href: "#" },
          ],
        },
        {
          title: "Services",
          links: [
            { label: "Cognitive Business Operations", href: "#" },
            { label: "Consulting", href: "#" },
            { label: "Cybersecurity", href: "#" },
            { label: "IoT & Digital Engineering", href: "#" },
            { label: "DWS Interactive", href: "#" },
          ],
        },
        {
          title: "Products and Platforms",
          links: [
            { label: "Overview", href: "#" },
            { label: "DWS BaNCS", href: "#" },
            { label: "DWS ADD", href: "#" },
            { label: "DWS HOBS", href: "#" },
            { label: "ignio", href: "#" },
          ],
        },
        {
          title: "Research & Innovation",
          links: [
            { label: "Overview", href: "#" },
            { label: "DWS Research", href: "#" },
            { label: "DWS Pace", href: "#" },
            { label: "DWS Think Space", href: "#" },
          ],
        },
      ],
    },
  },
  {
    label: "Who we are",
    href: "#",
    submenu: {
      categories: [
        {
          title: "About Us",
          links: [
            { label: "About Us", href: "#" },
            { label: "Leadership", href: "#" },
            { label: "Sustainability", href: "#" },
            { label: "Diversity & Inclusion", href: "#" },
            { label: "Sports Sponsorships", href: "#" },
          ],
        },
        {
          title: "Partners & Alliances",
          links: [
            { label: "Overview", href: "#" },
            { label: "Strategic Technology Partners", href: "#" },
            { label: "Co-Innovation Network", href: "#" },
          ],
        },
      ],
    },
  },
  {
    label: "Insights",
    href: "#",
    submenu: {
      categories: [
        {
          title: "Perspectives",
          links: [
            { label: "All Perspectives", href: "#" },
            { label: "Articles", href: "#" },
            { label: "Blogs", href: "#" },
            { label: "Case Studies", href: "#" },
          ],
        },
        {
          title: "Research and Innovation",
          links: [
            { label: "Research Papers", href: "#" },
            { label: "Innovation Stories", href: "#" },
          ],
        },
      ],
    },
  },
  {
    label: "Careers",
    href: "#",
  },
  {
    label: "Newsroom",
    href: "#",
  },
  {
    label: "Investors",
    href: "#",
  },
];

export const topBarLinks = [
  { label: "CONTACT US", href: "#contact" },
  { label: "DWS WORLDWIDE", href: "#" },
];

// Hero Carousel
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    tagline: "WHAT'S NEW",
    title: "Digital Transformation Redefined",
    description:
      "Building on belief with TCS's innovative business solutions and technology services.",
    cta: {
      label: "Learn More",
      href: "#",
    },
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    tagline: "INDUSTRY INSIGHTS",
    title: "AI-Powered Business Intelligence",
    description:
      "Unlock the power of data with our enterprise AI solutions that drive growth.",
    cta: {
      label: "Explore Now",
      href: "#",
    },
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 3,
    tagline: "INNOVATION",
    title: "Cloud Transformation Journey",
    description:
      "Accelerate your business with TCS's end-to-end cloud services and solutions.",
    cta: {
      label: "Discover More",
      href: "#",
    },
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  },
];

// Services
export const services: ServiceItem[] = [
  {
    id: 1,
    title: "Digital Transformation",
    description:
      "Accelerate your digital journey with our comprehensive transformation services.",
    image:
      "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    link: "#",
  },
  {
    id: 2,
    title: "Cloud Services",
    description:
      "Maximize business value with our end-to-end cloud advisory and implementation services.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    link: "#",
  },
  {
    id: 3,
    title: "Data & Analytics",
    description:
      "Turn your data into a strategic asset with our advanced analytics solutions.",
    image:
      "https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    link: "#",
  },
];

// Industries
export const industries: IndustryItem[] = [
  {
    id: 1,
    title: "Banking",
    icon: "landmark",
    href: "#",
  },
  {
    id: 2,
    title: "Healthcare",
    icon: "heartbeat",
    href: "#",
  },
  {
    id: 3,
    title: "Retail",
    icon: "shopping-bag",
    href: "#",
  },
  {
    id: 4,
    title: "Travel",
    icon: "plane",
    href: "#",
  },
  {
    id: 5,
    title: "Manufacturing",
    icon: "cog",
    href: "#",
  },
  {
    id: 6,
    title: "Telecom",
    icon: "broadcast-tower",
    href: "#",
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Johnson",
    position: "CIO",
    company: "Global Financial Services",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
    quote:
      "DWS has been an invaluable partner in our digital transformation journey. Their expertise in financial services technology and commitment to innovation has helped us stay ahead of the curve and deliver exceptional experiences to our customers.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "CTO",
    company: "Healthcare Innovations",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
    quote:
      "Working with DWS transformed our healthcare delivery platform. Their technical expertise and industry knowledge helped us build a scalable solution that improved patient outcomes while reducing operational costs.",
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "VP of Technology",
    company: "Retail Solutions Inc.",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
    quote:
      "DWS's retail expertise was instrumental in our digital transformation. Their omnichannel solutions helped us create seamless customer experiences across all touchpoints, resulting in significant growth in customer satisfaction and sales.",
  },
];

// Insights
export const insights: InsightArticle[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    category: "Technology",
    date: "May 15, 2023",
    title: "The Future of AI in Enterprise Decision Making",
    description:
      "How artificial intelligence is transforming the way businesses make critical decisions and drive growth.",
    link: "#",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1738&q=80",
    category: "Cybersecurity",
    date: "May 10, 2023",
    title: "Strengthening Enterprise Security in the Digital Age",
    description:
      "Best practices for building robust cybersecurity frameworks to protect your organization from evolving threats.",
    link: "#",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    category: "Cloud",
    date: "May 5, 2023",
    title: "Accelerating Business Value with Cloud-Native Applications",
    description:
      "How organizations are reimagining their applications for the cloud to achieve greater agility and innovation.",
    link: "#",
  },
];

// News
export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "June 8, 2023",
    category: "Press Release",
    title: "DWS Named a Leader in Gartner Magic Quadrant for IT Services",
    description:
      "DWS has been recognized as a Leader in the Gartner Magic Quadrant for IT Services for the 10th consecutive year.",
    link: "#",
  },
  {
    id: 2,
    date: "June 2, 2023",
    category: "Award",
    title: "DWS Wins Microsoft Partner of the Year Award",
    description:
      "DWS recognized for excellence in delivering Microsoft solutions that drive business value for clients.",
    link: "#",
  },
  {
    id: 3,
    date: "May 25, 2023",
    category: "Corporate",
    title: "DWS Expands Operations in North America with New Innovation Hub",
    description:
      "DWS announces the opening of a new Innovation Hub in Toronto, creating 500 new jobs in the region.",
    link: "#",
  },
];

// Events
export const events: EventItem[] = [
  {
    id: 1,
    date: {
      day: "15",
      month: "June",
    },
    title: " DWS Innovation Summit 2023",
    description:
      "Join us for a day of insights, innovation showcases, and networking with industry leaders.",
    location: "New York, USA",
    time: "9:00 AM - 5:00 PM",
    isOnline: false,
    link: "#",
  },
  {
    id: 2,
    date: {
      day: "22",
      month: "June",
    },
    title: "Webinar: The Future of AI in Financial Services",
    description:
      "Learn how AI is transforming the banking and financial services industry.",
    location: "Online",
    time: "11:00 AM - 12:30 PM ET",
    isOnline: true,
    link: "#",
  },
  {
    id: 3,
    date: {
      day: "10",
      month: "July",
    },
    title: "DWS Healthcare Innovation Forum",
    description:
      "Discover the latest innovations and trends in healthcare technology.",
    location: "London, UK",
    time: "10:00 AM - 4:00 PM",
    isOnline: false,
    link: "#",
  },
];

// Footer Links
export const footerServices = [
  { label: "IT Services", href: "#" },
  { label: "Business Solutions", href: "#" },
  { label: "Consulting", href: "#" },
  { label: "Digital Transformation", href: "#" },
  { label: "Cloud Services", href: "#" },
  { label: "AI & Automation", href: "#" },
];

export const footerIndustries = [
  { label: "Banking & Financial Services", href: "#" },
  { label: "Insurance", href: "#" },
  { label: "Healthcare", href: "#" },
  { label: "Retail", href: "#" },
  { label: "Manufacturing", href: "#" },
  { label: "Telecom", href: "#" },
];

export const footerCompany = [
  { label: "About Us", href: "#" },
  { label: "Leadership", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Investor Relations", href: "#" },
  { label: "Corporate Sustainability", href: "#" },
  { label: "Newsroom", href: "#" },
];

export const footerResources = [
  { label: "Insights", href: "#" },
  { label: "Case Studies", href: "#" },
  { label: "White Papers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Events", href: "#" },
  { label: "Webinars", href: "#" },
];
