// import React from "react";
// import { Button } from "@heroui/react";
// import { motion } from "framer-motion";
// import { Icon } from "@iconify/react";

// const HeroSection: React.FC<{ navigateTo: (view: string) => void }> = ({ navigateTo }) => {
//   return (
//     <section className="relative gradient-teal paper-texture overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
//       <div className="absolute inset-0 blueprint-pattern opacity-10"></div>
      
//       <div className="container mx-auto px-6 md:px-8 relative z-10">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
//           <div className="w-full lg:w-1/2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <h1 className="font-gilroy font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-foreground-900">
//                 Build Structures, not paperwork
//               </h1>
//               <p className="text-xl md:text-2xl text-foreground-600 mb-10 max-w-xl">
//                 From paperwork to clarity in seconds.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
//                 <Button 
//                   color="primary" 
//                   size="lg" 
//                   className="font-medium text-base"
//                   onPress={() => navigateTo("login")}
//                 >
//                   Try free for 14 days
//                 </Button>
//                 <Button 
//                   variant="bordered" 
//                   color="default" 
//                   size="lg" 
//                   className="text-foreground-700 font-medium text-base"
//                   startContent={<Icon icon="lucide:play" className="h-4 w-4" />}
//                 >
//                   Watch demo
//                 </Button>
//               </div>
              
//               <p className="text-sm text-foreground-500 mt-5">
//                 No credit card required. Cancel anytime.
//               </p>
//             </motion.div>
//           </div>
          
//           <div className="w-full lg:w-1/2">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//               className="relative"
//             >
//               <DocumentAnimation />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const DocumentAnimation: React.FC = () => {
//   return (
//     <div className="relative aspect-video bg-white/80 backdrop-blur-sm rounded-lg p-6 ambient-shadow overflow-hidden">
//       <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-secondary-400"></div>
      
//       <div className="flex items-start gap-8">
//         <motion.div 
//           className="w-1/2 bg-white rounded-md ambient-shadow p-4"
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.6 }}
//         >
//           <div className="flex items-center mb-3">
//             <div className="h-5 w-5 bg-primary-100 rounded-sm flex items-center justify-center mr-2">
//               <Icon icon="lucide:file-text" className="h-3 w-3 text-primary-500" />
//             </div>
//             <div className="h-4 w-3/4 bg-foreground-100 rounded"></div>
//           </div>
//           <div className="h-4 w-full bg-foreground-50 rounded mb-2"></div>
//           <div className="h-4 w-full bg-foreground-50 rounded mb-2"></div>
//           <div className="h-4 w-2/3 bg-foreground-50 rounded mb-4"></div>
          
//           <div className="h-12 w-full bg-foreground-100 rounded mb-3"></div>
          
//           <div className="h-4 w-full bg-foreground-50 rounded mb-2"></div>
//           <div className="h-4 w-full bg-foreground-50 rounded mb-2"></div>
//           <div className="h-4 w-3/4 bg-foreground-50 rounded"></div>
//         </motion.div>
        
//         <motion.div 
//           className="w-1/2 bg-primary-50 rounded-md ambient-shadow p-4"
//           initial={{ x: 20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.8, duration: 0.6 }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <div className="h-5 w-5 bg-primary-100 rounded-sm flex items-center justify-center mr-2">
//                 <Icon icon="lucide:check-square" className="h-3 w-3 text-primary-500" />
//               </div>
//               <div className="h-4 w-16 bg-primary-200 rounded"></div>
//             </div>
//             <div className="h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center">
//               <Icon icon="lucide:bar-chart" className="h-3 w-3 text-primary-600" />
//             </div>
//           </div>
          
//           <div className="space-y-3">
//             <div className="h-10 bg-white rounded flex items-center px-3">
//               <div className="h-4 w-1/4 bg-primary-200 rounded mr-auto"></div>
//               <div className="h-4 w-1/4 bg-secondary-200 rounded"></div>
//             </div>
//             <div className="h-10 bg-white rounded flex items-center px-3">
//               <div className="h-4 w-1/3 bg-primary-200 rounded mr-auto"></div>
//               <div className="h-4 w-1/5 bg-secondary-200 rounded"></div>
//             </div>
//             <div className="h-10 bg-white rounded flex items-center px-3">
//               <div className="h-4 w-1/4 bg-primary-200 rounded mr-auto"></div>
//               <div className="h-4 w-1/4 bg-secondary-200 rounded"></div>
//             </div>
//           </div>
          
//           <div className="mt-4 h-24 bg-white rounded p-2">
//             <div className="h-3 w-full bg-primary-100 rounded mb-2"></div>
//             <div className="h-3 w-full bg-primary-100 rounded mb-2"></div>
//             <div className="h-3 w-2/3 bg-primary-100 rounded"></div>
//           </div>
//         </motion.div>
//       </div>
      
