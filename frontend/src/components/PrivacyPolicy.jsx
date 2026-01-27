import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Mail, Cookie, Lock, Eye, Trash2, Globe, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const PrivacyPolicy = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you use our contact form or subscribe to our newsletter, we collect the following information:",
          list: [
            "Full name",
            "Email address",
            "Phone number (optional)",
            "Service interests (SEO, Meta Ads, Social Media Marketing)",
            "Budget range (optional)",
            "Message content"
          ]
        },
        {
          subtitle: "Automatically Collected Information",
          text: "When you visit our website, we may automatically collect:",
          list: [
            "IP address",
            "Browser type and version",
            "Device information",
            "Pages visited and time spent",
            "Referring website"
          ]
        }
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          text: "We use the information we collect for the following purposes:",
          list: [
            "To respond to your inquiries and provide requested services",
            "To send marketing communications (with your consent)",
            "To improve our website and services",
            "To analyze website usage and trends",
            "To comply with legal obligations",
            "To protect against fraudulent or unauthorized activity"
          ]
        }
      ]
    },
    {
      icon: Shield,
      title: "Data Protection & Security",
      content: [
        {
          text: "We implement appropriate technical and organizational measures to protect your personal information, including:",
          list: [
            "Secure HTTPS encryption for all data transmission",
            "Regular security assessments and updates",
            "Access controls limiting who can view your data",
            "Secure database storage with encryption",
            "Employee training on data protection practices"
          ]
        }
      ]
    },
    {
      icon: Globe,
      title: "Information Sharing",
      content: [
        {
          text: "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
          list: [
            "With service providers who assist in our operations (hosting, analytics)",
            "When required by law or legal process",
            "To protect our rights, privacy, safety, or property",
            "In connection with a business transfer or acquisition",
            "With your explicit consent"
          ]
        }
      ]
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      content: [
        {
          text: "Our website uses cookies and similar technologies to enhance your experience:",
          list: [
            "Essential cookies: Required for website functionality",
            "Analytics cookies: Help us understand how visitors use our site",
            "Preference cookies: Remember your settings (like dark/light mode)"
          ]
        },
        {
          text: "You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality."
        }
      ]
    },
    {
      icon: Trash2,
      title: "Your Rights",
      content: [
        {
          text: "You have the following rights regarding your personal information:",
          list: [
            "Access: Request a copy of your personal data",
            "Correction: Request correction of inaccurate data",
            "Deletion: Request deletion of your personal data",
            "Objection: Object to processing of your data",
            "Portability: Request transfer of your data",
            "Withdraw consent: Withdraw previously given consent"
          ]
        },
        {
          text: "To exercise any of these rights, please contact us at privacy@theimpacts.com"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">The Impacts</span>
            </a>
            <Button variant="ghost" asChild>
              <a href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how The Impacts collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed">
                The Impacts ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website or use our services. By using our website, you consent to the data practices described in this policy.
              </p>
            </CardContent>
          </Card>

          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold pt-1">
                          {section.title}
                        </h2>
                      </div>
                      <div className="space-y-4 pl-14">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            {item.subtitle && (
                              <h3 className="font-medium text-foreground mb-2">
                                {item.subtitle}
                              </h3>
                            )}
                            {item.text && (
                              <p className="text-muted-foreground mb-3 leading-relaxed">
                                {item.text}
                              </p>
                            )}
                            {item.list && (
                              <ul className="space-y-2">
                                {item.list.map((listItem, listIndex) => (
                                  <li key={listIndex} className="flex items-start gap-3 text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>{listItem}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="mt-6">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Contact form submissions are retained for up to 3 years for business and legal purposes. Newsletter subscriptions remain active until you unsubscribe.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Children's Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="mt-6">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="mt-6">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Card className="mt-6 border-primary/20">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Email:</strong> privacy@theimpacts.com</p>
                      <p><strong className="text-foreground">Address:</strong> 123 Marketing Lane, Digital City, DC 10001</p>
                      <p><strong className="text-foreground">Phone:</strong> +1 (234) 567-890</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Button asChild>
              <a href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </a>
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} The Impacts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
