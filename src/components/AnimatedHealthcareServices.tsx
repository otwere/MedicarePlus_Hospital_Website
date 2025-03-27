
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
  badge?: string;
}

interface AnimatedHealthcareServicesProps {
  services: Service[];
  className?: string;
  title?: string;
  description?: string;
}

const AnimatedHealthcareServices = ({
  services,
  className = '',
  title = 'Comprehensive Healthcare Services',
  description = 'We offer a wide range of medical services to meet all your healthcare needs.'
}: AnimatedHealthcareServicesProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`py-16 ${className}`} ref={ref}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-hospital-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </motion.div>

      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {service.badge && (
                <Badge 
                  className="absolute top-4 right-4 z-10" 
                  variant="success"
                  animate
                >
                  {service.badge}
                </Badge>
              )}
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-hospital-500"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              />
              <div className="p-6">
                <motion.div
                  className="flex items-center mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 rounded-full bg-hospital-100 text-hospital-600 mr-4">
                    {React.createElement(service.icon, { size: 32, strokeWidth: 1.5 })}
                  </div>
                  <h3 className="text-xl font-semibold text-hospital-700">{service.title}</h3>
                </motion.div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                {service.features && (
                  <motion.ul
                    className="mt-4 space-y-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.5 + featureIndex * 0.1, duration: 0.3 }}
                      >
                        <motion.div
                          className="min-w-5 h-5 mr-2 mt-1 bg-hospital-100 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.2, backgroundColor: "#D6EFFF" }}
                        >
                          <svg className="h-3 w-3 text-hospital-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedHealthcareServices;
