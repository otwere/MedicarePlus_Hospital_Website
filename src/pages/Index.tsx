
import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Phone, 
  MapPin, 
  Star,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
  HeartPulse,
  Award,
  Stethoscope,
  GraduationCap,
  Ambulance
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AnimatedTimeline from "@/components/AnimatedTimeline";
import AnimatedAchievements from "@/components/AnimatedAchievements";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  // Featured Departments
  const featuredDepartments = [
    {
      id: "cardiology",
      name: "Cardiology",
      description: "Comprehensive care for heart and cardiovascular conditions.",
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      id: "neurology",
      name: "Neurology",
      description: "Expert care for brain, spine, and nervous system disorders.",
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      description: "Specialized treatment for bone, joint, and musculoskeletal issues.",
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      description: "Dedicated healthcare for infants, children, and adolescents.",
      icon: <HeartPulse className="h-5 w-5" />,
    },
  ];

  // Featured Doctors
  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Jonathan Hart",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      specialty: "Neurology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      name: "Dr. Robert Anderson",
      specialty: "Orthopedics",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3",
    },
    {
      id: 5,
      name: "Dr. Maria Rodriguez",
      specialty: "Pediatrics",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    },
  ];

  // Timeline history items
  const historyItems = [
    {
      year: "1988",
      title: "Foundation",
      description: "MediCare Plus was established with a mission to provide quality healthcare to the community."
    },
    {
      year: "1995",
      title: "New Hospital Wing",
      description: "Expanded our facilities with a new wing dedicated to specialized treatments and advanced care."
    },
    {
      year: "2003",
      title: "Research Center",
      description: "Launched our medical research center to advance healthcare through innovation and discovery."
    },
    {
      year: "2010",
      title: "Technological Advancement",
      description: "Implemented state-of-the-art medical technology and digital healthcare systems."
    },
    {
      year: "2015",
      title: "Community Outreach",
      description: "Expanded our reach with community health programs and mobile medical services."
    },
    {
      year: "2023",
      title: "Excellence Recognition",
      description: "Received national recognition for excellence in patient care and medical innovation."
    }
  ];

  // Achievements data
  const achievements = [
    {
      value: 35,
      title: "Years of Excellence",
      description: "Providing quality healthcare services since 1988.",
      suffix: "+"
    },
    {
      value: 150,
      title: "Medical Specialists",
      description: "Board-certified doctors across various medical specialties.",
      suffix: "+"
    },
    {
      value: 50000,
      title: "Patients Served",
      description: "Successfully treated patients with a high satisfaction rate.",
      suffix: "+"
    },
    {
      value: 15,
      title: "Specialized Departments",
      description: "Comprehensive healthcare covering all major medical fields.",
      suffix: "+"
    }
  ];

  // Ambulance services
  const ambulanceServices = [
    {
      title: "Emergency Medical Transport",
      category: "Emergency",
      description: "24/7 emergency ambulance service with advanced life support equipment and trained paramedics.",
      image: "https://images.unsplash.com/photo-1616362258059-9e5e85f6a7b8?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
      icon: <Ambulance className="h-5 w-5" />
    },
    {
      title: "Non-Emergency Medical Transport",
      category: "Scheduled",
      description: "Pre-scheduled transportation for patients requiring medical supervision during transit.",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b3e3633?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
      icon: <Stethoscope className="h-5 w-5" />
    },
    {
      title: "Mobile Intensive Care Unit",
      category: "Critical Care",
      description: "Specialized ambulances equipped with ICU capabilities for critical patients needing intensive care during transport.",
      image: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
      icon: <GraduationCap className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-hospital-50 to-white">
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-hospital-100/30 to-transparent z-0"></div>
    <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-hospital-100/10 rounded-full filter blur-3xl"></div>
  </div>
  
  <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-hospital-100 text-hospital-600">
            <Award className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-hospital-700">Ranked #1 in Patient Care</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-hospital-900 leading-tight mb-6">
          Advanced <span className="text-hospital-600">Healthcare</span> with Compassionate Expertise
        </h1>
        
        <p className="text-md text-gray-600 mb-8 leading-relaxed">
          At MediCare Plus, we blend cutting-edge medical technology with personalized care to deliver exceptional health outcomes. Our patient-centered approach ensures you receive the best treatment tailored to your needs.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-10">
          <Button asChild className="bg-hospital-600 hover:bg-hospital-700 text-white px-6 py-4 text-sm">
            <Link to="/appointments">
              <Calendar className="mr-3 h-5 w-5" />
              Book an Appointment
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-hospital-300 text-hospital-700 hover:bg-hospital-700 px-6 py-4 text-sm">
            <Link to="/departments">
              <ArrowRight className="mr-3 h-5 w-5" />
              Explore Services
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-hospital-100 text-hospital-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="font-medium text-gray-700">JCI Accredited</span>
          </div>
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-hospital-100 text-hospital-600">
              <CheckCircle className="h-4 w-4" />
            </div>
            <span className="font-medium text-gray-700">98% Patient Satisfaction</span>
          </div>
        </div>
      </div>
      
      <div className="relative hidden lg:block">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-hospital-100/30 filter blur-xl z-0"></div>
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-mint-100/30 filter blur-xl z-0"></div>
        
        <div className="relative z-10">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3" 
              alt="Doctor consulting with patient"
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg w-64">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-hospital-100 text-hospital-600">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-hospital-800">Emergency Care</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">24/7 emergency services with rapid response teams</p>
            <Button asChild variant="link" className="text-hospital-600 p-0 h-auto text-sm">
              <Link to="/emergency">
                Call Now <Phone className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        {/* Quick Contact Info */}
        <section className="bg-white py-6 ">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="h-5 w-5 text-hospital-500" />
                <span className="text-gray-700">Emergency : +254 700 520 008</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Clock className="h-5 w-5 text-hospital-500" />
                <span className="text-gray-700">Open Hours : Mon-Fri 8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-end">
                <MapPin className="h-5 w-5 text-hospital-500" />
                <span className="text-gray-700">123 Healthcare Avenue, Medical District - Nairobi</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Departments */}
        <section className="py-16 bg-gradient-to-r from-hospital-50 to-mint-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-hospital-800 mb-4">
                Our Medical Departments
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our specialized departments committed to providing exceptional care across all medical fields.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredDepartments.map((department) => (
                <Card 
                  key={department.id} 
                  className="bg-white hover:shadow-lg transition-all duration-300 border-transparent hover:border-hospital-200"
                >
                  <CardHeader>
                    <div className="bg-hospital-100 w-12 h-12 rounded-full flex items-center justify-center text-hospital-600 mb-4">
                      {department.icon}
                    </div>
                    <CardTitle className="text-xl text-hospital-700">{department.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{department.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full border-hospital-200 text-hospital-700 hover:bg-orange-400">
                      <Link to={`/departments/${department.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild className="bg-hospital-600 hover:bg-hospital-700">
                <Link to="/departments">
                  View All Departments <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Doctors */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-hospital-800 mb-4">
                Meet Our Experts
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our team of experienced doctors and specialists are committed to providing the highest quality healthcare.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredDoctors.map((doctor) => (
                <Card 
                  key={doctor.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-transparent hover:border-hospital-200"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-hospital-700">{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full border-hospital-200 text-hospital-700 hover:bg-orange-400">
                      <Link to="/doctors">
                        View Profile
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild className="bg-hospital-600 hover:bg-hospital-700">
                <Link to="/doctors">
                  View All Doctors <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our History Timeline */}
        <section className="py-16 bg-gradient-to-r from-hospital-50 to-mint-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-hospital-800 mb-4">
                Our History
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                For over three decades, MediCare Plus has been at the forefront of medical excellence and compassionate care.
              </p>
            </div>
            
            <AnimatedTimeline items={historyItems} className="mt-16" />
          </div>
        </section>

        {/* Our Achievements */}
        <section className="py-16 bg-white">
          <AnimatedAchievements 
            achievements={achievements} 
            title="Our Achievements"
            description="We take pride in our commitment to excellence, innovation, and patient care throughout our journey."
          />
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-to-r from-hospital-50 to-mint-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-hospital-800 mb-4">
                Why Choose MediCare Plus
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to providing exceptional healthcare with compassion, expertise, and advanced technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white hover:shadow-lg transition-all duration-300 border-transparent hover:border-hospital-200">
                <CardHeader>
                  <div className="bg-hospital-100 w-12 h-12 rounded-full flex items-center justify-center text-hospital-600 mb-4">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl text-hospital-700">Accredited Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our hospital has received top accreditation from national healthcare organizations, ensuring we meet rigorous standards for patient care, safety, and quality.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Joint Commission Accredited</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Top Hospital Safety Grade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Excellence in Patient Safety</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-all duration-300 border-transparent hover:border-hospital-200">
                <CardHeader>
                  <div className="bg-hospital-100 w-12 h-12 rounded-full flex items-center justify-center text-hospital-600 mb-4">
                    <Award className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl text-hospital-700">Expert Medical Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our hospital is home to a diverse team of board-certified physicians, specialists, and healthcare professionals committed to excellence in patient care.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Board-Certified Physicians</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Specialized Medical Training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Multidisciplinary Approach</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-all duration-300 border-transparent hover:border-hospital-200">
                <CardHeader>
                  <div className="bg-hospital-100 w-12 h-12 rounded-full flex items-center justify-center text-hospital-600 mb-4">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl text-hospital-700">Advanced Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We invest in cutting-edge medical technology and equipment to provide accurate diagnosis, effective treatments, and improved patient outcomes.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">State-of-the-Art Imaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Minimally Invasive Procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-hospital-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Advanced Surgical Systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-hospital-700 mb-2">35+</div>
                  <p className="text-gray-600">Years of Excellence</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-hospital-700 mb-2">100+</div>
                  <p className="text-gray-600">Experienced Doctors</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-hospital-700 mb-2">50k+</div>
                  <p className="text-gray-600">Satisfied Patients</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-hospital-700 mb-2">15+</div>
                  <p className="text-gray-600">Medical Specialties</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Highlights */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-hospital-800 mb-4">
                Comprehensive Healthcare Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From preventive care to specialized treatments, we offer a wide range of services to meet all your healthcare needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-hospital-50 p-6 rounded-xl">
                <h3 className="text-xl font-display font-bold text-hospital-700 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-hospital-600" />
                  Preventive Care
                </h3>
                <p className="text-gray-600 mb-4">
                  Regular check-ups, screenings, and immunizations to maintain health and prevent disease.
                </p>
                <Button asChild variant="link" className="text-hospital-600 p-0 hover:text-hospital-700">
                  <Link to="/appointments">
                    Schedule Check-Up <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-mint-50 p-6 rounded-xl">
                <h3 className="text-xl font-display font-bold text-hospital-700 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-hospital-600" />
                  Diagnostic Services
                </h3>
                <p className="text-gray-600 mb-4">
                  Advanced imaging and laboratory testing for accurate diagnosis and treatment planning.
                </p>
                <Button asChild variant="link" className="text-hospital-600 p-0 hover:text-hospital-700">
                  <Link to="/departments">
                    Explore Diagnostics <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-hospital-50 p-6 rounded-xl">
                <h3 className="text-xl font-display font-bold text-hospital-700 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-hospital-600" />
                  Specialized Treatments
                </h3>
                <p className="text-gray-600 mb-4">
                  Cutting-edge treatments and procedures for complex medical conditions.
                </p>
                <Button asChild variant="link" className="text-hospital-600 p-0 hover:text-hospital-700">
                  <Link to="/departments">
                    View Treatments <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-mint-50 p-6 rounded-xl">
                <h3 className="text-xl font-display font-bold text-hospital-700 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-hospital-600" />
                  Emergency Care
                </h3>
                <p className="text-gray-600 mb-4">
                  24/7 emergency services with rapid response for critical medical situations.
                </p>
                <Button asChild variant="link" className="text-hospital-600 p-0 hover:text-hospital-700">
                  <Link to="/contact">
                    Emergency Info <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-hospital-50 p-6 rounded-xl">
                <h3 className="text-xl font-display font-bold text-hospital-700 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-hospital-600" />
                  Rehabilitation Services
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive rehabilitation programs to help patients recover function and mobility.
                </p>
                <Button asChild variant="link" className="text-hospital-600 p-0 hover:text-hospital-700">
                  <Link to="/departments">
                    Learn About Rehab <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-mint-50 p-6 rounded-xl">
                <h3 className="text-xl font-display font-bold text-hospital-700 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-hospital-600" />
                  Telehealth Consultations
                </h3>
                <p className="text-gray-600 mb-4">
                  Virtual appointments with healthcare providers for convenient access to care.
                </p>
                <Button asChild variant="link" className="text-hospital-600 p-0 hover:text-hospital-700">
                  <Link to="/appointments">
                    Virtual Visits <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Book Appointment */}
        <section className="py-16 bg-gradient-to-r from-hospital-600 to-hospital-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Ready to Experience Exceptional Healthcare?
                </h2>
                <p className="text-lg mb-8 text-white/90 max-w-xl">
                  Schedule an appointment with our expert medical team. Same-day and next-day appointments are available for your convenience.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-white text-hospital-700 hover:bg-gray-100">
                    <Link to="/appointments">
                      Book an Appointment <Calendar className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span className="text-lg font-medium">Call us at +254 700 520 008</span>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="blob-shape-alt w-80 h-80 top-[-30px] right-[-30px]"></div>
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3" 
                  alt="Doctor with patient" 
                  className="rounded-2xl shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ambulance Services (replacing Educational Resources) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-hospital-800 mb-4">
                Ambulance Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our emergency and non-emergency medical transportation services are available 24/7, equipped with advanced life-saving technology and staffed by trained medical professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ambulanceServices.map((service, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-transparent hover:border-hospital-200"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <Badge className="mb-2">{service.category}</Badge>
                    <CardTitle className="text-lg text-hospital-700">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full border-hospital-200 text-hospital-700 hover:bg-orange-400">
                      <Link to="/ambulatory-services">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