//       <motion.div 
//         className="absolute inset-0 flex items-center justify-center"
//         initial={{ opacity: 1 }}
//         animate={{ opacity: 0 }}
//         transition={{ delay: 0.4, duration: 0.3 }}
//       >
//         <motion.div
//           animate={{ 
//             rotate: [0, 0, 180, 180, 0],
//             scale: [1, 0.8, 0.8, 1, 1],
//           }}
//           transition={{ 
//             duration: 2,
//             ease: "easeInOut",
//             repeat: Infinity,
//             repeatDelay: 1
//           }}
//         >
//           <Icon icon="lucide:file-text" className="h-16 w-16 text-primary-400" />
//         </motion.div>
//       </motion.div>
      
//       <motion.div
//         className="absolute bottom-4 right-4 flex items-center gap-2 text-foreground-600 text-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2, duration: 0.5 }}
//       >
//         <Icon icon="lucide:zap" className="h-4 w-4 text-primary-500" />
//         <span>AI-powered extraction</span>
//       </motion.div>
//     </div>
//   );
// };

// export default HeroSection;





import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const HeroSection: React.FC<{ navigateTo: (view: string) => void }> = ({ navigateTo }) => {
  return (
    <section className="relative gradient-teal paper-texture overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="absolute inset-0 blueprint-pattern opacity-10"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-foreground-900">
                Build Structures, not paperwork
              </h1>
              <p className="text-xl md:text-2xl text-foreground-600 mb-10 max-w-xl">
                From paperwork to clarity in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
                <button 
                  className="btn btn-primary text-base font-medium"
                  onClick={() => navigateTo("login")}
                >
                  Try free for 14 days
                </button>
                <button 
                  className="btn btn-outline text-base font-medium text-foreground-700"
                >
                  <Icon icon="lucide:play" className="h-4 w-4 mr-2" />
                  Watch demo
                </button>
              </div>
              
              <p className="text-sm text-foreground-500 mt-5">
                No credit card required. Cancel anytime.
              </p>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative"
            >
              <DocumentAnimation />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DocumentAnimation: React.FC = () => {
  return (
    <div className="relative aspect-video bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-xl overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
      
      <div className="flex items-start gap-8">
        <motion.div 
          className="w-1/2 bg-white rounded-md shadow p-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center mb-3">
            <div className="h-5 w-5 bg-primary rounded flex items-center justify-center mr-2">
              <Icon icon="lucide:file-text" className="h-3 w-3 text-primary-content" />
            </div>
            <div className="h-4 w-3/4 bg-base-200 rounded"></div>
          </div>
          <div className="h-4 w-full bg-base-300 rounded mb-2"></div>
          <div className="h-4 w-full bg-base-300 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-base-300 rounded mb-4"></div>
          <div className="h-12 w-full bg-base-200 rounded mb-3"></div>
          <div className="h-4 w-full bg-base-300 rounded mb-2"></div>
          <div className="h-4 w-full bg-base-300 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-base-300 rounded"></div>
        </motion.div>

        <motion.div 
          className="w-1/2 bg-primary-content rounded-md shadow p-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="h-5 w-5 bg-primary rounded flex items-center justify-center mr-2">
                <Icon icon="lucide:check-square" className="h-3 w-3 text-primary-content" />
              </div>
              <div className="h-4 w-16 bg-primary-focus rounded"></div>
            </div>
            <div className="h-6 w-6 rounded-full bg-primary-focus flex items-center justify-center">
              <Icon icon="lucide:bar-chart" className="h-3 w-3 text-primary" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-10 bg-white rounded flex items-center px-3">
              <div className="h-4 w-1/4 bg-primary rounded mr-auto"></div>
              <div className="h-4 w-1/4 bg-secondary rounded"></div>
            </div>
            <div className="h-10 bg-white rounded flex items-center px-3">
              <div className="h-4 w-1/3 bg-primary rounded mr-auto"></div>
              <div className="h-4 w-1/5 bg-secondary rounded"></div>
            </div>
            <div className="h-10 bg-white rounded flex items-center px-3">
              <div className="h-4 w-1/4 bg-primary rounded mr-auto"></div>
              <div className="h-4 w-1/4 bg-secondary rounded"></div>
            </div>
          </div>

          <div className="mt-4 h-24 bg-white rounded p-2">
            <div className="h-3 w-full bg-base-200 rounded mb-2"></div>
            <div className="h-3 w-full bg-base-200 rounded mb-2"></div>
            <div className="h-3 w-2/3 bg-base-200 rounded"></div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 0, 180, 180, 0],
            scale: [1, 0.8, 0.8, 1, 1],
          }}
          transition={{ 
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <Icon icon="lucide:file-text" className="h-16 w-16 text-primary" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-2 text-base-content text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Icon icon="lucide:zap" className="h-4 w-4 text-primary" />
        <span>AI-powered extraction</span>
      </motion.div>
    </div>
  );
};

export default HeroSection;
