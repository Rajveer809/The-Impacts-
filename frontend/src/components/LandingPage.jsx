import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Search, Target, Share2, Menu, X, Sun, Moon, ChevronDown,
  ArrowRight, Check, Star, Twitter, Linkedin, Instagram, Facebook,
  Mail, Phone, MapPin, Send, Sparkles, TrendingUp, Users, Award,
  CreditCard, Wallet, Loader2
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import {
  services, stats, portfolio, pricingPlans,
  testimonials, navLinks, footerLinks, socialLinks
} from '../data/mock';

// Icon mapping
const iconMap = {
  Search, Target, Share2, Twitter, Linkedin, Instagram, Facebook
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Counter animation hook
const useCounter = (end, duration = 2000, inView) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);
  
  return count;
};

// Section wrapper component
const Section = ({ id, className = '', children }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

// Header Component
const Header = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-border/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">The Impacts</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={darkMode ? 'dark' : 'light'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* CTA Button - Desktop */}
              <Button className="hidden md:flex btn-glow" asChild>
                <a href="#contact">Get Started</a>
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 mobile-menu-backdrop"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-card border-l border-border p-6 pt-20"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Button className="mt-4 w-full" asChild>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </a>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-20 hero-gradient overflow-hidden">
    {/* Background decorations */}
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 shape-blob"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/5 shape-blob"
      />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Results-Driven Marketing Agency
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Transform Your Digital Presence Into{' '}
          <span className="gradient-text">Measurable Impact</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
        >
          We specialize in SEO, Meta Ads, and Social Media Marketing that delivers 
          real results. Partner with us to scale your business and dominate your market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="btn-glow text-lg px-8" asChild>
            <a href="#contact">
              Book a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8" asChild>
            <a href="#portfolio">View Our Work</a>
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center gap-4"
        >
          <div className="flex -space-x-3">
            {testimonials.slice(0, 4).map((t, i) => (
              <img
                key={t.id}
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
                style={{ zIndex: 4 - i }}
              />
            ))}
          </div>
          <div className="text-sm">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-muted-foreground">Trusted by 250+ businesses</p>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <a href="#services" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <span className="text-sm">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-scroll" />
      </a>
    </motion.div>
  </section>
);

// Services Section
const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section id="services" className="bg-muted/30">
      <motion.div
        ref={ref}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        variants={staggerContainer}
        className="text-center mb-16"
      >
        <motion.p variants={fadeInUp} className="text-primary font-medium mb-4">
          Our Services
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Marketing Solutions That Drive Growth
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
          We offer comprehensive digital marketing services tailored to your business goals.
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full card-hover border-2 border-transparent hover:border-primary/20 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="mt-6 group/btn" asChild>
                    <a href="#contact">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

