import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Grid, Layers, Check, X } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import JobApplicationForm from '@/components/JobApplicationForm';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import PaymentMethodSelector, { PaymentMethod } from '@/components/PaymentMethodSelector';
import CardPayment from '@/components/CardPayment';
import MpesaPayment from '@/components/MpesaPayment';
import BankTransferPayment from '@/components/BankTransferPayment';
import { toast } from 'sonner';

const jobs = [
  {
    id: "job-001",
    title: "Emergency Room Physician",
    department: "Emergency Medicine",
    location: "Main Hospital",
    type: "Full-time",
    category: "Medical Staff",
    experience: "5+ years",
    postedDate: "2023-09-15",
    status: "Open" as const,
    description: "Join our emergency medicine team to provide urgent care to patients with acute illnesses or injuries that require immediate medical attention.",
    responsibilities: [
      "Assess and treat patients with acute illnesses or injuries",
      "Order and interpret diagnostic tests",
      "Develop treatment plans for patients",
      "Collaborate with specialists and other healthcare professionals",
      "Maintain accurate medical records"
    ],
    requirements: [
      "Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO)",
      "Board certification in Emergency Medicine",
      "Current state medical license",
      "5+ years of experience in emergency medicine",
      "BLS, ACLS, PALS, and ATLS certifications"
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Comprehensive health, dental, and vision insurance",
      "Malpractice insurance coverage",
      "Generous retirement plan with employer matching",
      "Continuing education allowance"
    ]
  },
  {
    id: "job-002",
    title: "Registered Nurse",
    department: "Nursing",
    location: "Various Locations",
    type: "Full-time",
    category: "Nursing",
    experience: "2+ years",
    postedDate: "2023-09-20",
    status: "Open" as const,
    closingDate: "2023-10-30",
    description: "We are seeking a compassionate and skilled Registered Nurse to join our nursing team. The Registered Nurse will provide direct patient care, administer medications, and collaborate with physicians and other healthcare professionals.",
    responsibilities: [
      "Provide direct patient care",
      "Administer medications",
      "Monitor patient vital signs",
      "Educate patients and families",
      "Collaborate with physicians and other healthcare professionals"
    ],
    requirements: [
      "Associate's or Bachelor's degree in Nursing",
      "Current state nursing license",
      "2+ years of experience in nursing",
      "BLS and ACLS certifications",
      "Excellent communication and interpersonal skills"
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Tuition reimbursement program",
      "Opportunities for professional development",
      "Supportive work environment",
      "Employee wellness program"
    ]
  },
  {
    id: "job-003",
    title: "Medical Assistant",
    department: "Clinical Support",
    location: "Outpatient Clinic",
    type: "Part-time",
    category: "Allied Health",
    experience: "1+ year",
    postedDate: "2023-09-25",
    status: "Closed" as const,
    closingDate: "2023-10-15",
    description: "We are seeking a detail-oriented and organized Medical Assistant to join our clinical support team. The Medical Assistant will assist physicians and nurses with patient care, perform administrative tasks, and maintain a clean and organized work environment.",
    responsibilities: [
      "Assist physicians and nurses with patient care",
      "Perform administrative tasks",
      "Maintain a clean and organized work environment",
      "Prepare patients for examinations and procedures",
      "Collect and record patient medical histories"
    ],
    requirements: [
      "High school diploma or equivalent",
      "Completion of a medical assistant program",
      "1+ year of experience in a medical office setting",
      "CPR certification",
      "Excellent communication and interpersonal skills"
    ],
    benefits: [
      "Competitive hourly rate",
      "Paid time off",
      "Opportunities for advancement",
      "Friendly and supportive work environment",
      "Employee discount program"
    ]
  },
  {
    id: "job-004",
    title: "Radiologic Technologist",
    department: "Radiology",
    location: "Main Hospital",
    type: "Full-time",
    category: "Allied Health",
    experience: "3+ years",
    postedDate: "2023-10-01",
    status: "Open" as const,
    description: "We are seeking a skilled and experienced Radiologic Technologist to join our radiology team. The Radiologic Technologist will perform diagnostic imaging procedures, ensure patient safety, and maintain equipment.",
    responsibilities: [
      "Perform diagnostic imaging procedures",
      "Ensure patient safety",
      "Maintain equipment",
      "Prepare patients for procedures",
      "Process and evaluate images"
    ],
    requirements: [
      "Associate's or Bachelor's degree in Radiologic Technology",
      "Current state radiologic technologist license",
      "3+ years of experience in radiologic technology",
      "ARRT certification",
      "Excellent technical and communication skills"
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Continuing education opportunities",
      "State-of-the-art equipment",
      "Collaborative work environment",
      "Employee recognition program"
    ]
  },
  {
    id: "job-005",
    title: "Pharmacist",
    department: "Pharmacy",
    location: "Outpatient Pharmacy",
    type: "Full-time",
    category: "Pharmacy",
    experience: "2+ years",
    postedDate: "2023-10-05",
    status: "Open" as const,
    description: "We are seeking a licensed Pharmacist to join our pharmacy team. The Pharmacist will dispense medications, provide drug information, and ensure patient safety.",
    responsibilities: [
      "Dispense medications",
      "Provide drug information",
      "Ensure patient safety",
      "Review prescriptions for accuracy and appropriateness",
      "Counsel patients on medication use"
    ],
    requirements: [
      "Bachelor's or Doctor of Pharmacy degree",
      "Current state pharmacist license",
      "2+ years of experience in pharmacy",
      "Excellent clinical and communication skills",
      "Knowledge of pharmacy laws and regulations"
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Continuing education opportunities",
      "Professional liability insurance",
      "Employee stock purchase plan",
      "Wellness programs"
    ]
  },
  {
    id: "job-006",
    title: "Physical Therapist",
    department: "Rehabilitation",
    location: "Rehabilitation Center",
    type: "Full-time",
    category: "Rehabilitation",
    experience: "1+ year",
    postedDate: "2023-10-10",
    status: "Open" as const,
    description: "We are seeking a compassionate and skilled Physical Therapist to join our rehabilitation team. The Physical Therapist will evaluate patients, develop treatment plans, and provide therapy to improve patients' mobility and function.",
    responsibilities: [
      "Evaluate patients' physical condition",
      "Develop individualized treatment plans",
      "Provide therapeutic exercises and modalities",
      "Educate patients on proper body mechanics",
      "Document patient progress"
    ],
    requirements: [
      "Bachelor's or Master's degree in Physical Therapy",
      "Current state physical therapist license",
      "1+ year of experience in physical therapy",
      "Excellent communication and interpersonal skills",
      "Knowledge of therapeutic techniques and modalities"
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Continuing education opportunities",
      "Mentorship program",
      "Employee assistance program",
      "Paid professional dues"
    ]
  },
  {
    id: "job-007",
    title: "Accountant",
    department: "Finance",
    location: "Corporate Office",
    type: "Full-time",
    category: "Finance",
    experience: "3+ years",
    postedDate: "2023-10-15",
    status: "Open" as const,
    description: "We are seeking a detail-oriented and experienced Accountant to join our finance team. The Accountant will be responsible for preparing financial statements, managing accounts payable and receivable, and ensuring compliance with accounting regulations.",
    responsibilities: [
      "Prepare financial statements",
      "Manage accounts payable and receivable",
      "Ensure compliance with accounting regulations",
      "Reconcile bank statements",
      "Assist with audits"
    ],
    requirements: [
      "Bachelor's degree in Accounting",
      "3+ years of experience in accounting",
      "Knowledge of GAAP",
      "Proficiency in accounting software",
      "Excellent analytical and problem-solving skills"
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Professional development opportunities",
      "CPA exam support",
      "Generous paid time off",
      "401(k) plan with employer matching"
    ]
  }
];

