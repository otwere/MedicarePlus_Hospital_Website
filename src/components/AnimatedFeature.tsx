
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

const AnimatedFeature = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0, 
  className = '' 
}: AnimatedFeatureProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay,
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
  
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className={`p-6 rounded-lg ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="mb-4 text-hospital-600"
        variants={iconVariants}
      >
        <Icon size={42} strokeWidth={1.5} />
      </motion.div>
      
      <motion.h3 
        className="text-xl font-semibold mb-2 text-hospital-700"
        variants={itemVariants}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-600"
        variants={itemVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedFeature;
