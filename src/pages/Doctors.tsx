import React, { useState } from "react";
import { Search, Filter, User, Phone, Mail, Calendar, X, Star } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

// Define the doctors data
const doctorsData = [
  {
    id: 1,
    name: "Dr. Jonathan Hart",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, PhD, FACC",
    experience: "20+ years",
    languages: ["English", "Spanish"],
    about: "Dr. Hart is a renowned cardiologist with over 20 years of experience in treating cardiovascular diseases. He specializes in interventional cardiology and has performed thousands of cardiac procedures with excellent outcomes. He is passionate about preventive cardiology and helping patients maintain heart health.",
    education: [
      "Medical Degree: Harvard Medical School",
      "Residency: Massachusetts General Hospital",
      "Fellowship: Cleveland Clinic (Cardiovascular Disease)"
    ],
    awards: [
      "Excellence in Cardiac Care Award, 2022",
      "Outstanding Physician Award, 2019",
      "Research Innovation Medal, 2017"
    ],
    research: "Dr. Hart has published over 50 research papers in prestigious medical journals, focusing on novel treatments for heart failure and minimally invasive cardiac procedures.",
    availability: "Monday, Wednesday, Friday"
  },
  {
    id: 2,
    name: "Dr. Emily Chen",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, FACC, FSCAI",
    experience: "15+ years",
    languages: ["English", "Mandarin"],
    about: "Dr. Chen specializes in heart failure management and transplant cardiology. With 15 years of experience, she has developed expertise in advanced heart failure therapies and has helped numerous patients improve their quality of life through innovative treatment approaches.",
    education: [
      "Medical Degree: Stanford University School of Medicine",
      "Residency: UCSF Medical Center",
      "Fellowship: Johns Hopkins Hospital (Advanced Heart Failure and Transplant Cardiology)"
    ],
    awards: [
      "Heart Failure Physician of the Year, 2021",
      "Outstanding Clinical Researcher Award, 2018"
    ],
    research: "Dr. Chen's research focuses on improving outcomes in heart transplantation and mechanical circulatory support devices. She has led several clinical trials on novel heart failure therapies.",
    availability: "Tuesday, Thursday, Saturday"
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, PhD, FAAN",
    experience: "18+ years",
    languages: ["English", "French"],
    about: "Dr. Williams is a leading neurologist specializing in stroke treatment and research. She has pioneered several innovative approaches to stroke prevention and rehabilitation. Her patient-centered approach focuses on comprehensive care that addresses both the physical and emotional aspects of neurological disorders.",
    education: [
      "Medical Degree: Yale School of Medicine",
      "Residency: Mayo Clinic (Neurology)",
      "Fellowship: Johns Hopkins University (Vascular Neurology)"
    ],
    awards: [
      "Stroke Innovation Award, 2022",
      "Distinguished Clinician Award, 2020",
      "Excellence in Neurology Research, 2016"
    ],
    research: "Dr. Williams has conducted groundbreaking research on acute stroke interventions and neuroprotective therapies, with over 40 publications in peer-reviewed journals.",
    availability: "Monday, Tuesday, Thursday"
  },
  {
    id: 4,
    name: "Dr. Robert Anderson",
    specialty: "Orthopedics",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3",
    qualifications: "MD, FAAOS",
    experience: "22+ years",
    languages: ["English"],
    about: "Dr. Anderson is an accomplished orthopedic surgeon specializing in joint replacement procedures. He has performed over 5,000 knee and hip replacements with exceptional outcomes. He is dedicated to utilizing minimally invasive techniques that lead to faster recovery times and improved patient satisfaction.",
    education: [
      "Medical Degree: Duke University School of Medicine",
      "Residency: Hospital for Special Surgery (Orthopedic Surgery)",
      "Fellowship: Rothman Orthopaedic Institute (Joint Replacement)"
    ],
    awards: [
      "Top Orthopedic Surgeon Award, 2021",
      "Innovative Surgical Technique Award, 2019",
      "Patient's Choice Award, 2017-2023"
    ],
    research: "Dr. Anderson has contributed to the development of improved joint replacement techniques and prosthetics. His research has focused on optimizing outcomes and longevity of joint replacements.",
    availability: "Wednesday, Thursday, Friday"
  },
  {
    id: 5,
    name: "Dr. Maria Rodriguez",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, FAAP",
    experience: "25+ years",
    languages: ["English", "Spanish"],
    about: "Dr. Rodriguez has dedicated over 25 years to pediatric medicine, focusing on providing compassionate, comprehensive care for children from birth through adolescence. She specializes in developmental pediatrics and child wellness, with a particular interest in early childhood development and preventive care.",
    education: [
      "Medical Degree: Columbia University College of Physicians and Surgeons",
      "Residency: Children's Hospital of Philadelphia (Pediatrics)",
      "Fellowship: Boston Children's Hospital (Developmental Pediatrics)"
    ],
    awards: [
      "Pediatrician of the Year, 2020",
      "Compassionate Doctor Award, 2018-2023",
      "Child Advocacy Recognition, 2016"
    ],
    research: "Dr. Rodriguez's research focuses on early childhood developmental milestones and interventions for developmental delays. She has published numerous articles on childhood obesity prevention and effective vaccination strategies.",
    availability: "Monday, Tuesday, Friday"
  },
  {
    id: 6,
    name: "Dr. Rebecca Moore",
    specialty: "Dermatology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, FAAD",
    experience: "17+ years",
    languages: ["English"],
    about: "Dr. Moore is a board-certified dermatologist with expertise in skin cancer detection and treatment. With 17 years of experience, she has developed a reputation for her meticulous skin examinations and skilled surgical techniques. She is passionate about skin cancer prevention and patient education.",
    education: [
      "Medical Degree: University of Pennsylvania School of Medicine",
      "Residency: New York University (Dermatology)",
      "Fellowship: Memorial Sloan Kettering Cancer Center (Mohs Surgery)"
    ],
    awards: [
      "Excellence in Dermatologic Surgery Award, 2021",
      "Patient Education Innovation Award, 2019",
      "Top Dermatologist Recognition, 2016-2023"
    ],
    research: "Dr. Moore has conducted extensive research on early melanoma detection techniques and minimally invasive treatment approaches for skin cancer. She has published over 30 peer-reviewed articles in dermatology journals.",
    availability: "Tuesday, Wednesday, Thursday"
  },
  {
    id: 7,
    name: "Dr. Richard Kim",
    specialty: "Ophthalmology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, FACS",
    experience: "20+ years",
    languages: ["English", "Korean"],
    about: "Dr. Kim is a pioneer in advanced cataract surgery techniques with over 20 years of ophthalmology experience. He has performed more than 10,000 cataract surgeries and specializes in premium intraocular lens implantation. He is known for his precision in surgical techniques and excellent visual outcomes for patients.",
    education: [
      "Medical Degree: Johns Hopkins University School of Medicine",
      "Residency: Bascom Palmer Eye Institute (Ophthalmology)",
      "Fellowship: Jules Stein Eye Institute (Cataract and Refractive Surgery)"
    ],
    awards: [
      "Innovation in Cataract Surgery Award, 2022",
      "Best Ophthalmologist Award, 2020",
      "Surgical Excellence Recognition, 2017"
    ],
    research: "Dr. Kim has been involved in research on advanced intraocular lens technologies and minimally invasive cataract surgery techniques. His work has contributed to improving visual outcomes and reducing recovery time for patients.",
    availability: "Monday, Wednesday, Friday"
  },
  {
    id: 8,
    name: "Dr. Daniel Martinez",
    specialty: "Dentistry",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "DDS, FAGD",
    experience: "16+ years",
    languages: ["English", "Spanish"],
    about: "Dr. Martinez is a comprehensive dentist with special focus on dental implants and restorative dentistry. With 16 years of experience, he has helped thousands of patients achieve optimal oral health and beautiful smiles. He is committed to providing painless dentistry and creating a comfortable experience for patients with dental anxiety.",
    education: [
      "Dental Degree: University of California, San Francisco School of Dentistry",
      "Residency: VA Medical Center (General Dentistry)",
      "Advanced Training: Misch International Implant Institute"
    ],
    awards: [
      "Top Dentist Award, 2021-2023",
      "Excellence in Implant Dentistry, 2019",
      "Patient Satisfaction Award, 2017"
    ],
    research: "Dr. Martinez has conducted research on improved dental implant techniques and bone grafting procedures. He regularly participates in continuing education to stay at the forefront of dental innovations.",
    availability: "Tuesday, Thursday, Saturday"
  },
  {
    id: 9,
    name: "Dr. Elizabeth Howard",
    specialty: "Psychiatry",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, PhD",
    experience: "19+ years",
    languages: ["English", "German"],
    about: "Dr. Howard is a distinguished psychiatrist specializing in treatment-resistant mood disorders. With 19 years of experience, she has helped numerous patients who have not responded to conventional treatments. She takes a holistic approach to mental health, considering biological, psychological, and social factors in her treatment plans.",
    education: [
      "Medical Degree: Washington University School of Medicine",
      "Residency: Massachusetts General Hospital (Psychiatry)",
      "Fellowship: McLean Hospital (Mood Disorders)"
    ],
    awards: [
      "Psychiatric Innovation Award, 2022",
      "Mental Health Advocacy Recognition, 2020",
      "Excellence in Patient Care, 2018"
    ],
    research: "Dr. Howard has conducted groundbreaking research on novel treatments for depression and bipolar disorder. Her work includes studies on transcranial magnetic stimulation (TMS) and other neuromodulation techniques for mood disorders.",
    availability: "Monday, Tuesday, Thursday"
  },
  {
    id: 10,
    name: "Dr. Michael Roberts",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, FHRS",
    experience: "14+ years",
    languages: ["English"],
    about: "Dr. Roberts is an electrophysiologist who specializes in diagnosing and treating cardiac arrhythmias. With 14 years of experience, he has performed hundreds of complex ablation procedures and device implantations. He is dedicated to using the latest technologies to improve heart rhythm management and patient outcomes.",
    education: [
      "Medical Degree: University of Chicago Pritzker School of Medicine",
      "Residency: Brigham and Women's Hospital (Internal Medicine)",
      "Fellowship: Cleveland Clinic (Cardiovascular Disease and Cardiac Electrophysiology)"
    ],
    awards: [
      "Electrophysiology Excellence Award, 2021",
      "Innovation in Arrhythmia Management, 2019",
      "Distinguished Fellow Award, 2016"
    ],
    research: "Dr. Roberts has conducted research on advanced mapping techniques for complex arrhythmias and the effectiveness of new anticoagulation strategies in atrial fibrillation. He has published numerous articles in leading cardiac journals.",
    availability: "Wednesday, Thursday, Friday"
  },
  {
    id: 11,
    name: "Dr. David Thompson",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, FAAN",
    experience: "16+ years",
    languages: ["English"],
    about: "Dr. Thompson is a leading epileptologist specializing in the diagnosis and treatment of seizure disorders. With 16 years of experience, he has helped many patients achieve seizure control through personalized treatment plans. He is dedicated to improving quality of life for people living with epilepsy through comprehensive care and the latest therapeutic approaches.",
    education: [
      "Medical Degree: University of Michigan Medical School",
      "Residency: University of California, San Francisco (Neurology)",
      "Fellowship: Cleveland Clinic (Epilepsy)"
    ],
    awards: [
      "Epilepsy Innovation Award, 2022",
      "Seizure Management Excellence, 2020",
      "Patient Advocacy Recognition, 2018"
    ],
    research: "Dr. Thompson has conducted extensive research on new antiepileptic medications and surgical approaches for refractory epilepsy. He has been principal investigator on several clinical trials for novel epilepsy treatments.",
    availability: "Monday, Tuesday, Friday"
  },
  {
    id: 12,
    name: "Dr. Jennifer Lee",
    specialty: "Orthopedics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
    qualifications: "MD, FAAOS, FACSM",
    experience: "18+ years",
    languages: ["English", "Korean"],
    about: "Dr. Lee is a sports medicine specialist with expertise in treating athletic injuries and performing minimally invasive orthopedic procedures. With 18 years of experience, she has served as a team physician for professional sports teams and has helped athletes of all levels return to play safely after injury.",
    education: [
      "Medical Degree: University of Pennsylvania School of Medicine",
      "Residency: Hospital for Special Surgery (Orthopedic Surgery)",
      "Fellowship: Andrews Sports Medicine & Orthopaedic Center (Sports Medicine)"
    ],
    awards: [
      "Sports Medicine Excellence Award, 2021",
      "Arthroscopic Surgery Innovation, 2019",
      "Athlete Care Recognition, 2017"
    ],
    research: "Dr. Lee has conducted research on ACL reconstruction techniques, rotator cuff repairs, and rehabilitation protocols. Her work has contributed to improved outcomes and faster recovery times for athletes and active individuals.",
    availability: "Tuesday, Thursday, Saturday"
  }
];

