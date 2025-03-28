
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DoctorData {
  id: number;
  name: string;
  title: string;
  specialty: string;
  image: string;
  bio: string;
  education: string[];
  certifications: string[];
  experience: {
    position: string;
    location: string;
    years: string;
  }[];
  languages: string[];
  availability: {
    day: string;
    hours: string;
  }[];
  awards: string[];
}

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: DoctorData;
}

const DoctorModal = ({ isOpen, onClose, doctor }: DoctorModalProps) => {
  const [activeTab, setActiveTab] = useState("biography");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      document.body.style.overflow = "auto";
      setAnimateIn(false);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs = [
    { id: "biography", label: "Biography" },
    { id: "education", label: "Education & Experience" },
    { id: "schedule", label: "Schedule" },
    { id: "achievements", label: "Achievements" },
  ];

  return (
    <>
      <div 
        className={cn(
          "modal-overlay transition-all duration-300",
          animateIn ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div 
        className={cn(
          "modal-container animate-slide-up transition-all duration-300",
          animateIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="relative rounded-xl overflow-hidden mb-4 aspect-[3/4]">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-display font-semibold text-hospital-800">
              {doctor.name}
            </h2>
            <p className="text-hospital-600 font-medium mb-2">{doctor.title}</p>
            <p className="text-gray-600 mb-4">{doctor.specialty}</p>
            <Button asChild className="w-full bg-hospital-600 hover:bg-hospital-700">
              <a href="/appointments">Book Appointment</a>
            </Button>
          </div>

          <div className="md:w-2/3">
            <div className="flex border-b mb-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-3 font-medium transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "text-hospital-600 border-b-2 border-hospital-600"
                      : "text-gray-500 hover:text-hospital-600"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="animate-fade-in">
              {activeTab === "biography" && (
                <div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                    About Dr. {doctor.name.split(" ")[1]}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {doctor.bio}
                  </p>
                  <h4 className="text-lg font-display font-semibold text-gray-900 mb-2">
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.languages.map((language) => (
                      <span
                        key={language}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      Education
                    </h3>
                    <ul className="space-y-2">
                      {doctor.education.map((edu, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-hospital-500 mt-2 mr-2"></div>
                          <span className="text-gray-700">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      Experience
                    </h3>
                    <div className="space-y-4">
                      {doctor.experience.map((exp, i) => (
                        <div key={i} className="border-l-2 border-hospital-200 pl-4 pb-2">
                          <h4 className="text-lg font-medium text-gray-900">
                            {exp.position}
                          </h4>
                          <p className="text-gray-600">{exp.location}</p>
                          <p className="text-sm text-gray-500">{exp.years}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      Certifications
                    </h3>
                    <ul className="space-y-2">
                      {doctor.certifications.map((cert, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-hospital-500 mt-2 mr-2"></div>
                          <span className="text-gray-700">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    Weekly Schedule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.availability.map((slot) => (
                      <div
                        key={slot.day}
                        className="p-4 border border-gray-200 rounded-lg hover:border-hospital-200 transition-colors"
                      >
                        <h4 className="text-lg font-medium text-gray-900">
                          {slot.day}
                        </h4>
                        <p className="text-gray-600">{slot.hours}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-hospital-50 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Book an Appointment
                    </h4>
                    <p className="text-gray-700 mb-4">
                      To schedule an appointment with Dr. {doctor.name.split(" ")[1]}, 
                      please use our online booking system or call our reception.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="bg-hospital-600 hover:bg-hospital-700">
                        <a href="/appointments">Online Booking</a>
                      </Button>
                      <Button variant="outline" className="border-hospital-500 text-hospital-700 hover:bg-orange-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                        </svg>
                        Call: +254 700 520 008
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "achievements" && (
                <div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    Awards & Recognitions
                  </h3>
                  <div className="space-y-4">
                    {doctor.awards.map((award, i) => (
                      <div key={i} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-warm-100 text-warm-600 flex items-center justify-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 15l-2 5l9-13l-5 2l-2 6z"></path>
                            <path d="M18 13l-2-2l2-2l2 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-700">{award}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorModal;
