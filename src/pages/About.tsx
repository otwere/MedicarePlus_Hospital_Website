
import React, { useState } from "react";
import { CheckCircle, Award, Users, Heart, Calendar, ArrowRight, ChevronDown, ChevronUp, Play, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  const [expandedHistoryItem, setExpandedHistoryItem] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleHistoryItem = (id: string) => {
    if (expandedHistoryItem === id) {
      setExpandedHistoryItem(null);
    } else {
      setExpandedHistoryItem(id);
    }
  };

  const historyItems = [
    {
      id: "1988",
      year: "1988",
      title: "Foundation",
      content: "Founded as a small clinic with just 5 doctors and 15 staff members. Our vision was to provide accessible healthcare to the local community with a focus on preventive care.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
    },
    {
      id: "1995",
      year: "1995",
      title: "Expansion",
      content: "Expanded to a full-service hospital with multiple departments and specialized care units. Added state-of-the-art diagnostic equipment and increased capacity to 150 beds.",
      image: "https://images.unsplash.com/photo-1516549655669-df62a5d18a5d?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    },
    {
      id: "2008",
      year: "2008",
      title: "Innovation",
      content: "Introduced cutting-edge medical technologies and became a regional center for medical excellence. Established research partnerships with leading universities and medical institutions.",
      image: "https://images.unsplash.com/photo-1631217868264-e6f75cc0d349?auto=format&fit=crop&q=80&w=3121&ixlib=rb-4.0.3",
    },
    {
      id: "2023",
      year: "2023",
      title: "Transformation",
      content: "Rebranded as MediCare Plus and established multidisciplinary research centers and educational programs. Expanded to include telemedicine services and personalized healthcare solutions.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Excellence in Patient Care",
      description: "Recognized for exceptional patient satisfaction and outcomes by the National Healthcare Association.",
      year: "2023",
      details: "Achieved 98% patient satisfaction rate, significantly above the national average of 82%."
    },
    {
      icon: Award,
      title: "Research Innovation",
      description: "Over 200 published research papers and clinical trials contributing to medical advancements.",
      year: "2022",
      details: "Research contributions led to breakthrough treatments in cardiology and neurology."
    },
    {
      icon: Award,
      title: "Community Impact",
      description: "Provided healthcare services to over 500,000 patients and conducted free health camps.",
      year: "2021",
      details: "Conducted 52 free health camps in underserved communities, providing care to over 15,000 people."
    },
    {
      icon: Award,
      title: "Medical Education",
      description: "Developed innovative medical education programs for healthcare professionals.",
      year: "2020",
      details: "Trained over 500 healthcare professionals through specialized continuing education programs."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We treat each patient with kindness, empathy, and respect, acknowledging their unique needs and concerns.",
      examples: [
        "Personalized care plans tailored to individual needs",
        "Extended visiting hours for family members",
        "Patient support groups and counseling services"
      ]
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in medical care, continuously improving our skills and services.",
      examples: [
        "Regular skill enhancement programs for staff",
        "Implementation of latest medical protocols",
        "Quality improvement initiatives across departments"
      ]
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "We collaborate effectively, valuing each team member's contribution to provide comprehensive care.",
      examples: [
        "Multidisciplinary approach to complex cases",
        "Cross-department collaboration on patient care",
        "Regular team-building and communication training"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 relative">
            <div className="wavy-bg-pattern absolute inset-0 opacity-10 z-0"></div>
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold text-hospital-800 mb-4 relative z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About MediCare Plus
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Committed to excellence in healthcare for over 35 years, providing compassionate and innovative medical services.
            </motion.p>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-hospital-50 to-transparent rounded-xl -rotate-3 transform"></div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3" 
                  alt="Hospital team meeting" 
                  className="rounded-xl shadow-lg relative z-10 w-full"
                />
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-20"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="h-6 w-6 text-hospital-600 ml-1" />
                </div>
                
                {/* Video Modal */}
                {isVideoPlaying && (
                  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-5xl">
                      <button 
                        className="absolute -top-10 right-0 text-white"
                        onClick={() => setIsVideoPlaying(false)}
                      >
                        Close
                      </button>
                      <div className="responsive-video">
                        <iframe 
                          width="100%" 
                          height="480" 
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                          title="Our Mission Video" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-hospital-700 mb-4 relative">
                Our Mission & Vision
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-hospital-500"></span>
              </h2>
              <p className="text-gray-600 mb-6">
                At MediCare Plus, our mission is to enhance the health and wellbeing of the communities we serve through exceptional care, innovation, education, research, and a commitment to compassion.
              </p>
              <p className="text-gray-600 mb-6">
                Our vision is to be the leading healthcare provider recognized for excellence in patient care, innovative treatments, and outstanding service. We strive to create a healing environment where patients receive personalized, high-quality healthcare.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-hospital-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Patient-centered approach to healthcare</p>
                </div>
                <div className="flex items-start gap-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-hospital-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Commitment to medical excellence and innovation</p>
                </div>
                <div className="flex items-start gap-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-hospital-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Compassionate care for all patients</p>
                </div>
                <div className="flex items-start gap-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-hospital-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Continuous improvement in medical practices</p>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="bg-gradient-to-r from-hospital-50 to-mint-50 rounded-xl p-8 md:p-12 mb-24 relative overflow-hidden">
            <div className="wavy-line absolute bottom-0 opacity-50"></div>
            <h2 className="text-3xl font-display font-bold text-hospital-700 mb-10 text-center">Our History</h2>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-hospital-200 z-0"></div>
              
              <div className="space-y-8">
                {historyItems.map((item, index) => (
                  <div key={item.id} className="relative z-10">
                    <div 
                      className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${expandedHistoryItem === item.id ? 'bg-hospital-600' : 'bg-hospital-400'} border-4 border-white z-20`}
                    ></div>
                    
                    <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                        <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer" onClick={() => toggleHistoryItem(item.id)}>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-display font-bold text-hospital-700">{item.year}</h3>
                            <div className={`${expandedHistoryItem === item.id ? 'text-hospital-600' : 'text-hospital-400'}`}>
                              {expandedHistoryItem === item.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                          </div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.content.substring(0, 70)}...</p>
                          
                          <AnimatePresence>
                            {expandedHistoryItem === item.id && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 mt-4 border-t border-gray-100">
                                  <p className="text-gray-600 mb-4">{item.content}</p>
                                  <img 
                                    src={item.image} 
                                    alt={`MediCare Plus in ${item.year}`} 
                                    className="rounded-md w-full h-32 object-cover"
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-display font-bold text-hospital-700 mb-12 text-center">Our Core Values</h2>
            
            <Tabs defaultValue="compassion" className="w-full">
              <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 mb-10">
                {values.map((value) => (
                  <TabsTrigger key={value.title.toLowerCase()} value={value.title.toLowerCase()}>
                    {value.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {values.map((value) => (
                <TabsContent key={value.title.toLowerCase()} value={value.title.toLowerCase()} className="mt-4">
                  <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="bg-hospital-100 w-48 h-48 flex items-center justify-center rounded-full p-8">
                        <value.icon className="h-24 w-24 text-hospital-600" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-display font-bold text-hospital-700 mb-4">{value.title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">{value.description}</p>
                      
                      <h4 className="font-medium text-hospital-600 mb-3">How we put this into practice:</h4>
                      <ul className="space-y-2">
                        {value.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCheck className="h-5 w-5 text-hospital-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 mb-24">
            <h2 className="text-3xl font-display font-bold text-hospital-700 mb-8">Our Achievements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <div className="h-full flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3" 
                    alt="Medical award ceremony" 
                    className="rounded-xl shadow-md w-full"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  {/* Achievement Timeline */}
                  <div className="space-y-8">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className="achievement-card relative pl-10 before:content-[''] before:absolute before:left-[15px] before:top-10 before:w-0.5 before:h-full before:bg-hospital-100"
                      >
                        <div className="flex items-start gap-4 relative">
                          <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-hospital-500 border-[3px] border-white z-10"></div>
                          
                          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full group">
                            <div className="text-sm text-hospital-600 font-medium mb-1">{achievement.year}</div>
                            <h3 className="text-xl font-display font-bold text-hospital-700 mb-2 group-hover:text-hospital-600 transition-colors">{achievement.title}</h3>
                            <p className="text-gray-600 mb-4">{achievement.description}</p>
                            <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                              {achievement.details}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-hospital-600 to-hospital-800 rounded-xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-4">Join Our Healthcare Journey</h2>
                <p className="mb-6">
                  Experience exceptional healthcare services at MediCare Plus. Our expert team is ready to provide personalized care for you and your family.
                </p>
                {/* <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-white text-hospital-700 hover:bg-gray-100">
                    <Link to="/appointments">Book an Appointment</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div> */}
              </div>
              <div className="relative hidden md:block">
                <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-hospital-500/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3" 
                  alt="Doctor with patient" 
                  className="rounded-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
