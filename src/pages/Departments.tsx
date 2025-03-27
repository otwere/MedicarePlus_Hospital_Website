
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const departments = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Specialized care for heart and cardiovascular conditions.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Advanced cardiac imaging",
      "Heart failure treatment",
      "Cardiac rehabilitation",
      "Arrhythmia management",
    ],
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Comprehensive care for brain, spine, and nervous system disorders.",
    image: "https://images.unsplash.com/photo-1559757175-7b21578095cd?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Stroke treatment and prevention",
      "Epilepsy monitoring",
      "Movement disorders clinic",
      "Neurodiagnostic testing",
    ],
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Expert care for musculoskeletal injuries, disorders, and conditions.",
    image: "https://images.unsplash.com/photo-1583756946662-459f8913b44b?auto=format&fit=crop&q=80&w=3264&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Joint replacement surgery",
      "Sports medicine",
      "Spine disorders treatment",
      "Fracture care",
    ],
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Specialized healthcare for infants, children, and adolescents.",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Well-child visits",
      "Pediatric immunizations",
      "Developmental assessments",
      "Childhood illness treatment",
    ],
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Comprehensive care for skin, hair, and nail conditions.",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2827b?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Skin cancer screening",
      "Dermatologic surgery",
      "Cosmetic dermatology",
      "Psoriasis and eczema treatment",
    ],
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "Complete eye care services from routine exams to complex surgeries.",
    image: "https://images.unsplash.com/photo-1614846384571-1e68fbd874a3?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Comprehensive eye exams",
      "Cataract surgery",
      "LASIK and refractive surgery",
      "Glaucoma management",
    ],
  },
  {
    id: "dentistry",
    name: "Dentistry",
    description: "Complete dental care from preventive services to restorative procedures.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=3269&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Preventive dental care",
      "Restorative dentistry",
      "Cosmetic dental procedures",
      "Pediatric dentistry",
    ],
  },
  {
    id: "psychiatry",
    name: "Psychiatry",
    description: "Compassionate mental health care for various psychiatric conditions.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Mental health assessment",
      "Medication management",
      "Individual therapy",
      "Group therapy sessions",
    ],
  },
];

const Departments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <div className="wavy-bg">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-hospital-800 mb-4">
                Our Medical Departments
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                MediCare Plus offers comprehensive healthcare services through our specialized departments, each staffed with experienced medical professionals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department) => (
              <Card 
                key={department.id} 
                className="overflow-hidden transition-all duration-300 hover:shadow-lg border-transparent hover:border-hospital-200"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={department.image} 
                    alt={department.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-hospital-700">{department.name}</CardTitle>
                  <CardDescription>{department.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {department.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-hospital-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-hospital-600 hover:bg-hospital-700">
                    <Link to={`/departments/${department.id}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="wave-section-divider"></div>

          <div className="mt-16 curly-bg bg-gradient-to-r from-hospital-50 to-mint-50 rounded-xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-hospital-800 mb-4">
                  Need Specialized Care?
                </h2>
                <p className="text-gray-600 mb-6">
                  Our specialists work together across departments to provide comprehensive, coordinated care for complex medical conditions.
                </p>
                <Button asChild className="bg-hospital-600 hover:bg-hospital-700">
                  <Link to="/appointments">Schedule a Consultation</Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="blob-shape w-64 h-64 top-[-20px] left-[-20px]"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1631815588090-d4bfec5b9445?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3" 
                    alt="Medical team" 
                    className="rounded-lg shadow-lg relative z-10 max-w-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wave-section-divider-alt"></div>
      <Footer />
    </div>
  );
};

export default Departments;