// Stats Section
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const iconMapping = [TrendingUp, Award, Users, Sparkles];

  return (
    <Section id="results">
      <motion.div
        ref={ref}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        variants={staggerContainer}
        className="text-center mb-16"
      >
        <motion.p variants={fadeInUp} className="text-primary font-medium mb-4">
          Our Track Record
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Numbers That Speak For Themselves
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, index) => {
          const Icon = iconMapping[index];
          const StatCounter = () => {
            const count = useCounter(stat.value, 2000, isInView);
            return <>{count}</>;
          };

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold stats-gradient mb-2">
                <StatCounter />{stat.suffix}
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');

  const filteredPortfolio = filter === 'all'
    ? portfolio
    : portfolio.filter(p => p.category === filter);

  return (
    <Section id="portfolio" className="bg-muted/30">
      <motion.div
        ref={ref}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        variants={staggerContainer}
        className="text-center mb-12"
      >
        <motion.p variants={fadeInUp} className="text-primary font-medium mb-4">
          Our Work
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Success Stories That Inspire
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto mb-8">
          See how we've helped businesses achieve remarkable growth.
        </motion.p>

        {/* Filter tabs */}
        <motion.div variants={fadeInUp}>
          <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="inline-flex">
            <TabsList className="bg-card border">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="meta">Meta Ads</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </motion.div>

      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPortfolio.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden group card-hover">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 portfolio-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <p className="font-medium">{project.client}</p>
                      <p className="text-sm opacity-80">{project.description}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="mb-3 capitalize">
                    {project.category === 'meta' ? 'Meta Ads' : project.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-3">{project.title}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Before</p>
                      <p className="font-semibold">{project.metrics.before}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground">After</p>
                      <p className="font-semibold text-primary">{project.metrics.after}</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      {project.metrics.metric}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
};

// Pricing Section
const PricingSection = ({ onSelectPlan }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isYearly, setIsYearly] = useState(false);

  return (
    <Section id="pricing">
      <motion.div
        ref={ref}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        variants={staggerContainer}
        className="text-center mb-12"
      >
        <motion.p variants={fadeInUp} className="text-primary font-medium mb-4">
          Pricing
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Investment Plans That Deliver ROI
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Choose the perfect plan for your business needs. All plans include our commitment to measurable results.
        </motion.p>

        {/* Billing toggle */}
        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4">
          <span className={`font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly
            <Badge variant="secondary" className="ml-2">Save 10%</Badge>
          </span>
        </motion.div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}
          >
            <Card className={`h-full relative ${plan.highlighted ? 'pricing-highlight border-2 border-primary shadow-xl' : 'border-2'}`}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl lg:text-5xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-6 ${plan.highlighted ? 'btn-glow' : ''}`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => onSelectPlan(plan, isYearly)}
                >
                  {plan.cta === 'Most Popular' ? 'Get Started' : plan.cta}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="testimonials" className="bg-muted/30">
      <motion.div
        ref={ref}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        variants={staggerContainer}
        className="text-center mb-12"
      >
        <motion.p variants={fadeInUp} className="text-primary font-medium mb-4">
          Testimonials
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          What Our Clients Say
        </motion.h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <Card className="testimonial-card border-0 p-8 md:p-12">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl lg:text-2xl font-medium mb-8 leading-relaxed">
                "{testimonials[activeIndex].content}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

// Contact Section
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service || null,
        budget: formData.budget || null,
        message: formData.message
      };

      // Validate required fields before sending
      if (!payload.name || !payload.email || !payload.service || !payload.message) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }
      
      await axios.post(`${API}/contact`, payload);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <Section id="contact">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-medium mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let's discuss how we can help transform your digital presence and drive measurable results for your business.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email us at</p>
                <a href="mailto:Rajveer@theimpacts.com" className="font-medium hover:text-primary transition-colors">
                  Rajveer@theimpacts.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Call us at</p>
                <a href="tel:+91 9580127532" className="font-medium hover:text-primary transition-colors">
                  +91 9580127532
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visit us at</p>
                <p className="font-medium">123 Marketing Lane, Digital City, DC 10001</p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="mt-10">
            <p className="text-sm text-muted-foreground mb-4">Follow us</p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Interested In *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seo">SEO Services</SelectItem>
                      <SelectItem value="meta">Meta Ads</SelectItem>
                      <SelectItem value="social">Social Media Marketing</SelectItem>
                      <SelectItem value="all">All Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range (Optional)</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1k-3k">$1,000 - $3,000/month</SelectItem>
                    <SelectItem value="3k-5k">$3,000 - $5,000/month</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000/month</SelectItem>
                    <SelectItem value="10k+">$10,000+/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project and goals..."
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full btn-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-primary/10 text-primary text-center"
                >
                  <Check className="w-5 h-5 inline mr-2" />
                  Thank you! We'll be in touch soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-destructive/10 text-destructive text-center"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};

// Footer Component
const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setIsSubscribing(true);
    setNewsletterStatus(null);
    
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (error) {
      if (error.response?.status === 409) {
        setNewsletterStatus('exists');
      } else {
        setNewsletterStatus('error');
      }
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setNewsletterStatus(null), 4000);
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">The Impacts</span>
            </a>
            <p className="text-muted-foreground text-sm mb-6">
              Transforming digital presence into measurable impact through strategic marketing solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for marketing insights.
            </p>
            <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-10"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <Button size="sm" className="h-10 px-4" type="submit" disabled={isSubscribing}>
                  {isSubscribing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {newsletterStatus === 'success' && (
                <p className="text-xs text-primary">Thanks for subscribing!</p>
              )}
              {newsletterStatus === 'exists' && (
                <p className="text-xs text-muted-foreground">Already subscribed!</p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-xs text-destructive">Something went wrong. Try again.</p>
              )}
            </form>
          </div>
        </div>

        <div className="section-divider my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} The Impacts. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link, i) => (
              <a key={i} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Payment Modal Component (Mock)
const PaymentModal = ({ isOpen, onClose, plan, isYearly }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setPaymentComplete(true);
  };

  const resetModal = () => {
    setPaymentMethod('card');
    setIsProcessing(false);
    setPaymentComplete(false);
    onClose();
  };

  if (!plan) return null;

  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {paymentComplete ? 'Payment Successful!' : `Subscribe to ${plan.name}`}
          </DialogTitle>
          <DialogDescription>
            {paymentComplete
              ? 'Thank you for your purchase. Our team will contact you shortly.'
              : `${plan.description}`
            }
          </DialogDescription>
        </DialogHeader>

        {paymentComplete ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-medium mb-2">Welcome to The Impacts!</p>
            <p className="text-muted-foreground text-sm">
              Check your email for confirmation and next steps.
            </p>
            <Button onClick={resetModal} className="mt-6">
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Order summary */}
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{plan.name} Plan</span>
                <span className="font-bold text-lg">${price}/mo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isYearly ? 'Billed annually' : 'Billed monthly'}
              </p>
            </div>

            {/* Payment method selection */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'paypal'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Wallet className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">PayPal</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'razorpay'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Sparkles className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Razorpay</span>
                </button>
              </div>
            </div>

            {/* Mock card inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVC</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod !== 'card' && (
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">
                  You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Razorpay'} to complete your payment.
                </p>
              </div>
            )}

            <Button
              onClick={handlePayment}
              className="w-full btn-glow"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                `Pay $${price}`
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              🔒 Secure payment. This is a demo checkout.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isYearlyPlan, setIsYearlyPlan] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectPlan = (plan, isYearly) => {
    setSelectedPlan(plan);
    setIsYearlyPlan(isYearly);
    setPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <PortfolioSection />
        <PricingSection onSelectPlan={handleSelectPlan} />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        plan={selectedPlan}
        isYearly={isYearlyPlan}
      />
    </div>
  );
};

export default LandingPage;
