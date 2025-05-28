import React from "react";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Integrations", "Roadmap", "Changelog"]
    },
    {
      title: "Resources",
      links: ["Documentation", "Guides", "API Reference", "Community", "Support"]
    },
    {
      title: "Company",
      links: ["About", "Careers", "Blog", "Press", "Contact"]
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Compliance", "GDPR"]
    }
  ];
  
  const socialLinks = [
    { icon: "lucide:twitter", name: "Twitter" },
    { icon: "lucide:linkedin", name: "LinkedIn" },
    { icon: "lucide:facebook", name: "Facebook" },
    { icon: "lucide:instagram", name: "Instagram" }
  ];
  
  return (
    <footer className="bg-background border-t border-divider pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5">
              <Icon 
                icon="lucide:layers" 
                className="text-primary h-7 w-7 mr-2" 
              />
              <span className="font-gilroy font-bold text-xl">Paperstack</span>
            </div>
            <p className="text-foreground-500 mb-8 max-w-md">
              From paperwork to clarity in seconds. Build Structures, not paperwork.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="h-10 w-10 rounded-full bg-foreground-100 flex items-center justify-center hover:bg-foreground-200 transition-colors"
                >
                  <Icon icon={social.icon} className="h-5 w-5 text-foreground-600" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-dmsans font-semibold mb-5">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-foreground-500 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-divider pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Paperstack. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-foreground-500 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground-500 hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-foreground-500 hover:text-primary text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;