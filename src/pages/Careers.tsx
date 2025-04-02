"use client";
import type React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import {
  List,
  Grid,
  Layers,
  Check,
  X,
  Printer,
  FileText,
  CheckCircle,
  User,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import JobApplicationForm from "@/components/JobApplicationForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock data for jobs
const jobs = [
  {
    id: "job-001",
    title: "Emergency Room Physician",
    department: "Emergency Medicine",
    location: "Main Hospital",
    type: "Full-time",
    category: "Medicine Staff",
    experience: "5+ years",
    postedDate: "2023-09-15",
    status: "Open" as const,
    description:
      "Join our emergency Medicine team to provide urgent care to patients with acute illnesses or injuries that require immediate Medicine attention.",
    responsibilities: [
      "Assess and treat patients with acute illnesses or injuries",
      "Order and interpret diagnostic tests",
      "Develop treatment plans for patients",
      "Collaborate with specialists and other healthcare professionals",
      "Maintain accurate Medicine records",
    ],
    requirements: [
      "Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO)",
      "Board certification in Emergency Medicine",
      "Current state Medicine license",
      "5+ years of experience in emergency Medicine",
      "BLS, ACLS, PALS, and ATLS certifications",
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Comprehensive health, dental, and vision insurance",
      "Malpractice insurance coverage",
      "Generous retirement plan with employer matching",
      "Continuing education allowance",
    ],
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
    description:
      "We are seeking a compassionate and skilled Registered Nurse to join our nursing team. The Registered Nurse will provide direct patient care, administer Medication, and collaborate with physicians and other healthcare professionals.",
    responsibilities: [
      "Provide direct patient care",
      "Administer Medication",
      "Monitor patient vital signs",
      "Educate patients and families",
      "Collaborate with physicians and other healthcare professionals",
    ],
    requirements: [
      "Associate's or Bachelor's degree in Nursing",
      "Current state nursing license",
      "2+ years of experience in nursing",
      "BLS and ACLS certifications",
      "Excellent communication and interpersonal skills",
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Tuition reimbursement program",
      "Opportunities for professional development",
      "Supportive work environment",
      "Employee wellness program",
    ],
  },
  {
    id: "job-003",
    title: "Medicine Assistant",
    department: "Clinical Support",
    location: "Outpatient Clinic",
    type: "Part-time",
    category: "Allied Health",
    experience: "1+ year",
    postedDate: "2023-09-25",
    status: "Closed" as const,
    closingDate: "2023-10-15",
    description:
      "We are seeking a detail-oriented and organized Medicine Assistant to join our clinical support team. The Medicine Assistant will assist physicians and nurses with patient care, perform administrative tasks, and maintain a clean and organized work environment.",
    responsibilities: [
      "Assist physicians and nurses with patient care",
      "Perform administrative tasks",
      "Maintain a clean and organized work environment",
      "Prepare patients for examinations and procedures",
      "Collect and record patient Medicine histories",
    ],
    requirements: [
      "High school diploma or equivalent",
      "Completion of a Medicine assistant program",
      "1+ year of experience in a Medicine office setting",
      "CPR certification",
      "Excellent communication and interpersonal skills",
    ],
    benefits: [
      "Competitive hourly rate",
      "Paid time off",
      "Opportunities for advancement",
      "Friendly and supportive work environment",
      "Employee discount program",
    ],
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
    description:
      "We are seeking a skilled and experienced Radiologic Technologist to join our radiology team. The Radiologic Technologist will perform diagnostic imaging procedures, ensure patient safety, and maintain equipment.",
    responsibilities: [
      "Perform diagnostic imaging procedures",
      "Ensure patient safety",
      "Maintain equipment",
      "Prepare patients for procedures",
      "Process and evaluate images",
    ],
    requirements: [
      "Associate's or Bachelor's degree in Radiologic Technology",
      "Current state radiologic technologist license",
      "3+ years of experience in radiologic technology",
      "ARRT certification",
      "Excellent technical and communication skills",
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Continuing education opportunities",
      "State-of-the-art equipment",
      "Collaborative work environment",
      "Employee recognition program",
    ],
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
    description:
      "We are seeking a licensed Pharmacist to join our pharmacy team. The Pharmacist will dispense Medication, provide drug information, and ensure patient safety.",
    responsibilities: [
      "Dispense Medication",
      "Provide drug information",
      "Ensure patient safety",
      "Review prescriptions for accuracy and appropriateness",
      "Counsel patients on Medication use",
    ],
    requirements: [
      "Bachelor's or Doctor of Pharmacy degree",
      "Current state pharmacist license",
      "2+ years of experience in pharmacy",
      "Excellent clinical and communication skills",
      "Knowledge of pharmacy laws and regulations",
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Continuing education opportunities",
      "Professional liability insurance",
      "Employee stock purchase plan",
      "Wellness programs",
    ],
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
    description:
      "We are seeking a compassionate and skilled Physical Therapist to join our rehabilitation team. The Physical Therapist will evaluate patients, develop treatment plans, and provide therapy to improve patients' mobility and function.",
    responsibilities: [
      "Evaluate patients' physical condition",
      "Develop individualized treatment plans",
      "Provide therapeutic exercises and modalities",
      "Educate patients on proper body mechanics",
      "Document patient progress",
    ],
    requirements: [
      "Bachelor's or Master's degree in Physical Therapy",
      "Current state physical therapist license",
      "1+ year of experience in physical therapy",
      "Excellent communication and interpersonal skills",
      "Knowledge of therapeutic techniques and modalities",
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Continuing education opportunities",
      "Mentorship program",
      "Employee assistance program",
      "Paid professional dues",
    ],
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
    description:
      "We are seeking a detail-oriented and experienced Accountant to join our finance team. The Accountant will be responsible for preparing financial statements, managing accounts payable and receivable, and ensuring compliance with accounting regulations.",
    responsibilities: [
      "Prepare financial statements",
      "Manage accounts payable and receivable",
      "Ensure compliance with accounting regulations",
      "Reconcile bank statements",
      "Assist with audits",
    ],
    requirements: [
      "Bachelor's degree in Accounting",
      "3+ years of experience in accounting",
      "Knowledge of GAAP",
      "Proficiency in accounting software",
      "Excellent analytical and problem-solving skills",
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Professional development opportunities",
      "CPA exam support",
      "Generous paid time off",
      "401(k) plan with employer matching",
    ],
  },
];
// Mock storage for submitted applications
const submittedApplications: Record<
  string,
  { status: "Shortlisted" | "Not Shortlisted" | "Under Review"; jobTitle: string; applicantName: string }
> = {};

const FilterButtons = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant="outline"
        className={`${filter === "all" ? "bg-hospital-100 text-hospital-700 border-hospital-300" : ""}`}
        onClick={() => setFilter("all")}
      >
        <Layers className="mr-2 h-4 w-4" />
        All Positions
      </Button>
      <Button
        variant="outline"
        className={`${filter === "open" ? "bg-hospital-100 text-hospital-700 border-hospital-300" : ""}`}
        onClick={() => setFilter("open")}
      >
        <Check className="mr-2 h-4 w-4" />
        Open Positions
      </Button>
    </div>
  );
};

