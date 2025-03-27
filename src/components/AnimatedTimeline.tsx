
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const AnimatedTimeline = ({ items, className = '' }: AnimatedTimelineProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Vertical Line */}
      <motion.div 
        className="absolute left-4 sm:left-1/2 h-full w-0.5 bg-hospital-200 transform -translate-x-1/2"
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div key={index} className={`flex flex-col sm:flex-row items-start mb-12 relative`}>
            {/* Year */}
            <motion.div 
              className={`sm:w-1/2 sm:pr-8 ${isEven ? 'sm:text-right' : 'sm:order-last sm:pl-8'}`}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <span className="text-hospital-500 font-bold text-lg">{item.year}</span>
              <h3 className="text-xl font-semibold text-gray-800 mt-1">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </motion.div>
            
            {/* Circle Marker */}
            <motion.div 
              className="absolute left-4 sm:left-1/2 w-8 h-8 bg-hospital-500 rounded-full transform -translate-x-1/2 flex items-center justify-center z-10"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
            >
              <div className="w-3 h-3 bg-white rounded-full" />
            </motion.div>
            
            {/* Spacer for mobile layout */}
            <div className={`sm:w-1/2 pb-8 ${isEven ? 'sm:order-last' : 'sm:pr-8'} hidden sm:block`} />
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedTimeline;