const FilterButtons = ({ filter, setFilter }: { filter: string, setFilter: (filter: string) => void }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant="outline" 
        className={`${filter === 'all' ? 'bg-hospital-100 text-hospital-700 border-hospital-300' : ''}`}
        onClick={() => setFilter('all')}
      >
        <Layers className="mr-2 h-4 w-4" />
        All Positions
      </Button>
      <Button 
        variant="outline" 
        className={`${filter === 'open' ? 'bg-hospital-100 text-hospital-700 border-hospital-300' : ''}`}
        onClick={() => setFilter('open')}
      >
        <Check className="mr-2 h-4 w-4" />
        Open Positions
      </Button>
    </div>
  );
};

const Careers = () => {
  const [filter, setFilter] = useState({
    searchTerm: '',
    department: 'All',
    location: 'All',
    type: 'All',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentJobDetails, setCurrentJobDetails] = useState<typeof jobs[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [applicationFee] = useState(25); // $25 application fee

  const handleApply = (jobId: string) => {
    setSelectedJob(jobId);
    const jobDetails = jobs.find(job => job.id === jobId);
    if (jobDetails) {
      setCurrentJobDetails(jobDetails);
      setIsApplicationModalOpen(true);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, searchTerm: e.target.value });
  };

  const handleDepartmentChange = (value: string) => {
    setFilter({ ...filter, department: value });
  };

  const handleLocationChange = (value: string) => {
    setFilter({ ...filter, location: value });
  };

  const handleTypeChange = (value: string) => {
    setFilter({ ...filter, type: value });
  };

  const handleApplicationSubmit = (data: any) => {
    setIsApplicationModalOpen(false);
    setIsPaymentModalOpen(true);
    toast.success("Application submitted successfully! Please proceed to payment.");
  };

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    toast.success("Payment successful! Your application has been received.", {
      description: "We'll contact you soon about the next steps.",
    });
  };

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case 'card':
        return <CardPayment amount={applicationFee} onPaymentComplete={handlePaymentComplete} />;
      case 'mobile_money':
        return <MpesaPayment amount={applicationFee} onPaymentComplete={handlePaymentComplete} />;
      case 'bank_transfer':
        return <BankTransferPayment amount={applicationFee} onPaymentComplete={handlePaymentComplete} />;
      case 'cash':
        return (
          <div className="p-6 text-center space-y-4">
            <div className="text-hospital-600 text-lg font-medium">
              Pay at Hospital
            </div>
            <p className="text-gray-600">
              You've selected to pay at the hospital. Your application has been received, but it will be processed after payment.
            </p>
            <Button onClick={handlePaymentComplete} className="bg-hospital-600 hover:bg-hospital-700">
              Complete Application
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const searchTermRegex = new RegExp(filter.searchTerm, 'i');
    const departmentMatch = filter.department === 'All' || job.department === filter.department;
    const locationMatch = filter.location === 'All' || job.location === filter.location;
    const typeMatch = filter.type === 'All' || job.type === filter.type;

    return (
      searchTermRegex.test(job.title) &&
      departmentMatch &&
      locationMatch &&
      typeMatch
    );
  });

  const uniqueDepartments = ['All', ...new Set(jobs.map(job => job.department))];
  const uniqueLocations = ['All', ...new Set(jobs.map(job => job.location))];
  const uniqueTypes = ['All', ...new Set(jobs.map(job => job.type))];

  return (
    <>
      <Helmet>
        <title>Careers | MediCare Plus</title>
        <meta name="description" content="Explore career opportunities at MediCare Plus. Join our team and make a difference in healthcare." />
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Join Our Team
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl mb-8 text-hospital-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Be a part of a dedicated team committed to providing exceptional healthcare services.
              </motion.p>
            </div>
          </div>
          <div className="wavy-line"></div>
        </section>

        {/* Job Listings Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="md:flex md:items-center md:justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <h2 className="text-3xl font-display font-bold text-hospital-800 mb-2">
                  Current Openings
                </h2>
                <p className="text-lg text-gray-600">
                  Explore our current job openings and find the perfect fit for your skills and experience.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className={`h-9 px-2 rounded-md ${viewMode === 'grid' ? 'bg-hospital-100 text-hospital-700 border-hospital-300' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant="outline"
                  className={`h-9 px-2 rounded-md ${viewMode === 'list' ? 'bg-hospital-100 text-hospital-700 border-hospital-300' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Input
                type="text"
                placeholder="Search by job title..."
                value={filter.searchTerm}
                onChange={handleSearch}
              />
              <Select onValueChange={handleDepartmentChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueDepartments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={handleLocationChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueLocations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job Listings */}
            <AnimatePresence mode="wait">
              {filteredJobs.length === 0 ? (
                <motion.div
                  key="empty"
                  className="text-center text-gray-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  No jobs found matching your criteria.
                </motion.div>
              ) : (
                <motion.div
                  key={viewMode}
                  className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delayChildren: 0.1, staggerChildren: 0.1 }}
                >
                  {filteredJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApply={() => handleApply(job.id)}
                      isSelected={selectedJob === job.id}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-hospital-800 mb-4">
              Why Join Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              At MediCare Plus, we value our employees and offer a comprehensive benefits package to support their well-being and professional growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <motion.div
                  className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-hospital-700 mb-2">
                    Competitive Compensation
                  </h3>
                  <p className="text-gray-600">
                    We offer competitive salaries and performance-based bonuses to reward our employees for their hard work and dedication.
                  </p>
                </motion.div>
              </div>
              <div>
                <motion.div
                  className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-hospital-700 mb-2">
                    Comprehensive Benefits
                  </h3>
                  <p className="text-gray-600">
                    Our benefits package includes health, dental, and vision insurance, paid time off, retirement plans, and more.
                  </p>
                </motion.div>
              </div>
              <div>
                <motion.div
                  className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold text-hospital-700 mb-2">
                    Professional Development
                  </h3>
                  <p className="text-gray-600">
                    We are committed to providing our employees with opportunities for professional growth and development through training programs, tuition reimbursement, and mentorship.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Job Application Dialog */}
      <Dialog open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-hospital-800">
              Application for {currentJobDetails?.title}
            </DialogTitle>
            <DialogDescription>
              Please complete the application form below. All fields marked with <span className="text-red-500">*</span> are required.
            </DialogDescription>
          </DialogHeader>
          
          <JobApplicationForm 
            jobId={currentJobDetails?.id || ''} 
            onSubmit={handleApplicationSubmit} 
          />
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsApplicationModalOpen(false)}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-hospital-800">
              Application Fee Payment
            </DialogTitle>
            <DialogDescription>
              Please pay the application processing fee of ${applicationFee}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Select Payment Method</h3>
              <PaymentMethodSelector 
                value={paymentMethod} 
                onChange={(value) => setPaymentMethod(value)} 
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              {renderPaymentMethod()}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default Careers;

