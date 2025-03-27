
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Clock, Stethoscope, Clipboard, Users, MapPin, Phone, ArrowRight, CalendarClock, Calendar, Hospital, Layers, Star } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import AnimatedAchievements from "@/components/AnimatedAchievements";
import AnimatedTimeline from "@/components/AnimatedTimeline";
import AnimatedHealthcareServices from "@/components/AnimatedHealthcareServices";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardHover = {
  rest: { y: 0 },
  hover: { 
    y: -10,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

const services = [
  {
    id: "primary-care",
    title: "Primary Care",
    description: "Comprehensive healthcare for individuals and families of all ages.",
    icon: <Stethoscope className="h-8 w-8 text-hospital-600" />,
    features: [
      "Annual check-ups and preventive care",
      "Diagnosis and treatment of acute illness",
      "Management of chronic conditions",
      "Immunizations and vaccinations",
      "Health screenings and risk assessments"
    ],
    hours: "Monday - Friday: 8:00 AM - 6:00 PM",
    location: "Main Hospital, 1st Floor"
  },
  {
    id: "urgent-care",
    title: "Urgent Care",
    description: "Immediate medical attention for non-life-threatening conditions.",
    icon: <Clock className="h-8 w-8 text-hospital-600" />,
    features: [
      "Treatment for minor injuries and illnesses",
      "X-rays and basic laboratory services",
      "Wound care and suturing",
      "Respiratory treatments",
      "Sports injuries and sprains"
    ],
    hours: "Monday - Sunday: 7:00 AM - 10:00 PM",
    location: "East Wing, Ground Floor"
  },
  {
    id: "diagnostic-services",
    title: "Diagnostic Services",
    description: "Advanced testing and imaging for accurate diagnosis.",
    icon: <Clipboard className="h-8 w-8 text-hospital-600" />,
    features: [
      "Laboratory testing and blood work",
      "X-rays and radiography",
      "CT scans and MRI imaging",
      "Ultrasound services",
      "Cardiac diagnostics"
    ],
    hours: "Monday - Friday: 7:00 AM - 7:00 PM",
    location: "Medical Center, 2nd Floor"
  },
  {
    id: "specialty-care",
    title: "Specialty Care",
    description: "Expert treatment in specialized medical fields.",
    icon: <Users className="h-8 w-8 text-hospital-600" />,
    features: [
      "Cardiology consultations",
      "Orthopedic assessments",
      "Dermatology services",
      "Gastroenterology evaluations",
      "Neurology appointments"
    ],
    hours: "Monday - Friday: 9:00 AM - 5:00 PM",
    location: "Specialty Clinic, 3rd Floor"
  }
];

const faqs = [
  {
    question: "Do I need a referral to use ambulatory services?",
    answer: "While many of our specialty services require a referral from your primary care physician, urgent care and diagnostic services are generally accessible without a referral. Please contact our scheduling team for specific requirements for each service."
  },
  {
    question: "How do I schedule an appointment?",
    answer: "Appointments can be scheduled online through our patient portal, by calling our scheduling line at +254 700 520 008, or by visiting our reception desk during business hours."
  },
  {
    question: "What insurance plans do you accept?",
    answer: "We accept most major insurance plans, including Medicare and Medicaid. Please contact our billing department or check our website for a complete list of accepted insurance providers."
  },
  {
    question: "What should I bring to my appointment?",
    answer: "Please bring your insurance card, photo ID, list of current medications, and any relevant medical records or test results. If you're a new patient, please arrive 15 minutes early to complete registration forms."
  },
  {
    question: "How do I access my test results?",
    answer: "Test results are available through our secure patient portal. Your healthcare provider will also review results with you during your follow-up appointment or by phone if necessary."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We request that you notify us at least 24 hours in advance if you need to cancel or reschedule your appointment. This allows us to offer the time slot to other patients who may need care."
  }
];

// Data for achievements section
const achievements = [
  {
    value: 98,
    title: "Patient Satisfaction",
    description: "Percentage of patients who rate our care as excellent",
    suffix: "%"
  },
  {
    value: 125000,
    title: "Annual Patients",
    description: "Number of patients we serve each year",
    suffix: "+"
  },
  {
    value: 450,
    title: "Healthcare Professionals",
    description: "Dedicated professionals working in our facilities"
  },
  {
    value: 35,
    title: "Years of Service",
    description: "Providing exceptional care to our community"
  }
];

// Data for history timeline section
const historyData = [
  {
    year: "1988",
    title: "Founding of the Clinic",
    description: "Our ambulatory care center started as a small clinic with just 3 physicians and 10 staff members."
  },
  {
    year: "1995",
    title: "Expansion of Services",
    description: "Added diagnostic imaging services and expanded our primary care capabilities to serve more patients."
  },
  {
    year: "2004",
    title: "New Specialty Care Wing",
    description: "Opened our specialty care wing, bringing specialists in cardiology, orthopedics, and gastroenterology to our facility."
  },
  {
    year: "2012",
    title: "Technology Advancement",
    description: "Implemented electronic health records and state-of-the-art diagnostic equipment to improve patient care."
  },
  {
    year: "2018",
    title: "Comprehensive Care Center",
    description: "Completed renovation to create our current integrated care model, allowing for seamless coordination between services."
  }
];

// Data for healthcare services section
const healthcareServices = [
  {
    title: "Preventive Medicine",
    description: "Focus on maintaining health and preventing disease through regular check-ups and screenings.",
    icon: Hospital,
    features: [
      "Annual wellness visits",
      "Health risk assessments",
      "Immunizations and vaccinations",
      "Lifestyle counseling"
    ],
    badge: "Core Service"
  },
  {
    title: "Specialized Diagnostics",
    description: "Advanced diagnostic testing to identify and monitor health conditions with precision.",
    icon: Layers,
    features: [
      "Laboratory testing",
      "Medical imaging",
      "Cardiac monitoring",
      "Sleep studies"
    ]
  },
  {
    title: "Therapeutic Treatments",
    description: "Non-surgical treatments to manage conditions and improve quality of life.",
    icon: Star,
    features: [
      "Infusion therapy",
      "Pain management",
      "Physical therapy",
      "Respiratory treatments"
    ],
    badge: "Enhanced Care"
  }
];

const AmbulatoryServices = () => {
  return (
    <>
      <Helmet>
        <title>Ambulatory Services | MediCare Plus</title>
        <meta name="description" content="Explore our comprehensive outpatient and ambulatory care services designed to meet your healthcare needs without hospital admission." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-hospital-600 wavy-bg-pattern relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-hospital-700 to-hospital-500 opacity-90"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <motion.h1 
                className="text-4xl md:text-5xl font-display font-bold mb-6"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                Ambulatory Services
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl mb-8 text-hospital-50"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                Comprehensive outpatient care services designed to provide high-quality medical treatment without the need for overnight hospital stays.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  
                </motion.div>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                 
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="wavy-line"></div>
        </section>
        
        {/* Services Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl font-display font-bold text-hospital-800 mb-4">Our Ambulatory Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer a wide range of outpatient services to address your healthcare needs efficiently and effectively.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, amount: 0.1 }}
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  variants={fadeIn}
                  initial="rest"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-hospital-700 ml-3">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button variant="link" className="text-hospital-600 p-0 flex items-center" asChild>
                        <a href={`#${service.id}`}>
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Animated Achievements Section */}
        <section className="py-16 bg-hospital-50">
          <div className="container mx-auto px-4">
            <AnimatedAchievements 
              achievements={achievements} 
              title="Our Healthcare Achievements" 
              description="We are proud of our impact on the community and our continued commitment to excellence in ambulatory care."
            />
          </div>
        </section>
        
        {/* Our History Timeline */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-hospital-800 mb-4">Our History</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how our ambulatory services have evolved to meet the changing needs of our community.
              </p>
            </motion.div>
            
            <AnimatedTimeline items={historyData} className="mt-12" />
          </div>
        </section>
        
        {/* Comprehensive Healthcare Services */}
        <section className="py-16 bg-hospital-50">
          <div className="container mx-auto px-4">
            <AnimatedHealthcareServices 
              services={healthcareServices}
              title="Comprehensive Healthcare Services"
              description="Our integrated approach to ambulatory care ensures that all your healthcare needs are met under one roof."
            />
          </div>
        </section>
        
        {/* Detailed Services Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="primary-care" className="w-full">
              <TabsList className="grid w-full md:w-fit mx-auto grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="primary-care">Primary Care</TabsTrigger>
                <TabsTrigger value="urgent-care">Urgent Care</TabsTrigger>
                <TabsTrigger value="diagnostic-services">Diagnostics</TabsTrigger>
                <TabsTrigger value="specialty-care">Specialty Care</TabsTrigger>
              </TabsList>
              
              {services.map((service) => (
                <TabsContent key={service.id} value={service.id} className="w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <motion.div
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {service.icon}
                            </motion.div>
                            <div className="ml-4">
                              <CardTitle className="text-2xl text-hospital-700">{service.title}</CardTitle>
                              <CardDescription className="text-lg">{service.description}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1 text-hospital-600 border-hospital-200 bg-hospital-50" animate>
                            <CalendarClock className="h-3 w-3" />
                            Outpatient
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-medium text-lg mb-3">What We Offer</h4>
                          <motion.ul 
                            className="grid grid-cols-1 md:grid-cols-2 gap-2"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                          >
                            {service.features.map((feature, index) => (
                              <motion.li 
                                key={index} 
                                className="flex items-start"
                                variants={fadeIn}
                              >
                                <motion.div 
                                  className="mr-2 mt-1 bg-hospital-100 rounded-full p-1"
                                  initial={{ scale: 1 }}
                                  whileHover={{ scale: 1.2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <svg className="h-3 w-3 text-hospital-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </motion.div>
                                <span className="text-gray-700">{feature}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.div 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            <Clock className="h-5 w-5 mr-2 text-hospital-600" />
                            <div>
                              <h4 className="font-medium mb-1">Hours of Operation</h4>
                              <p className="text-gray-600">{service.hours}</p>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="flex items-start"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            <MapPin className="h-5 w-5 mr-2 text-hospital-600" />
                            <div>
                              <h4 className="font-medium mb-1">Location</h4>
                              <p className="text-gray-600">{service.location}</p>
                            </div>
                          </motion.div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <motion.div
                          initial="rest"
                          whileHover="hover"
                          variants={buttonHover}
                        >
                          <Button variant="outline">View Providers</Button>
                        </motion.div>
                        <motion.div
                          initial="rest"
                          whileHover="hover"
                          variants={buttonHover}
                        >
                          <Button>Schedule Appointment</Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Patient Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-hospital-800 mb-4">Patient Information</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about our ambulatory services to ensure a smooth and effective visit.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div variants={fadeIn}>
                <Card className="bg-hospital-50 border-none hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-hospital-700">
                      <Calendar className="h-5 w-5 mr-2" /> Before Your Visit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul 
                      className="space-y-3"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      {[
                        "Review any pre-appointment instructions",
                        "Gather your medical records and medication list",
                        "Verify your insurance coverage",
                        "Complete pre-registration forms online",
                        "Plan transportation to and from the facility"
                      ].map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="text-gray-700"
                          variants={fadeIn}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Card className="bg-hospital-50 border-none hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-hospital-700">
                      <Clock className="h-5 w-5 mr-2" /> During Your Visit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul 
                      className="space-y-3"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      {[
                        "Arrive 15 minutes before your appointment",
                        "Bring your ID, insurance card, and payment method",
                        "Ask questions about your care plan",
                        "Take notes on recommendations and instructions",
                        "Understand next steps before leaving"
                      ].map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="text-gray-700"
                          variants={fadeIn}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Card className="bg-hospital-50 border-none hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-hospital-700">
                      <Clipboard className="h-5 w-5 mr-2" /> After Your Visit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul 
                      className="space-y-3"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      {[
                        "Follow your care plan as directed",
                        "Fill any prescriptions you received",
                        "Schedule follow-up appointments",
                        "Check the patient portal for test results",
                        "Contact us with any questions or concerns"
                      ].map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="text-gray-700"
                          variants={fadeIn}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-hospital-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about our ambulatory services.
              </p>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-hospital-700 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="bg-hospital-50 rounded-lg shadow-sm overflow-hidden"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <motion.h2 
                      className="text-2xl md:text-3xl font-display font-bold text-hospital-800 mb-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Need More Information?
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-gray-600 mb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      Our dedicated ambulatory care team is here to answer your questions and provide the information you need.
                    </motion.p>
                    <motion.div 
                      className="space-y-4"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      <motion.div 
                        className="flex items-start"
                        variants={fadeIn}
                      >
                        <Phone className="h-5 w-5 mr-3 text-hospital-600" />
                        <div>
                          <p className="font-medium text-hospital-700">Phone Support</p>
                          <p className="text-gray-600">+254 700 520 008</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start"
                        variants={fadeIn}
                      >
                        <Clock className="h-5 w-5 mr-3 text-hospital-600" />
                        <div>
                          <p className="font-medium text-hospital-700">Support Hours</p>
                          <p className="text-gray-600">Monday - Friday: 8:00 AM - 8:00 PM</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="bg-white p-6 rounded-lg shadow-sm"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold text-hospital-700 mb-4">Send Us a Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-hospital-500 focus:ring-hospital-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-hospital-500 focus:ring-hospital-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-hospital-500 focus:ring-hospital-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-hospital-500 focus:ring-hospital-500"
                        />
                      </div>
                      <motion.div
                        initial="rest"
                        whileHover="hover"
                        variants={buttonHover}
                      >
                        <Button className="w-full">Send Message</Button>
                      </motion.div>
                    </form>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AmbulatoryServices;
