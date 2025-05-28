import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

 const PricingSection: React.FC<{ navigateTo?: (view: string) => void }> = ({ navigateTo }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const plans = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for small teams and simple projects",
      features: [
        "Process up to 100 documents/month",
        "Basic data extraction",
        "Email support",
        "1 user license"
      ],
      isPopular: false,
      color: "default"
    },
    {
      name: "Professional",
      price: "$149",
      description: "For growing teams with advanced needs",
      features: [
        "Process up to 500 documents/month",
        "Advanced data extraction & insights",
        "Priority support",
        "5 user licenses",
        "API access"
      ],
      isPopular: true,
      color: "primary"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited document processing",
        "Custom AI model training",
        "Dedicated account manager",
        "Unlimited users",
        "Advanced security features"
      ],
      isPopular: false,
      color: "default"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };
  
  return (
    <section id="pricing" className="py-28 md:py-36 bg-background paper-texture">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-gilroy font-bold text-3xl md:text-4xl mb-5"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-foreground-500 text-lg max-w-2xl mx-auto"
          >
            Choose the plan that's right for your business
          </motion.p>
        </div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                className={`overflow-visible h-full ${plan.isPopular ? 'border-primary-500 border-2 ambient-shadow' : ''}`}
                disableRipple
              >
                <CardBody className="p-10 flex flex-col h-full">
                  {plan.isPopular && (
                    <div className="absolute -top-3 right-0 bg-primary-500 text-white text-xs font-bold py-1 px-4 rounded-tl-md rounded-br-md">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <h3 className="font-dmsans font-bold text-xl mb-3 mt-4">{plan.name}</h3>
                  <div className="flex items-end mb-5">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-foreground-500 ml-1">/month</span>}
                  </div>
                  <p className="text-foreground-500 mb-8">{plan.description}</p>
                  
                  <div className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <Icon 
                          icon="lucide:check" 
                          className={`h-5 w-5 mr-4 ${plan.isPopular ? 'text-primary-500' : 'text-foreground-500'}`} 
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    color={plan.isPopular ? "primary" : "default"}
                    variant={plan.isPopular ? "solid" : "bordered"}
                    className="w-full font-medium"
                    onPress={() => navigateTo && navigateTo("login")}
                  >
                    {plan.price === "Custom" ? "Contact sales" : "Get started"}
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-foreground-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;