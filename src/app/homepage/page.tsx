"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';

const HomePage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const services = [
    {
      id: 1,
      name: "Technical SEO & Crawl Optimization",
      icon: "⚙️",
      description:
        "Ensure your website is fast, indexable, and crawl-friendly for both search engines and AI crawlers. We fix crawl errors, enhance performance, and optimize your site's architecture.",
      slug: "technical-seo"
    },
    {
      id: 2,
      name: "Semantic SEO & NLP Structuring",
      icon: "🧠",
      description:
        "Organize your content with entities, topics, and context so LLMs and search engines can deeply understand and index it with precision.",
      slug: "semantic-seo"
    },
    {
      id: 3,
      name: "Voice Search Optimization",
      icon: "🎙️",
      description:
        "Target natural language queries to help your content appear in voice searches on Alexa, Siri, and Google Assistant.",
      slug: "voice-search-optimization"
    },
    {
      id: 4,
      name: "LLM-Ready Content Strategy",
      icon: "🤖",
      description:
        "Craft expert-level content optimized for visibility across AI platforms like ChatGPT, Perplexity, Gemini, and Claude.",
      slug: "llm-content-strategy"
    },
    {
      id: 5,
      name: "E-commerce SEO",
      icon: "🛒",
      description:
        "Boost product visibility and conversions with SEO tailored for online stores. We target buyer intent and optimize every step of the funnel.",
      slug: "ecommerce-seo"
    },
    {
      id: 6,
      name: "AI Tools for SEO Automation",
      icon: "🔗",
      description:
        "Leverage AI tools to automate SEO tasks like keyword research, content generation, and performance analysis.",
      slug: "ai-tools-in-seo"
    }
  ];
  
  // Sample benefits data
  const benefits = [
    {
      id: 1,
      title: "Data-Driven Approach",
      description: "We make decisions based on comprehensive data analysis, not guesswork or outdated tactics.",
      icon: "📊"
    },
    {
      id: 2,
      title: "Transparent Reporting",
      description: "Monthly reports show exactly what we've done, what we've achieved, and what's coming next.",
      icon: "📈"
    },
    {
      id: 3,
      title: "Customized Strategies",
      description: "Every business is unique. We create tailored SEO plans based on your specific goals and market.",
      icon: "🎯"
    },
    {
      id: 4,
      title: "Future-Proof Methods",
      description: "We stay ahead of algorithm changes to ensure your rankings remain stable long-term.",
      icon: "🚀"
    }
  ];

  // Sample approach steps
  const approachSteps = [
    {
      id: 1,
      title: "Comprehensive Audit",
      description: "We analyze your website, competitors, and market to identify opportunities and obstacles.",
      icon: "🔍"
    },
    {
      id: 2,
      title: "Strategic Planning",
      description: "We develop a custom roadmap with clear milestones and deliverables based on audit findings.",
      icon: "📋"
    },
    {
      id: 3,
      title: "Implementation",
      description: "Our team executes the strategy with precision, focusing on high-impact changes first.",
      icon: "⚙️"
    },
    {
      id: 4,
      title: "Monitoring & Optimization",
      description: "We continuously track performance, making data-driven adjustments to maximize results.",
      icon: "📊"
    }
  ];

  // Sample team data
  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Jat",
      title: "Founder & CEO",
      bio: "With over 15 years of SEO experience, Rajesh has helped hundreds of businesses achieve sustainable growth through organic search. He's a regular speaker at digital marketing conferences and has been featured in industry publications.",
      image: "/images/team/rajesh-placeholder.jpg",
      linkedin: "https://linkedin.com/in/rajesh-jat"
    },
    {
      id: 2,
      name: "Manish Lamrod",
      title: "Co-Founder & Chief Strategy Officer",
      bio: "Manish brings 12+ years of experience in digital marketing strategy. His data-driven approach has helped clients increase organic traffic by an average of 320%. Previously, he led SEO teams at major marketing agencies.",
      image: "/images/team/manish-placeholder.jpg",
      linkedin: "https://linkedin.com/in/manish-lamrod"
    }
  ];

  // Sample FAQ data
  const faqs = [
    {
      id: 1,
      question: "How long does it take to see results from SEO?",
      answer: "SEO is a long-term strategy. While some improvements can be seen within weeks, significant results typically take 3-6 months. This varies based on your industry, competition, current website status, and the specific strategies implemented."
    },
    {
      id: 2,
      question: "How much does SEO cost?",
      answer: "Our SEO packages start at $2000/month, with pricing based on your business size, goals, and competition level. We offer customized solutions rather than one-size-fits-all packages to ensure you get exactly what your business needs."
    },
    {
      id: 3,
      question: "Do you guarantee first-page rankings?",
      answer: "No reputable SEO agency can guarantee specific rankings. We focus on sustainable growth and measurable improvements in traffic, conversions, and revenue rather than promising specific positions that can't be guaranteed due to the complex nature of search algorithms."
    },
    {
      id: 4,
      question: "Do you offer one-time SEO services or only monthly retainers?",
      answer: "We offer both one-time SEO audits and implementation projects as well as ongoing monthly services. However, we recommend ongoing SEO for most businesses, as search engines and competitor strategies constantly evolve."
    },
    {
      id: 5,
      question: "What makes ImmortalSEO different from other agencies?",
      answer: "We combine technical expertise with creative strategy, emphasize transparency with detailed reporting, focus on business results beyond just rankings, and bring extensive experience across diverse industries. Our retention rate of 94% speaks to our commitment to client success."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="flex flex-col md:flex-row items-center py-16 md:py-24 relative z-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                #1 Rated SEO Agency
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Dominate Search Results with <span className="text-yellow-300">Data-Driven</span> SEO
              </h1>
              <p className="text-xl mb-8 opacity-90 max-w-lg">
                We help businesses increase visibility, drive targeted traffic, and generate more leads through strategic SEO campaigns.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Get a Free SEO Audit
                </Button>
                <Button
                  href="/services"
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  Our Services
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-12">
                <p className="text-sm uppercase tracking-wider opacity-75 mb-3">Trusted By:</p>
                <div className="flex flex-wrap items-center gap-6">
                  {/* Replace with actual client logos */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-24 bg-white/20 rounded-md backdrop-blur-sm"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
                
                {/* Main card */}
                <div className="bg-white rounded-xl shadow-2xl p-6 relative z-10">
                  <div className="h-72 bg-gradient-to-br from-background-paper to-background-accent rounded-lg flex items-center justify-center mb-4">
                    {/* Placeholder for dashboard/analytics image */}
                    <div className="text-center text-text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto mb-2 text-primary-main"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <p className="text-sm font-medium">SEO Analytics Dashboard</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background-paper p-3 rounded-lg">
                      <p className="text-sm text-text-secondary">Avg. Traffic Increase</p>
                      <p className="text-2xl font-bold text-primary-main">+187%</p>
                    </div>
                    <div className="bg-background-paper p-3 rounded-lg">
                      <p className="text-sm text-text-secondary">Keyword Rankings</p>
                      <p className="text-2xl font-bold text-primary-main">Top 10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive SEO Solutions
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Tailored strategies to boost your online visibility and drive measurable business growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:translate-y-[-5px] group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-main/10 text-primary-main mb-5 text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-main transition-colors">{service.name}</h3>
                <p className="text-text-secondary mb-5">{service.description}</p>
                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark" 
                >
                  Learn More
                  <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              href="/services" 
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              View All Services
            </Button>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section background="light">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Why Choose ImmortalSEO?</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We Deliver Results, Not Just Reports
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                With ImmortalSEO, you're not just hiring an agency – you're partnering with SEO experts obsessed with your business growth. Our results-driven approach focuses on what matters most: increasing your bottom line.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-text-secondary">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button 
                  href="/about" 
                  variant="primary"
                  className="hover:shadow-lg transition-shadow"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary-main/5 rounded-full blur-3xl"></div>
                
                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-5xl font-bold text-primary-main mb-2">94%</p>
                    <p className="text-text-secondary">Client retention rate, well above industry average</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md transform translate-y-8">
                    <p className="text-5xl font-bold text-primary-main mb-2">187%</p>
                    <p className="text-text-secondary">Average increase in organic traffic within 6 months</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md transform translate-y-4">
                    <p className="text-5xl font-bold text-primary-main mb-2">15+</p>
                    <p className="text-text-secondary">Years of combined SEO experience</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-5xl font-bold text-primary-main mb-2">250+</p>
                    <p className="text-text-secondary">Businesses successfully ranked on first page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Approach */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Strategic SEO Methodology
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our proven 4-step process delivers consistent results for businesses across industries
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline bar */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary-main/20 hidden md:block"></div>
            
            <div className="space-y-16">
              {approachSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start gap-8`}>
                    {/* Timeline dot */}
                    <div className="absolute md:left-1/2 md:top-0 md:transform md:-translate-x-1/2 w-10 h-10 rounded-full bg-primary-main text-white flex items-center justify-center z-10 hidden md:flex">
                      {step.id}
                    </div>
                    
                    <div className="md:w-5/12">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                        <div className="flex items-center mb-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                            {step.icon}
                          </div>
                          <h3 className="text-xl font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-text-secondary">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="md:w-5/12 flex md:hidden">
                      {/* Mobile view - empty div for spacing */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Button 
              href="/contact" 
              variant="primary"
              className="hover:shadow-lg"
            >
              Start Your SEO Journey
            </Button>
          </div>
        </Container>
      </Section>

      {/* First CTA Section */}
      <Section background="primary">
        <Container>
          <div className="text-center py-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Boost Your Online Visibility?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Get a free comprehensive SEO audit worth $1,500 and discover untapped growth opportunities for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                href="/contact" 
                variant="secondary" 
                size="lg"
                className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
              >
                Get Your Free SEO Audit
              </Button>
              <Button 
                href="/case-studies" 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Leadership Team */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Experts Behind ImmortalSEO
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our experienced team has helped hundreds of businesses achieve sustainable growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-48 h-48 rounded-full bg-primary-main/10 flex-shrink-0 flex items-center justify-center text-6xl text-primary-main">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary-main font-medium mb-4">{member.title}</p>
                  <p className="text-text-secondary mb-4">{member.bio}</p>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-main hover:text-primary-dark"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              href="/about" 
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              Meet Our Full Team
            </Button>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Get answers to common questions about SEO and our services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 text-primary-main transition-transform ${activeAccordion === index ? 'transform rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`px-6 pb-4 ${activeAccordion === index ? 'block' : 'hidden'}`}
                  >
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg mb-4">Don't see your question here?</p>
              <Button 
                href="/contact" 
                variant="primary"
                className="hover:shadow-lg"
              >
                Ask Us Directly
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Transform Your Online Presence Today
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Join the hundreds of businesses that have achieved sustainable growth with ImmortalSEO's proven strategies. Your competition isn't waiting – neither should you.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/contact" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Start Your SEO Journey
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;