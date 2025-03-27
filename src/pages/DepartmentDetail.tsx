
import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle, 
  Calendar, 
  Award, 
  Phone, 
  User, 
  Stethoscope,
  Briefcase,
  GraduationCap
} from "lucide-react";

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Define department data with detailed information
const departmentsData = {
  cardiology: {
    name: "Cardiology Department",
    description: "Our Cardiology Department specializes in diagnosing and treating heart conditions and cardiovascular diseases. Our team of experienced cardiologists uses advanced technology and evidence-based approaches to provide comprehensive cardiac care.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    services: [
      "Cardiovascular disease prevention and management",
      "Heart failure treatment and rehabilitation",
      "Cardiac imaging (Echocardiography, Cardiac CT, MRI)",
      "Interventional cardiology procedures",
      "Electrophysiology studies and arrhythmia management",
      "Cardiac rehabilitation programs",
      "Hypertension management",
      "Cholesterol and lipid management"
    ],
    facilities: [
      "Advanced Cardiac Catheterization Lab",
      "Echocardiography Suite",
      "Cardiac CT and MRI facilities",
      "Electrophysiology Lab",
      "Cardiac Intensive Care Unit (CICU)",
      "Cardiac Rehabilitation Center"
    ],
    team: [
      {
        name: "Dr. Jonathan Hart",
        position: "Head of Cardiology",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, PhD, FACC",
        experience: "20+ years of experience in interventional cardiology"
      },
      {
        name: "Dr. Emily Chen",
        position: "Senior Cardiologist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FACC, FSCAI",
        experience: "Specializes in heart failure and transplant cardiology"
      },
      {
        name: "Dr. Michael Roberts",
        position: "Electrophysiologist",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3",
        qualifications: "MD, FHRS",
        experience: "Expert in cardiac rhythm disorders and device therapy"
      }
    ],
    technologies: [
      "3D Cardiac Mapping Systems",
      "Intravascular Ultrasound (IVUS)",
      "Coronary CT Angiography",
      "Advanced Cardiac MRI",
      "Remote Cardiac Monitoring Devices"
    ],
    faqs: [
      {
        question: "What are the warning signs of heart disease?",
        answer: "Warning signs include chest pain or discomfort, shortness of breath, pain or discomfort in the arms, jaw, back or neck, feeling lightheaded or dizzy, and unusual fatigue. If you experience these symptoms, especially during physical activity, you should seek medical attention immediately."
      },
      {
        question: "How often should I have my heart checked?",
        answer: "Adults should have their blood pressure, cholesterol, and glucose levels checked regularly. For those over 40 or with risk factors like family history, diabetes, or high blood pressure, more frequent cardiac check-ups are recommended. Your doctor can provide personalized recommendations based on your health profile."
      },
      {
        question: "What lifestyle changes can improve heart health?",
        answer: "Key lifestyle changes include maintaining a heart-healthy diet low in saturated fats and sodium, regular physical activity (at least 150 minutes of moderate exercise weekly), maintaining a healthy weight, quitting smoking, limiting alcohol consumption, and managing stress effectively."
      }
    ]
  },
  neurology: {
    name: "Neurology Department",
    description: "Our Neurology Department provides comprehensive care for disorders of the brain, spinal cord, peripheral nerves, and muscles. Our neurologists are experts in diagnosing and treating complex neurological conditions using advanced diagnostic tools and therapies.",
    image: "https://images.unsplash.com/photo-1559757175-7b21578095cd?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    services: [
      "Stroke treatment and prevention",
      "Epilepsy diagnosis and management",
      "Movement disorders (Parkinson's disease, tremors)",
      "Multiple sclerosis care",
      "Headache and migraine treatment",
      "Neuromuscular disorder management",
      "Memory disorder evaluation",
      "Sleep disorder assessment"
    ],
    facilities: [
      "Neurophysiology Laboratory",
      "EEG Monitoring Unit",
      "Stroke Center",
      "Neurorehabilitation Unit",
      "Sleep Disorders Laboratory",
      "Advanced Neuroimaging Facility"
    ],
    team: [
      {
        name: "Dr. Sarah Williams",
        position: "Head of Neurology",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, PhD, FAAN",
        experience: "Renowned specialist in stroke treatment and research"
      },
      {
        name: "Dr. David Thompson",
        position: "Epileptologist",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FAAN",
        experience: "Leading expert in epilepsy and seizure disorders"
      },
      {
        name: "Dr. Lisa Park",
        position: "Movement Disorder Specialist",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3",
        qualifications: "MD, MS",
        experience: "Specialized in Parkinson's disease and movement disorders"
      }
    ],
    technologies: [
      "High-Resolution MRI and fMRI",
      "Transcranial Magnetic Stimulation (TMS)",
      "Video EEG Monitoring",
      "Intraoperative Neurophysiological Monitoring",
      "Deep Brain Stimulation Technology"
    ],
    faqs: [
      {
        question: "What is the difference between a headache and a migraine?",
        answer: "A headache is a pain in any part of the head, ranging from mild to severe. Migraines are a specific type of headache characterized by intense, often throbbing pain, typically on one side of the head, often accompanied by nausea, vomiting, and sensitivity to light and sound. Migraines can also be preceded by visual disturbances known as auras."
      },
      {
        question: "When should someone see a neurologist?",
        answer: "You should see a neurologist if you experience persistent or severe headaches, dizziness, numbness or tingling, weakness, movement problems, seizures, vision problems, memory issues, or balance problems. Your primary care physician may also refer you to a neurologist if they suspect a neurological condition."
      },
      {
        question: "What happens during a neurological examination?",
        answer: "A neurological exam typically includes assessment of mental status, cranial nerves, muscle strength, reflexes, coordination, sensory function, and gait. Additional diagnostic tests may include imaging studies (MRI, CT), electroencephalogram (EEG), electromyography (EMG), or lumbar puncture depending on your symptoms."
      }
    ]
  },
  orthopedics: {
    name: "Orthopedics Department",
    description: "Our Orthopedics Department specializes in the diagnosis, treatment, prevention, and rehabilitation of disorders, injuries, and diseases of the musculoskeletal system. Our orthopedic surgeons and specialists provide comprehensive care for bone, joint, ligament, tendon, and muscle conditions.",
    image: "https://images.unsplash.com/photo-1583756946662-459f8913b44b?auto=format&fit=crop&q=80&w=3264&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    services: [
      "Joint replacement surgery (hip, knee, shoulder)",
      "Sports medicine and injury treatment",
      "Spine disorders and surgery",
      "Fracture care and trauma surgery",
      "Hand and upper extremity surgery",
      "Foot and ankle treatment",
      "Pediatric orthopedics",
      "Orthopedic rehabilitation"
    ],
    facilities: [
      "Advanced Orthopedic Surgery Suite",
      "Joint Replacement Center",
      "Sports Medicine Clinic",
      "Spine Center",
      "Physical Therapy and Rehabilitation Center",
      "Orthopedic Trauma Unit"
    ],
    team: [
      {
        name: "Dr. Robert Anderson",
        position: "Head of Orthopedics",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FAAOS",
        experience: "Pioneering surgeon in joint replacement techniques"
      },
      {
        name: "Dr. Jennifer Lee",
        position: "Sports Medicine Specialist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FAAOS, FACSM",
        experience: "Team physician for professional sports teams"
      },
      {
        name: "Dr. Mark Taylor",
        position: "Spine Surgeon",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3",
        qualifications: "MD, FAAOS",
        experience: "Specializes in minimally invasive spine procedures"
      }
    ],
    technologies: [
      "Computer-Assisted Joint Replacement Technology",
      "Minimally Invasive Surgical Techniques",
      "Advanced Arthroscopy Equipment",
      "3D Printing for Custom Joint Implants",
      "Robotic-Assisted Surgery"
    ],
    faqs: [
      {
        question: "How long is recovery after joint replacement surgery?",
        answer: "Recovery times vary depending on the joint replaced and individual factors. Most patients can resume light activities within 3-6 weeks after surgery. Full recovery, including return to more demanding activities, typically takes 3-6 months. Physical therapy is an essential part of the recovery process to regain strength and mobility."
      },
      {
        question: "When should I see a doctor for joint pain?",
        answer: "You should see a doctor if your joint pain is severe, accompanied by significant swelling, redness or warmth around the joint, persists beyond a few days, or is associated with an injury. Also seek medical attention if you have difficulty using the joint or if the pain interferes with daily activities."
      },
      {
        question: "What is the difference between a sprain and a fracture?",
        answer: "A sprain involves stretching or tearing of ligaments (tissues connecting bones at joints), while a fracture is an actual break in a bone. Both can cause pain, swelling, and difficulty using the affected area, but fractures often involve more severe pain, visible deformity, and inability to bear weight or use the injured body part."
      }
    ]
  },
  pediatrics: {
    name: "Pediatrics Department",
    description: "Our Pediatrics Department provides comprehensive healthcare services for infants, children, and adolescents. Our pediatricians and pediatric specialists focus on the physical, emotional, and social health of children from birth to young adulthood.",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    services: [
      "Well-child visits and growth monitoring",
      "Pediatric immunizations",
      "Developmental assessments",
      "Acute illness diagnosis and treatment",
      "Chronic disease management",
      "Behavioral and mental health services",
      "Pediatric nutrition counseling",
      "Adolescent medicine"
    ],
    facilities: [
      "Child-Friendly Examination Rooms",
      "Pediatric Emergency Unit",
      "Pediatric Intensive Care Unit (PICU)",
      "Neonatal Intensive Care Unit (NICU)",
      "Pediatric Rehabilitation Center",
      "Child Life Program Facilities"
    ],
    team: [
      {
        name: "Dr. Maria Rodriguez",
        position: "Head of Pediatrics",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FAAP",
        experience: "25+ years dedicated to children's healthcare"
      },
      {
        name: "Dr. James Wilson",
        position: "Pediatric Pulmonologist",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FAAP",
        experience: "Specialist in respiratory conditions affecting children"
      },
      {
        name: "Dr. Sophia Brown",
        position: "Developmental Pediatrician",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3",
        qualifications: "MD, MPH, FAAP",
        experience: "Expert in developmental and behavioral disorders"
      }
    ],
    technologies: [
      "Child-Appropriate Diagnostic Equipment",
      "Pediatric-Specific Electronic Health Records",
      "Advanced Neonatal Monitoring Systems",
      "Child-Friendly Pain Management Technologies",
      "Specialized Pediatric Imaging"
    ],
    faqs: [
      {
        question: "How often should my child have well-child visits?",
        answer: "The American Academy of Pediatrics recommends well-child visits at 3-5 days, 1, 2, 4, 6, 9, 12, 15, 18, and 24 months, and then annually from ages 2-6. After age 6, visits are typically scheduled every 1-2 years. These visits are essential for monitoring growth, development, and administering recommended vaccinations."
      },
      {
        question: "When should I bring my child to the emergency room versus scheduling a regular appointment?",
        answer: "Seek emergency care for severe breathing difficulties, prolonged or high fever, severe dehydration, significant injuries, seizures, severe abdominal pain, or if your child is difficult to wake. For non-urgent concerns like mild fevers, colds, minor injuries, or behavioral issues, a scheduled appointment is more appropriate."
      },
      {
        question: "What vaccinations does my child need?",
        answer: "The recommended childhood vaccination schedule includes protection against diseases such as hepatitis B, rotavirus, diphtheria, tetanus, pertussis, Haemophilus influenzae type b, pneumococcal disease, polio, influenza, measles, mumps, rubella, varicella, hepatitis A, and HPV. Your pediatrician will provide a specific schedule based on your child's age and health status."
      }
    ]
  },
  dermatology: {
    name: "Dermatology Department",
    description: "Our Dermatology Department provides comprehensive care for conditions affecting the skin, hair, and nails. Our board-certified dermatologists offer both medical and cosmetic treatments using the latest technologies and evidence-based approaches.",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2827b?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    services: [
      "Skin cancer screening and treatment",
      "Acne and rosacea management",
      "Eczema and psoriasis treatment",
      "Dermatologic surgery",
      "Pediatric dermatology",
      "Cosmetic dermatology procedures",
      "Hair loss evaluation and treatment",
      "Nail disorder management"
    ],
    facilities: [
      "Advanced Dermatological Surgery Suite",
      "Phototherapy Center",
      "Laser Treatment Facility",
      "Cosmetic Dermatology Center",
      "Dermatopathology Laboratory",
      "Psoriasis and Eczema Care Center"
    ],
    team: [
      {
        name: "Dr. Rebecca Moore",
        position: "Head of Dermatology",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FAAD",
        experience: "Renowned expert in skin cancer detection and treatment"
      },
      {
        name: "Dr. Thomas Wright",
        position: "Cosmetic Dermatologist",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FAAD",
        experience: "Specializes in non-invasive cosmetic procedures"
      },
      {
        name: "Dr. Amanda Garcia",
        position: "Pediatric Dermatologist",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3",
        qualifications: "MD, FAAD, FAAP",
        experience: "Expert in childhood skin conditions and treatments"
      }
    ],
    technologies: [
      "Advanced Skin Imaging and AI-Assisted Diagnostics",
      "State-of-the-Art Laser Therapy Equipment",
      "Mohs Micrographic Surgery Technology",
      "Photodynamic Therapy",
      "Non-Invasive Body Contouring Systems"
    ],
    faqs: [
      {
        question: "How often should I have a skin cancer screening?",
        answer: "Most dermatologists recommend annual full-body skin examinations for adults. However, those with a personal or family history of skin cancer, multiple moles, or significant sun exposure may need more frequent screenings. You should also perform regular self-examinations and seek prompt evaluation for any changing, new, or unusual skin lesions."
      },
      {
        question: "What are the most effective treatments for adult acne?",
        answer: "Effective treatments for adult acne include topical retinoids, benzoyl peroxide, topical and oral antibiotics, salicylic acid, azelaic acid, and in more severe cases, oral isotretinoin. Hormonal therapies like birth control pills or spironolactone may help women with hormonal acne. A dermatologist can develop a personalized treatment plan based on your specific acne type and severity."
      },
      {
        question: "How can I prevent premature skin aging?",
        answer: "Key strategies include daily use of broad-spectrum sunscreen with SPF 30 or higher, wearing protective clothing and seeking shade, not smoking, maintaining good hydration, eating a healthy diet rich in antioxidants, using appropriate skincare products (including retinoids and antioxidants), getting adequate sleep, and managing stress."
      }
    ]
  },
  ophthalmology: {
    name: "Ophthalmology Department",
    description: "Our Ophthalmology Department provides comprehensive eye care services from routine exams to complex surgical procedures. Our ophthalmologists are specialized in diagnosing and treating all eye conditions to preserve and improve vision.",
    image: "https://images.unsplash.com/photo-1614846384571-1e68fbd874a3?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    services: [
      "Comprehensive eye examinations",
      "Cataract diagnosis and surgery",
      "Glaucoma management",
      "Diabetic eye disease treatment",
      "Refractive surgery (LASIK, PRK)",
      "Corneal disorders treatment",
      "Pediatric ophthalmology",
      "Oculoplastic surgery"
    ],
    facilities: [
      "Advanced Diagnostic Imaging Center",
      "Laser Vision Correction Suite",
      "Cataract Surgery Center",
      "Glaucoma Service Unit",
      "Retina Care Facility",
      "Pediatric Eye Care Center"
    ],
    team: [
      {
        name: "Dr. Richard Kim",
        position: "Head of Ophthalmology",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, FACS",
        experience: "Pioneer in advanced cataract surgery techniques"
      },
      {
        name: "Dr. Katherine Johnson",
        position: "Retina Specialist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, PhD",
        experience: "Expert in retinal diseases and treatments"
      },
      {
        name: "Dr. Steven Lewis",
        position: "Refractive Surgeon",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3",
        qualifications: "MD",
        experience: "Performed over 10,000 LASIK procedures"
      }
    ],
    technologies: [
      "High-Definition OCT (Optical Coherence Tomography)",
      "Femtosecond Laser Technology for Cataract Surgery",
      "Advanced Visual Field Testing Equipment",
      "Wavefront-Guided LASIK Technology",
      "Digital Retinal Imaging Systems"
    ],
    faqs: [
      {
        question: "How often should I have an eye examination?",
        answer: "Adults with no risk factors should have a comprehensive eye exam every 1-2 years. Those with risk factors like diabetes, high blood pressure, or a family history of eye disease may need more frequent examinations. After age 60, annual exams are recommended. Children should have their first eye exam at 6 months, followed by exams at age 3 and before starting school."
      },
      {
        question: "What are the early warning signs of glaucoma?",
        answer: "Primary open-angle glaucoma, the most common form, usually has no early warning signs. It develops slowly and can cause peripheral vision loss before affecting central vision. This is why regular eye exams are crucial, as they can detect glaucoma before symptoms appear. Acute angle-closure glaucoma, though rarer, can cause sudden symptoms like severe eye pain, nausea, blurred vision, and halos around lights."
      },
      {
        question: "Is LASIK surgery right for everyone?",
        answer: "No, LASIK is not suitable for everyone. Good candidates typically have stable vision, adequate corneal thickness, healthy eyes (no cataracts, advanced glaucoma, or certain retinal diseases), are over 18 years old, and have realistic expectations. Certain conditions like severe dry eye, uncontrolled diabetes, or autoimmune disorders may disqualify someone. A comprehensive evaluation by a refractive surgeon is necessary to determine candidacy."
      }
    ]
  },
  dentistry: {
    name: "Dentistry Department",
    description: "Our Dentistry Department provides comprehensive dental care for patients of all ages. Our dentists and dental specialists offer preventive, restorative, and cosmetic dental services in a comfortable and modern environment.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=3269&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    services: [
      "Preventive dental care (cleanings, exams)",
      "Restorative dentistry (fillings, crowns, bridges)",
      "Endodontic treatment (root canals)",
      "Periodontal (gum) therapy",
      "Prosthodontics (dentures, implants)",
      "Oral surgery (extractions, implant placement)",
      "Cosmetic dentistry (whitening, veneers)",
      "Pediatric dentistry"
    ],
    facilities: [
      "Modern Dental Treatment Suites",
      "Digital Imaging Center",
      "Dental Surgery Operating Rooms",
      "Endodontic Treatment Center",
      "Prosthodontic Laboratory",
      "Child-Friendly Dental Area"
    ],
    team: [
      {
        name: "Dr. Daniel Martinez",
        position: "Head of Dentistry",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "DDS, FAGD",
        experience: "Comprehensive dentistry with focus on implants"
      },
      {
        name: "Dr. Lauren Taylor",
        position: "Orthodontist",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3",
        qualifications: "DMD, MS",
        experience: "Specialist in traditional and invisible orthodontics"
      },
      {
        name: "Dr. Robert Jackson",
        position: "Oral Surgeon",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=3280&ixlib=rb-4.0.3",
        qualifications: "DDS, MD",
        experience: "Expertise in complex extractions and implant surgery"
      }
    ],
    technologies: [
      "Digital Intraoral Scanners",
      "3D Cone Beam CT Imaging",
      "Computer-Aided Design/Manufacturing (CAD/CAM)",
      "Laser Dentistry Equipment",
      "Digital Smile Design Technology"
    ],
    faqs: [
      {
        question: "How often should I visit the dentist?",
        answer: "Most dental professionals recommend check-ups and cleanings every six months. However, some individuals may need more frequent visits, especially those with gum disease, high risk of cavities, weakened immune systems, or during pregnancy. Your dentist will recommend a personalized schedule based on your oral health needs."
      },
      {
        question: "What is the best way to care for my teeth between dental visits?",
        answer: "Maintain a thorough oral hygiene routine by brushing twice daily with fluoride toothpaste, flossing daily, using antimicrobial or fluoride mouthwash as recommended, eating a balanced diet low in sugary foods and drinks, avoiding tobacco products, and limiting between-meal snacks. Replace your toothbrush every 3-4 months or sooner if bristles are frayed."
      },
      {
        question: "What are dental implants and how long do they last?",
        answer: "Dental implants are titanium posts surgically placed in the jawbone that serve as artificial tooth roots for replacement teeth. With proper care, dental implants can last a lifetime, though the crown attached to the implant may need replacement after 10-15 years due to normal wear. Success depends on factors like oral hygiene, smoking status, overall health, and regular dental check-ups."
      }
    ]
  },
  psychiatry: {
    name: "Psychiatry Department",
    description: "Our Psychiatry Department provides comprehensive mental health services for patients of all ages. Our psychiatrists, psychologists, and mental health professionals use evidence-based approaches to diagnose and treat a wide range of psychiatric and psychological conditions.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    services: [
      "Psychiatric evaluations and diagnosis",
      "Medication management",
      "Individual psychotherapy",
      "Group therapy sessions",
      "Child and adolescent psychiatry",
      "Geriatric psychiatry",
      "Substance use disorder treatment",
      "Crisis intervention services"
    ],
    facilities: [
      "Outpatient Psychiatric Clinic",
      "Inpatient Psychiatric Unit",
      "Psychiatric Emergency Services",
      "Geriatric Psychiatry Center",
      "Child and Adolescent Mental Health Unit",
      "Addiction Treatment Facility"
    ],
    team: [
      {
        name: "Dr. Elizabeth Howard",
        position: "Head of Psychiatry",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD, PhD",
        experience: "Specializes in treatment-resistant mood disorders"
      },
      {
        name: "Dr. Alexander Bennett",
        position: "Child Psychiatrist",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3",
        qualifications: "MD",
        experience: "Expert in childhood developmental disorders"
      },
      {
        name: "Dr. Olivia Chen",
        position: "Addiction Psychiatrist",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=3271&ixlib=rb-4.0.3",
        qualifications: "MD, MPH",
        experience: "Specialized in addiction and dual diagnosis treatment"
      }
    ],
    technologies: [
      "Transcranial Magnetic Stimulation (TMS)",
      "Electroconvulsive Therapy (ECT)",
      "Digital Cognitive Behavioral Therapy Platforms",
      "Telepsychiatry Systems",
      "Advanced Neurofeedback Technology"
    ],
    faqs: [
      {
        question: "What is the difference between a psychiatrist and a psychologist?",
        answer: "Psychiatrists are medical doctors (MD or DO) who can prescribe medications and provide medical treatments. They complete medical school followed by a psychiatry residency. Psychologists typically have a doctoral degree (PhD, PsyD) in psychology and specialize in psychological testing, evaluation, and therapy, but cannot prescribe medications in most states. Both professionals can diagnose and treat mental health conditions using different approaches."
      },
      {
        question: "How do I know if I need psychiatric help?",
        answer: "Consider seeking help if you experience persistent feelings of sadness, anxiety, or emptiness; significant changes in eating or sleeping patterns; decreased energy or motivation; difficulty concentrating or making decisions; thoughts of death or suicide; inability to function in daily life; significant mood swings; or if you're using substances to cope. Remember that seeking help is a sign of strength, not weakness."
      },
      {
        question: "Are psychiatric medications addictive?",
        answer: "Most psychiatric medications used to treat conditions like depression, anxiety, bipolar disorder, and schizophrenia are not addictive. However, certain medications, particularly benzodiazepines (for anxiety) and stimulants (for ADHD), have potential for dependence if not properly monitored. All psychiatric medications should be taken exactly as prescribed and any changes in dosage should be supervised by a healthcare provider."
      }
    ]
  }
};

