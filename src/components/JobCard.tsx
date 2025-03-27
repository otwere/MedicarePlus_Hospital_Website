
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, BadgeCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    category: string;
    experience: string;
    postedDate: string;
    status?: 'Open' | 'Closed';
    closingDate?: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  };
  onApply: () => void;
  isSelected: boolean;
}

const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { 
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const JobCard: React.FC<JobCardProps> = ({ job, onApply, isSelected }) => {
  // Default status to 'Open' if not provided
  const status = job.status || 'Open';
  const isOpen = status === 'Open';
  
  // Format posted date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
    >
      <Card className={`overflow-hidden ${isSelected ? 'border-hospital-500 ring-1 ring-hospital-500' : ''}`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-hospital-700">{job.title}</h3>
                <Badge 
                  variant={isOpen ? "success" : "secondary"} 
                  className="ml-2 flex items-center gap-1"
                  animate={isOpen}
                >
                  {isOpen ? (
                    <>
                      <BadgeCheck className="h-3 w-3" />
                      Open
                    </>
                  ) : (
                    <>
                      <X className="h-3 w-3 bg-red-400" />
                      Closed
                    </>
                  )}
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
                <div className="flex items-center mr-4 mb-2">
                  <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                  {job.department}
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  {job.location}
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  Posted {formatDate(job.postedDate)}
                </div>
                {job.closingDate && !isOpen && (
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    Closed {formatDate(job.closingDate)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-4 flex flex-col md:items-end space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {job.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {job.type}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {job.experience}
                </Badge>
              </div>
              
              <motion.div
                initial="initial"
                whileHover="hover"
                variants={buttonVariants}
              >
                <Button 
                  onClick={onApply} 
                  size="sm" 
                  className="mt-2"
                  disabled={!isOpen}
                >
                  {isOpen ? "Apply Now" : "Position Closed"}
                </Button>
              </motion.div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <p className="text-gray-600 mb-4">{job.description}</p>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="responsibilities">
              <AccordionTrigger className="text-hospital-600 font-medium">Key Responsibilities</AccordionTrigger>
              <AccordionContent>
                <motion.ul 
                  className="list-disc pl-5 text-gray-600 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                >
                  {job.responsibilities.map((responsibility, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {responsibility}
                    </motion.li>
                  ))}
                </motion.ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="requirements">
              <AccordionTrigger className="text-hospital-600 font-medium">Requirements</AccordionTrigger>
              <AccordionContent>
                <motion.ul 
                  className="list-disc pl-5 text-gray-600 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                >
                  {job.requirements.map((requirement, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {requirement}
                    </motion.li>
                  ))}
                </motion.ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="benefits">
              <AccordionTrigger className="text-hospital-600 font-medium">Benefits</AccordionTrigger>
              <AccordionContent>
                <motion.ul 
                  className="list-disc pl-5 text-gray-600 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                >
                  {job.benefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {benefit}
                    </motion.li>
                  ))}
                </motion.ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-6 py-3">
          <div className="w-full flex justify-between items-center">
            <div className="text-sm text-gray-500">Job ID : {job.id}</div>
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={buttonVariants}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-hospital-600"
                onClick={onApply}
                disabled={!isOpen}
              >
                {isOpen ? "Apply Now" : "Position Closed"}
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default JobCard;