const Careers = () => {
  const [filter, setFilter] = useState({
    searchTerm: "",
    department: "All",
    location: "All",
    type: "All",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isStatusCheckModalOpen, setIsStatusCheckModalOpen] = useState(false);
  const [currentJobDetails, setCurrentJobDetails] = useState<(typeof jobs)[0] | null>(null);
  const [applicationData, setApplicationData] = useState<any>(null);
  const [refNumber, setRefNumber] = useState(""); // Reference number state
  const [applicationStatus, setApplicationStatus] = useState<
    { status: "Shortlisted" | "Not Shortlisted" | "Under Review"; jobTitle: string; applicantName: string } | null
  >(null);

  const handleApply = (jobId: string) => {
    setSelectedJob(jobId);
    const jobDetails = jobs.find((job) => job.id === jobId);
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
    console.log("Form submission data:", data);
    const fullName =
      data.firstName && data.lastName
        ? `${data.firstName} ${data.lastName}`.trim()
        : data.firstName || data.lastName || "Applicant";
    const processedData = {
      ...data,
      fullName,
    };
    console.log("Processed application data:", processedData);

    // Generate a unique reference number
    const newRefNumber = `MCP-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefNumber(newRefNumber); // Store reference number in state
    setApplicationData(processedData);

    // Store the application in mock storage
    const statuses: Array<"Shortlisted" | "Not Shortlisted" | "Under Review"> = ["Shortlisted", "Not Shortlisted", "Under Review"];
    const randomStatus: "Shortlisted" | "Not Shortlisted" | "Under Review" = statuses[Math.floor(Math.random() * statuses.length)];
    submittedApplications[newRefNumber] = {
      status: randomStatus, // Randomly assign status for demo purposes
      jobTitle: currentJobDetails?.title || "Unknown Job",
      applicantName: fullName, // Store applicant's name
    };

    setIsApplicationModalOpen(false);
    setIsConfirmationModalOpen(true);

    // Toast notification with the reference number
    toast.success(
      `Application submitted successfully, ${fullName}! Your reference number is ${newRefNumber}.`
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredJobs = jobs.filter((job) => {
    const searchTermRegex = new RegExp(filter.searchTerm, "i");
    const departmentMatch = filter.department === "All" || job.department === filter.department;
    const locationMatch = filter.location === "All" || job.location === filter.location;
    const typeMatch = filter.type === "All" || job.type === filter.type;
    return searchTermRegex.test(job.title) && departmentMatch && locationMatch && typeMatch;
  });

  const uniqueDepartments = ["All", ...new Set(jobs.map((job) => job.department))];
  const uniqueLocations = ["All", ...new Set(jobs.map((job) => job.location))];
  const uniqueTypes = ["All", ...new Set(jobs.map((job) => job.type))];

  const handleCheckStatus = () => {
    const status = submittedApplications[refNumber];
    if (status) {
      setApplicationStatus(status);
    } else {
      toast.error("Invalid reference number. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers | MediCare Plus</title>
        <meta
          name="description"
          content="Explore career opportunities at MediCare Plus. Join our team and make a difference in healthcare."
        />
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
              <Button
                onClick={() => setIsStatusCheckModalOpen(true)}
                className="mt-6 bg-hospital-600 hover:bg-hospital-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
              >
                Check Application Status
              </Button>
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
                  Explore our current job openings and find the perfect fit for your skills and
                  experience.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className={`h-9 px-2 rounded-md ${
                    viewMode === "grid" ? "bg-hospital-100 text-hospital-700 border-hospital-300" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant="outline"
                  className={`h-9 px-2 rounded-md ${
                    viewMode === "list" ? "bg-hospital-100 text-hospital-700 border-hospital-300" : ""
                  }`}
                  onClick={() => setViewMode("list")}
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
                  {uniqueDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={handleLocationChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
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
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delayChildren: 0.1, staggerChildren: 0.1 }}
                >
                  {filteredJobs.map((job) => (
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
              At MediCare Plus, we value our employees and offer a comprehensive benefits package to
              support their well-being and professional growth.
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
                    We offer competitive salaries and performance-based bonuses to reward our
                    employees for their hard work and dedication.
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
                    Our benefits package includes health, dental, and vision insurance, paid time
                    off, retirement plans, and more.
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
                    We are committed to providing our employees with opportunities for professional
                    growth and development through training programs, tuition reimbursement, and
                    mentorship.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Job Application Dialog */}
      <Dialog open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-hospital-800">
              Application for {currentJobDetails?.title}
            </DialogTitle>
            <DialogDescription>
              Please complete the application form below. All fields marked with{" "}
              <span className="text-red-500">*</span> are required.
            </DialogDescription>
          </DialogHeader>
          <JobApplicationForm
            jobId={currentJobDetails?.id || ""}
            onSubmit={handleApplicationSubmit}
          />
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsApplicationModalOpen(false)}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modern Application Confirmation Dialog */}
      <Dialog open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto print:max-w-full">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-hospital-900">
                  Application Confirmation
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Thank you,{" "}
                  <span className="font-semibold text-blue-600">{applicationData?.fullName}</span>, for applying for
                  the position of {currentJobDetails?.title}.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6 py-4 print:py-2">
            {/* Header with Reference Number */}
            <div className="bg-hospital-50 p-4 rounded-lg flex justify-between items-center print:bg-transparent print:border-b print:border-gray-200 print:rounded-none">
              <div>
                <p className="text-sm text-gray-500">Reference Number</p>
                <p className="font-mono font-bold text-hospital-700">{refNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Submitted on</p>
                <p className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  })}
                </p>
              </div>
            </div>
            {/* Job Details Card */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-hospital-100 px-4 py-3 border-b">
                <h3 className="font-semibold text-hospital-800">Position Applied For</h3>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-medium">{currentJobDetails?.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{currentJobDetails?.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{currentJobDetails?.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employment Type</p>
                  <p className="font-medium">{currentJobDetails?.type}</p>
                </div>
              </div>
            </div>
            {/* Applicant Information Card */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-hospital-100 px-4 py-3 border-b">
                <h3 className="font-semibold text-hospital-800">Applicant Information</h3>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{applicationData?.fullName || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{applicationData?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{applicationData?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Location</p>
                  <p className="font-medium">{applicationData?.address}</p>
                </div>
              </div>
            </div>
            {/* Application Details Card */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-hospital-100 px-4 py-3 border-b">
                <h3 className="font-semibold text-hospital-800">Application Details</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Cover Letter</p>
                  <div className="mt-1 p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">
                      {applicationData?.coverLetter || "No cover letter provided"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attachments</p>
                  <div className="mt-2 flex items-center space-x-2">
                    {applicationData?.resume ? (
                      <>
                        <div className="p-2 border rounded bg-gray-50">
                          <FileText className="h-5 w-5 text-hospital-600" />
                        </div>
                        <div>
                          <p className="font-medium">Resume.pdf</p>
                          <p className="text-xs text-gray-500">Uploaded successfully</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500">No attachments provided</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Next Steps */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 print:hidden">
              <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-600" />
                  <span>We've received your application and will review it shortly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-600" />
                  <span>
                    Our HR team will contact only shortlisted candidates for interview dates
                  </span>
                </li>
              
              </ul>
            </div>
            {/* Print Notice - only visible when printing */}
            <div className="hidden print:block border-t pt-4 mt-4">
              <p className="text-xs text-gray-500">
                This document was generated on {new Date().toLocaleDateString()} and is valid without
                signature.
              </p>
            </div>
          </div>
          {/* Footer - Hidden when printing */}
          <DialogFooter className="print:hidden">
            <div className="w-full flex justify-between items-center">
              <Button variant="ghost" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Print Confirmation
              </Button>
              <Button onClick={() => setIsConfirmationModalOpen(false)}>Return to Job Listings</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Application Status Check Modal */}
      <Dialog open={isStatusCheckModalOpen} onOpenChange={setIsStatusCheckModalOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200">
          {/* Header */}
          <DialogHeader className="flex items-center gap-3 border-b border-gray-200 pb-4">
            <FileText className="h-8 w-8 text-hospital-600" />
            <div>
              <DialogTitle className="text-2xl font-bold text-hospital-800 text-center">
                Check Application Status
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Enter your reference number below to view detailed information about your application.
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Body */}
          <div className="py-6 space-y-4">
            {/* Reference Number Input */}
            <div>
              <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700">
                Reference Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="referenceNumber"
                  type="text"
                  placeholder="MCP-XXXXXX"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  className="w-full h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-0 focus:ring-hospital-500 focus:border-hospital-500"
                />
                {refNumber && !applicationStatus && (
                  <p className="absolute inset-x-0 bottom-0 text-xs text-red-500 mt-1 ml-2">
                    Invalid reference number. Please try again.
                  </p>
                )}
              </div>
            </div>

            {/* Check Status Button */}
            <Button
              onClick={handleCheckStatus}
              disabled={!refNumber}
              className="w-full bg-hospital-600 hover:bg-hospital-700 text-white font-semibold h-12 rounded-lg transition-all"
            >
              Check Status
            </Button>

            {/* Status Result */}
            {applicationStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2"
              >
                {/* Applicant Name */}
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <p className="text-[1rem] font-medium text-gray-700">
                    Applicant Name :{" "}
                    <span className="font-medium text-blue-600">{applicationStatus.applicantName}</span>
                  </p>
                </div>

                {/* Application Status */}
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`h-5 w-5 ${
                      applicationStatus.status === "Shortlisted"
                        ? "text-green-500"
                        : applicationStatus.status === "Under Review"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  />
                  <p className="text-[1rem] font-medium text-gray-800">
                   Job Application Status :{" "}
                    <span
                      className={`${
                        applicationStatus.status === "Shortlisted"
                          ? "text-green-600"
                          : applicationStatus.status === "Under Review"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {applicationStatus.status}
                    </span>
                  </p>
                </div>

                {/* Job Details */}
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Job Applied For : <span className="font-medium">{applicationStatus.jobTitle}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Reference Number : <span className="font-mono font-medium">{refNumber}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date Submitted :{" "}
                    <span className="font-medium">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
                {/* Additional Information */}
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Next Steps</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    {applicationStatus.status === "Shortlisted" && (
                      <li>
                        Our HR team will contact you  to schedule date and time for the interview . Ensure your phone
                        and email are accessible.
                      </li>
                    )}
                    {applicationStatus.status === "Under Review" && (
                      <li>
                        Your application is currently under review. We appreciate your patience while we
                        evaluate all candidates.
                      </li>
                    )}
                    {applicationStatus.status === "Not Shortlisted" && (
                      <li>
                        Unfortunately, your application was not shortlisted for this role. We encourage
                        you to apply for other opportunities that match your skills.
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsStatusCheckModalOpen(false)}
              className="w-full md:w-auto text-gray-700 hover:text-white border-gray-300 hover:border-gray-400 px-12"
            >
              Close 
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
};

export default Careers;