// Mock data for The Impacts Marketing Agency

export const services = [
  {
    id: 1,
    title: "SEO Services",
    description: "Drive organic traffic with data-driven strategies that improve rankings and visibility. We optimize every aspect of your digital presence.",
    icon: "Search",
    features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Link Building"]
  },
  {
    id: 2,
    title: "Meta Ads",
    description: "Reach your ideal customers with precisely targeted campaigns that convert. Maximize ROI with our expert ad management.",
    icon: "Target",
    features: ["Audience Targeting", "A/B Testing", "Conversion Tracking", "Budget Optimization"]
  },
  {
    id: 3,
    title: "Social Media Marketing",
    description: "Build engaged communities and amplify your brand across platforms. Create meaningful connections that drive growth.",
    icon: "Share2",
    features: ["Content Strategy", "Community Management", "Influencer Outreach", "Analytics & Reporting"]
  }
];

export const stats = [
  { id: 1, value: 8, suffix: "+", label: "Years of Excellence" },
  { id: 2, value: 250, suffix: "+", label: "Projects Delivered" },
  { id: 3, value: 98, suffix: "%", label: "Client Satisfaction" },
  { id: 4, value: 340, suffix: "%", label: "Average ROI Increase" }
];

export const portfolio = [
  {
    id: 1,
    title: "E-Commerce Growth",
    client: "StyleHub Fashion",
    category: "seo",
    description: "Increased organic traffic by 280% in 6 months",
    metrics: { before: "5K", after: "19K", metric: "Monthly Visitors" },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
  },
  {
    id: 2,
    title: "Lead Generation Campaign",
    client: "TechStart Solutions",
    category: "meta",
    description: "Generated 1,200+ qualified leads with 45% lower CPA",
    metrics: { before: "$85", after: "$47", metric: "Cost Per Acquisition" },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
  },
  {
    id: 3,
    title: "Brand Awareness",
    client: "GreenLife Organics",
    category: "social",
    description: "Built community of 50K+ engaged followers",
    metrics: { before: "2K", after: "52K", metric: "Social Following" },
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80"
  },
  {
    id: 4,
    title: "Local SEO Domination",
    client: "Metro Dental Care",
    category: "seo",
    description: "Achieved #1 ranking for 15 target keywords",
    metrics: { before: "Page 3", after: "#1", metric: "Google Ranking" },
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&q=80"
  },
  {
    id: 5,
    title: "ROAS Optimization",
    client: "FitGear Pro",
    category: "meta",
    description: "Increased return on ad spend from 2.1x to 5.8x",
    metrics: { before: "2.1x", after: "5.8x", metric: "ROAS" },
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80"
  },
  {
    id: 6,
    title: "Viral Campaign",
    client: "Artisan Coffee Co.",
    category: "social",
    description: "Campaign reached 2M+ users with 12% engagement",
    metrics: { before: "50K", after: "2M+", metric: "Reach" },
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80"
  }
];

export const pricingPlans = [
  {
    id: 1,
    name: "Starter",
    description: "Perfect for small businesses starting their digital journey",
    monthlyPrice: 999,
    yearlyPrice: 899,
    features: [
      "Basic SEO Audit",
      "1 Platform Social Media",
      "Basic Ad Campaign Setup",
      "Monthly Reports",
      "Email Support"
    ],
    highlighted: false,
    cta: "Get Started"
  },
  {
    id: 2,
    name: "Growth",
    description: "Ideal for growing businesses ready to scale",
    monthlyPrice: 2499,
    yearlyPrice: 2199,
    features: [
      "Complete SEO Strategy",
      "3 Platform Social Media",
      "Advanced Ad Campaigns",
      "Weekly Reports",
      "Priority Support",
      "Content Calendar",
      "Competitor Analysis"
    ],
    highlighted: true,
    cta: "Most Popular"
  },
  {
    id: 3,
    name: "Enterprise",
    description: "Full-service solution for established brands",
    monthlyPrice: 4999,
    yearlyPrice: 4499,
    features: [
      "Enterprise SEO Suite",
      "All Platform Coverage",
      "Unlimited Ad Campaigns",
      "Real-time Dashboard",
      "Dedicated Account Manager",
      "Custom Strategy Sessions",
      "Brand Reputation Management",
      "24/7 Priority Support"
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    position: "CEO",
    company: "StyleHub Fashion",
    content: "The Impacts transformed our online presence. Our organic traffic increased by 280% and our conversion rate doubled. They truly understand digital marketing.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Marketing Director",
    company: "TechStart Solutions",
    content: "Their Meta Ads expertise is unmatched. We saw a 45% reduction in our cost per acquisition while increasing lead quality. Highly recommend!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Founder",
    company: "GreenLife Organics",
    content: "Building our social media community from scratch seemed impossible until we partnered with The Impacts. Now we have 50K+ engaged followers who love our brand.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
  },
  {
    id: 4,
    name: "David Park",
    position: "Operations Manager",
    company: "Metro Dental Care",
    content: "As a local business, ranking on Google was crucial. The Impacts got us to #1 for all our target keywords. Patient inquiries have tripled!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
  }
];

export const navLinks = [
  { id: 1, label: "Services", href: "#services" },
  { id: 2, label: "Results", href: "#results" },
  { id: 3, label: "Portfolio", href: "#portfolio" },
  { id: 4, label: "Pricing", href: "#pricing" },
  { id: 5, label: "Testimonials", href: "#testimonials" },
  { id: 6, label: "Contact", href: "#contact" }
];

export const footerLinks = {
  services: [
    { label: "SEO Services", href: "#services" },
    { label: "Meta Ads", href: "#services" },
    { label: "Social Media", href: "#services" },
    { label: "Content Marketing", href: "#services" }
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" }
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" }
  ]
};

export const socialLinks = [
  { id: 1, name: "Twitter", icon: "Twitter", href: "#" },
  { id: 2, name: "LinkedIn", icon: "Linkedin", href: "#" },
  { id: 3, name: "Instagram", icon: "Instagram", href: "#" },
  { id: 4, name: "Facebook", icon: "Facebook", href: "#" }
];
