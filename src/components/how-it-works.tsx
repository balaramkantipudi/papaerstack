import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

 const HowItWorks: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const steps = [
    {
      icon: "lucide:upload-cloud",
      title: "Upload",
      description: "Drag and drop your construction documents into the platform.",
      color: "primary",
    },
    {
      icon: "lucide:cpu",
      title: "AI processes",
      description: "Our AI extracts, categorizes, and organizes all relevant information.",
      color: "secondary",
    },
    {
      icon: "lucide:check-circle",
      title: "Done",
      description: "Access structured data, insights, and automated workflows.",
      color: "primary",
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };
  
  return (
    <section id="how-it-works" className="py-28 md:py-36 bg-background paper-texture">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-gilroy font-bold text-3xl md:text-4xl mb-5"
          >
            How it works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-foreground-500 text-lg max-w-2xl mx-auto"
          >
            Three simple steps to transform your document processing
          </motion.p>
        </div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline connector */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%-8rem)] bg-foreground-200 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center relative"
              >
                <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-7 bg-${step.color === "primary" ? "primary" : "secondary"}-50 border border-${step.color === "primary" ? "primary" : "secondary"}-100 z-10`}>
                  <Icon 
                    icon={step.icon} 
                    className={`h-7 w-7 text-${step.color === "primary" ? "primary" : "secondary"}-500`} 
                  />
                </div>
                <h3 className="font-dmsans font-semibold text-xl mb-4">{step.title}</h3>
                <p className="text-foreground-500">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 left-full w-8 h-0.5 bg-foreground-200 transform -translate-x-4"></div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            className="mt-20 text-center"
          >
            <Button
              variant="flat"
              color="primary"
              startContent={<Icon icon="lucide:play" className="h-4 w-4" />}
              className="font-medium py-6 px-8"
            >
              See how it works
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default HowItWorks;