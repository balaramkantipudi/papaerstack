import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react";

 const ProductShowcase: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const highlightPoints = [
    { icon: "lucide:search", text: "Intelligent document search" },
    { icon: "lucide:bar-chart", text: "Real-time analytics" },
    { icon: "lucide:file-text", text: "Automated document processing" },
  ];
  
  return (
    <section className="py-28 md:py-36 bg-background-50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-gilroy font-bold text-3xl md:text-4xl mb-6">
                Designed for the way you work
              </h2>
              <p className="text-foreground-500 text-lg mb-10">
                Our intuitive dashboard puts everything you need at your fingertips. Process documents, track progress, and gain insights—all in one place.
              </p>
              
              <div className="space-y-5">
                {highlightPoints.map((point, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                    className="flex items-center gap-4"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center">
                      <Icon icon={point.icon} className="h-5 w-5 text-primary-500" />
                    </div>
                    <span className="font-medium">{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-lg overflow-hidden ambient-shadow"
            >
              <div className="bg-foreground-100 h-8 w-full flex items-center px-4 gap-2">
                <div className="h-3 w-3 rounded-full bg-foreground-300"></div>
                <div className="h-3 w-3 rounded-full bg-foreground-300"></div>
                <div className="h-3 w-3 rounded-full bg-foreground-300"></div>
                <div className="h-4 w-64 bg-foreground-200 rounded ml-4"></div>
              </div>
              
              <div className="bg-white p-6">
                <div className="flex gap-4 mb-6">
                  <div className="w-48 h-8 bg-primary-50 rounded flex items-center justify-center">
                    <div className="h-3 w-24 bg-primary-500 rounded"></div>
                  </div>
                  <div className="w-48 h-8 bg-foreground-100 rounded flex items-center justify-center">
                    <div className="h-3 w-24 bg-foreground-300 rounded"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-foreground-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <Icon icon="lucide:file-text" className="h-4 w-4 text-primary-500 mr-2" />
                      <div className="h-4 w-16 bg-foreground-200 rounded"></div>
                    </div>
                    <div className="h-8 w-20 bg-primary-100 rounded flex items-center justify-center">
                      <div className="h-4 w-10 bg-primary-500 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-foreground-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <Icon icon="lucide:clipboard-check" className="h-4 w-4 text-secondary-500 mr-2" />
                      <div className="h-4 w-16 bg-foreground-200 rounded"></div>
                    </div>
                    <div className="h-8 w-20 bg-secondary-100 rounded flex items-center justify-center">
                      <div className="h-4 w-10 bg-secondary-500 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-foreground-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <Icon icon="lucide:calendar" className="h-4 w-4 text-foreground-500 mr-2" />
                      <div className="h-4 w-16 bg-foreground-200 rounded"></div>
                    </div>
                    <div className="h-8 w-20 bg-foreground-200 rounded flex items-center justify-center">
                      <div className="h-4 w-10 bg-foreground-400 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-foreground-200 rounded p-5 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Icon icon="lucide:file-text" className="h-4 w-4 text-primary-500 mr-2" />
                      <div className="h-5 w-32 bg-foreground-200 rounded"></div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <Icon icon="lucide:check" className="h-4 w-4 text-primary-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-6 bg-foreground-100 rounded w-full"></div>
                    <div className="h-6 bg-foreground-100 rounded w-full"></div>
                    <div className="h-6 bg-foreground-100 rounded w-3/4"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-foreground-50 p-4 rounded h-40">
                    <div className="flex items-center mb-4">
                      <Icon icon="lucide:bar-chart-2" className="h-4 w-4 text-primary-500 mr-2" />
                      <div className="h-4 w-24 bg-foreground-200 rounded"></div>
                    </div>
                    <div className="h-24 w-full bg-white rounded border border-foreground-200 p-2">
                      <div className="flex h-full items-end justify-between">
                        <div className="h-1/3 w-3 bg-primary-200 rounded-t"></div>
                        <div className="h-1/2 w-3 bg-primary-300 rounded-t"></div>
                        <div className="h-2/3 w-3 bg-primary-400 rounded-t"></div>
                        <div className="h-3/4 w-3 bg-primary-500 rounded-t"></div>
                        <div className="h-1/2 w-3 bg-primary-400 rounded-t"></div>
                        <div className="h-2/5 w-3 bg-primary-300 rounded-t"></div>
                        <div className="h-1/4 w-3 bg-primary-200 rounded-t"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-foreground-50 p-4 rounded h-40">
                    <div className="flex items-center mb-4">
                      <Icon icon="lucide:pie-chart" className="h-4 w-4 text-secondary-500 mr-2" />
                      <div className="h-4 w-24 bg-foreground-200 rounded"></div>
                    </div>
                    <div className="h-24 w-full bg-white rounded border border-foreground-200 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full border-4 border-primary-500 border-t-secondary-500 border-r-secondary-500"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white rounded-full h-16 w-16 flex items-center justify-center ambient-shadow"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Icon icon="lucide:play" className="h-6 w-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;