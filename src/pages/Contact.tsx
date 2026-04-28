import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@mathvortex.lab', link: 'mailto:contact@mathvortex.lab' },
    { icon: Github, label: 'GitHub', value: 'github.com/mathvortex', link: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/company/mathvortex', link: 'https://linkedin.com' },
    { icon: MapPin, label: 'Location', value: 'Virtual Campus, Worldwide', link: '#' },
    { icon: Phone, label: 'Support', value: '+1 (555) MATH-LAB', link: 'tel:+15556284522' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-xl text-gray-600">We're here to help you on your mathematical journey.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 space-y-8"
        >
          <h3 className="text-2xl font-bold">Get in Touch</h3>
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <a 
                key={i}
                href={info.link}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <info.icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{info.label}</p>
                  <p className="font-medium text-gray-700 group-hover:text-primary transition-colors">{info.value}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 space-y-6"
        >
          <h3 className="text-2xl font-bold">Office Hours</h3>
          <div className="space-y-4 text-gray-600">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span>Monday - Friday</span>
              <span className="font-bold text-black">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span>Saturday</span>
              <span className="font-bold text-black">10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span>Sunday</span>
              <span className="font-bold text-black">Closed</span>
            </div>
          </div>
          <div className="bg-accent-cool/20 p-6 rounded-xl space-y-2">
            <p className="font-bold text-primary">Need urgent help?</p>
            <p className="text-sm text-gray-600">Our AI assistant is available 24/7 in the simulator to help with basic vector questions.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