// Define available specialties for filtering
const specialties = [...new Set(doctorsData.map(doctor => doctor.specialty))];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  
  // Filter doctors based on search term and selected specialty
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "" || doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-hospital-800 mb-4">
              Our Medical Team
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our exceptional doctors and specialists dedicated to providing the highest quality healthcare services.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search doctors by name or specialty" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Specialty
                </Button>
                {selectedSpecialty && (
                  <Button 
                    variant="ghost" 
                    className="w-full md:w-auto px-2"
                    onClick={() => setSelectedSpecialty("")}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Clear Filter
                  </Button>
                )}
              </div>
            </div>
            
            {showFilters && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                {specialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "outline"}
                    className={`${selectedSpecialty === specialty ? "bg-hospital-600" : "bg-white text-gray-700"}`}
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            )}
            
            {filteredDoctors.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No doctors found matching your search criteria.</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-hospital-600"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Card 
                key={doctor.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-transparent hover:border-hospital-200"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-hospital-100 text-hospital-700 hover:bg-hospital-200">{doctor.specialty}</Badge>
                  <CardTitle className="text-xl text-hospital-700">{doctor.name}</CardTitle>
                  {/* <CardDescription className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warm-500 text-warm-500" />
                    ))}
                    <span className="ml-1 text-gray-600">(48 reviews)</span>
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 text-sm">{doctor.qualifications}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 text-sm">{doctor.experience} experience</span>
                  </div>
                  <p className="text-gray-600 line-clamp-3">
                    {doctor.about}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    className="flex-1 bg-hospital-600 hover:bg-hospital-700"
                    asChild
                  >
                    <Link to="/appointments">
                      Book Appointment
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-hospital-200 text-hospital-700 hover:bg-orange-400"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-hospital-50 to-mint-50 rounded-xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-hospital-800 mb-4">
                  Join Our Medical Team
                </h2>
                <p className="text-gray-600 mb-6">
                  We're always looking for talented healthcare professionals who are passionate about providing exceptional patient care. Explore career opportunities at MediCare Plus.
                </p>
                <Button 
                  className="bg-hospital-600 hover:bg-hospital-700"
                  asChild
                >
                  <Link to="/careers">
                    View Career Opportunities
                  </Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="blob-shape w-64 h-64 top-[-20px] left-[-20px]"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3" 
                    alt="Medical team" 
                    className="rounded-lg shadow-lg relative z-10 max-w-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold text-hospital-700">
                {selectedDoctor.name}
              </DialogTitle>
              <DialogDescription className="text-hospital-500 font-medium">
                {selectedDoctor.specialty} Specialist
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedDoctor.image} 
                    alt={selectedDoctor.name} 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="bg-hospital-50 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-hospital-700 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-hospital-500" />
                      <span className="text-gray-700 text-sm">+254 700 520 008</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-hospital-500" />
                      <span className="text-gray-700 text-sm">doctor@medicareplus.com</span>
                    </div>
                  </div>
                </div>

                <div className="bg-hospital-50 rounded-lg p-4">
                  <h3 className="font-medium text-hospital-700 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.languages.map((language: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="w-full bg-hospital-600 hover:bg-hospital-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-hospital-700 mb-2">About</h3>
                  <p className="text-gray-600">{selectedDoctor.about}</p>
                </div>

                <Separator className="my-4" />

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-hospital-700 mb-2">Education & Training</h3>
                  <ul className="space-y-2">
                    {selectedDoctor.education.map((edu: string, index: number) => (
                      <li key={index} className="text-gray-600">{edu}</li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4" />

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-hospital-700 mb-2">Awards & Recognition</h3>
                  <ul className="space-y-2">
                    {selectedDoctor.awards.map((award: string, index: number) => (
                      <li key={index} className="text-gray-600">{award}</li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4" />

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-hospital-700 mb-2">Research & Publications</h3>
                  <p className="text-gray-600">{selectedDoctor.research}</p>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="text-lg font-medium text-hospital-700 mb-2">Availability</h3>
                  <p className="text-gray-600">{selectedDoctor.availability}</p>
                  <div className="mt-4 flex gap-2">
                    <Badge variant="outline" className="bg-hospital-50 border-hospital-100 text-hospital-700">
                      10:00 AM - 1:00 PM
                    </Badge>
                    <Badge variant="outline" className="bg-hospital-50 border-hospital-100 text-hospital-700">
                      2:00 PM - 5:00 PM
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default Doctors;
