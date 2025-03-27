
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface Achievement {
  value: number;
  title: string;
  description: string;
  suffix?: string;
  prefix?: string;
}

interface AnimatedAchievementsProps {
  achievements: Achievement[];
  className?: string;
  title?: string;
  description?: string;
}

const AnimatedAchievements = ({ 
  achievements, 
  className = '',
  title = 'Our Achievements',
  description = 'We take pride in our accomplishments and the impact we make.'
}: AnimatedAchievementsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="p-6 text-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-4 relative">
                <div className="text-4xl md:text-5xl font-bold text-hospital-600 mb-2">
                  <AnimatedCounter 
                    end={achievement.value} 
                    prefix={achievement.prefix || ''} 
                    suffix={achievement.suffix || ''} 
                    className="text-4xl md:text-5xl"
                    delay={0.3 + index * 0.1}
                  />
                </div>
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-hospital-500"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "40%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-hospital-700 mb-2">{achievement.title}</h3>
              <p className="text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedAchievements;