const DepartmentDetail = () => {
  const { departmentId } = useParams();
  const department = departmentsData[departmentId as keyof typeof departmentsData];
  
  // Handle case where department doesn't exist
  if (!department) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-24 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-hospital-700 mb-4">Department Not Found</h1>
            <p className="text-gray-600 mb-6">The department you're looking for doesn't exist or may have been moved.</p>
            <Button asChild>
              <Link to="/departments">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Departments
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Link to="/departments" className="text-hospital-600 hover:text-hospital-700 flex items-center mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Departments
            </Link>
            
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden mb-8">
              <img 
                src={department.image} 
                alt={department.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-hospital-900/70 to-transparent flex items-end">
                <div className="p-8">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    {department.name}
                  </h1>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 max-w-4xl">
              {department.description}
            </p>
          </div>

          <Tabs defaultValue="services" className="mb-16">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="team">Our Team</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-hospital-700 mb-6">Our Services</h2>
                  <ul className="space-y-3">
                    {department.services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-hospital-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-hospital-700 mb-6">Advanced Technologies</h2>
                  <ul className="space-y-3">
                    {department.technologies.map((tech, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-hospital-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-hospital-700 mb-8">Meet Our Specialists</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {department.team.map((member, index) => (
                  <Card key={index} className="overflow-hidden border-transparent hover:border-hospital-200 transition-all duration-300">
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-hospital-700">{member.name}</CardTitle>
                      <CardDescription className="font-medium text-hospital-500">{member.position}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 text-sm">{member.qualifications}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Briefcase className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">{member.experience}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full border-hospital-200 text-hospital-700 hover:bg-blue-300">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="facilities" className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-hospital-700 mb-6">Our Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {department.facilities.map((facility, index) => (
                  <div key={index} className="bg-hospital-50 p-4 rounded-lg flex items-start gap-4">
                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                      <Stethoscope className="h-6 w-6 text-hospital-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-hospital-700 mb-1">{facility}</h3>
                      <p className="text-gray-600 text-sm">State-of-the-art facility equipped with advanced medical technology.</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="faqs" className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-hospital-700 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {department.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                    <h3 className="text-lg font-medium text-hospital-700 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-gradient-to-r from-hospital-50 to-mint-50 rounded-xl p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-display font-bold text-hospital-700 mb-4">
                  Need a Consultation?
                </h2>
                <p className="text-gray-600 mb-6">
                  Our {department.name} specialists are ready to help you with expert medical advice and treatment options for your specific needs.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-hospital-500" />
                    <span className="text-gray-700">Call us at +254 700 520 008</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-hospital-500" />
                    <span className="text-gray-700">Schedule an appointment online</span>
                  </div>
                  <div className="mt-6">
                    <Button asChild className="bg-hospital-600 hover:bg-hospital-700">
                      <Link to="/appointments">
                        Book an Appointment <Calendar className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="blob-shape w-64 h-64 top-[-20px] right-[-20px]"></div>
                <img 
                  src="https://images.unsplash.com/photo-1607990283143-2c5e98371f72?auto=format&fit=crop&q=80&w=3282&ixlib=rb-4.0.3" 
                  alt="Doctor consultation" 
                  className="rounded-lg relative z-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-hospital-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-hospital-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-hospital-700 mb-2">Expert Specialists</h3>
              <p className="text-gray-600">Our department is staffed with board-certified specialists who bring years of experience and expertise to your care.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-hospital-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-7 w-7 text-hospital-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-hospital-700 mb-2">Comprehensive Care</h3>
              <p className="text-gray-600">We provide a full spectrum of services from prevention and diagnosis to treatment and rehabilitation.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-hospital-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-7 w-7 text-hospital-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-hospital-700 mb-2">Convenient Scheduling</h3>
              <p className="text-gray-600">We offer flexible appointment times, including evenings and weekends, to accommodate your busy schedule.</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DepartmentDetail;
