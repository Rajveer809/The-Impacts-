import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, CreditCard, Ban, RefreshCw, Gavel, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const TermsOfService = () => {
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
      icon: FileText,
      title: "1. Services Overview",
      content: [
        {
          text: "The Impacts provides digital marketing services including, but not limited to:",
          list: [
            "Search Engine Optimization (SEO) - Improving your website's organic search visibility",
            "Meta Advertising - Managing paid advertising campaigns on Meta platforms (Facebook, Instagram)",
            "Social Media Marketing - Creating and managing social media presence and engagement",
            "Content Marketing - Developing strategic content to attract and engage your target audience",
            "Analytics & Reporting - Providing detailed performance reports and insights"
          ]
        },
        {
          text: "Service delivery timelines, deliverables, and specific terms will be outlined in individual service agreements or proposals provided to each client."
        }
      ]
    },
    {
      icon: Scale,
      title: "2. Client Responsibilities",
      content: [
        {
          text: "As our client, you agree to:",
          list: [
            "Provide accurate and complete information necessary for service delivery",
            "Grant necessary access to accounts, platforms, and systems required for our services",
            "Review and approve content, strategies, and campaigns in a timely manner",
            "Maintain ownership and control of all account credentials and access",
            "Comply with all applicable laws and platform terms of service",
            "Communicate promptly regarding any changes to your business or marketing needs",
            "Ensure all materials provided to us do not infringe on third-party rights"
          ]
        }
      ]
    },
    {
      icon: CreditCard,
      title: "3. Payment Terms",
      content: [
        {
          subtitle: "Pricing & Invoicing",
          text: "Our services are billed according to the pricing plan selected or as outlined in your service agreement:",
          list: [
            "Monthly retainer fees are due at the beginning of each service period",
            "Project-based fees may require deposits as specified in proposals",
            "All prices are in USD unless otherwise specified",
            "Invoices are sent electronically and payment is due within 15 days"
          ]
        },
        {
          subtitle: "Late Payments",
          text: "Late payments may result in:",
          list: [
            "Service suspension after 30 days of non-payment",
            "Late fee of 1.5% per month on outstanding balances",
            "Collection costs if accounts remain unpaid after 60 days"
          ]
        }
      ]
    },
    {
      icon: RefreshCw,
      title: "4. Service Modifications & Cancellation",
      content: [
        {
          subtitle: "Modifications",
          list: [
            "Service modifications require written notice and mutual agreement",
            "Pricing adjustments may apply for scope changes",
            "We reserve the right to update service offerings with 30 days notice"
          ]
        },
        {
          subtitle: "Cancellation",
          list: [
            "Monthly services may be cancelled with 30 days written notice",
            "Annual contracts are subject to early termination fees as specified",
            "Upon cancellation, all outstanding fees become immediately due",
            "We will provide reasonable transition assistance and data export"
          ]
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "5. Disclaimers & Limitations",
      content: [
        {
          subtitle: "No Guaranteed Results",
          text: "While we employ industry best practices and proven strategies, we cannot guarantee specific results such as:",
          list: [
            "Specific search engine rankings or positions",
            "Exact traffic increases or conversion rates",
            "Particular return on advertising spend (ROAS)",
            "Viral content or specific engagement metrics"
          ]
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law:",
          list: [
            "Our total liability shall not exceed fees paid in the preceding 12 months",
            "We are not liable for indirect, incidental, or consequential damages",
            "We are not responsible for third-party platform changes or policies",
            "Force majeure events excuse performance obligations"
          ]
        }
      ]
    },
    {
      icon: Ban,
      title: "6. Prohibited Uses",
      content: [
        {
          text: "You agree not to use our services for:",
          list: [
            "Any illegal, fraudulent, or unauthorized purposes",
            "Promoting violence, hate speech, or discrimination",
            "Infringing intellectual property or privacy rights",
            "Distributing malware, spam, or malicious content",
            "Misrepresenting your identity or business",
            "Violating platform terms of service or advertising policies",
            "Any activity that could harm our reputation or other clients"
          ]
        }
      ]
    },
    {
      icon: FileText,
      title: "7. Intellectual Property",
      content: [
        {
          subtitle: "Your Content",
          text: "You retain ownership of all content, trademarks, and materials you provide to us. You grant us a license to use these materials solely for providing our services."
        },
        {
          subtitle: "Our Work Product",
          text: "Upon full payment, you own deliverables created specifically for you, including:",
          list: [
            "Custom content and copy created for your campaigns",
            "Graphics and creative assets designed for your brand",
            "Campaign strategies and documented processes"
          ]
        },
        {
          subtitle: "Our Retained Rights",
          text: "We retain ownership of:",
          list: [
            "Pre-existing tools, templates, and methodologies",
            "General knowledge and expertise gained during engagement",
            "Anonymized data for benchmarking and case studies (with permission)"
          ]
        }
      ]
    },
    {
      icon: Gavel,
      title: "8. Governing Law & Disputes",
      content: [
        {
          text: "These Terms are governed by the laws of the State of Delaware, United States. Any disputes shall be resolved as follows:",
          list: [
            "Good faith negotiation between parties for 30 days",
            "Mediation through a mutually agreed mediator",
            "Binding arbitration in accordance with AAA Commercial Rules",
            "Courts of Delaware shall have exclusive jurisdiction for any court proceedings"
          ]
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
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By engaging The Impacts, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to The Impacts. These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "you," or "your") and The Impacts ("Company," "we," "us," or "our") governing your use of our marketing services and website. By engaging our services or accessing our website, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
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

          {/* Confidentiality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mt-6">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">9. Confidentiality</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Both parties agree to maintain the confidentiality of proprietary information shared during our engagement. This includes business strategies, customer data, financial information, and any materials marked as confidential.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Confidentiality obligations survive termination of services for a period of two (2) years, except for trade secrets which remain protected indefinitely.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Indemnification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Card className="mt-6">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">10. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless The Impacts, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from: (a) your breach of these Terms; (b) your violation of any law or third-party rights; (c) content or materials you provide to us; or (d) your use of our services.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Amendments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="mt-6">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">11. Amendments</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. Material changes will be communicated via email or website notice at least 30 days before taking effect. Continued use of our services after changes become effective constitutes acceptance of the modified Terms.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <Card className="mt-6 border-primary/20">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Questions About These Terms?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Email:</strong> legal@theimpacts.com</p>
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

export default TermsOfService;
