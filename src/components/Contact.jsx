import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, Linkedin, Github, Send, FileDown } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../utils/animations';

const inputClasses =
  'glass-sm bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all w-full';

const contactItems = [
  {
    icon: Mail,
    label: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    isLink: true,
  },
  {
    icon: Phone,
    label: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    isLink: false,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn Profile',
    href: personalInfo.linkedin,
    isLink: true,
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub Profile',
    href: personalInfo.github,
    isLink: true,
    external: true,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <div className="gradient-divider mx-auto mb-6" />
          <h2 className="section-title">
            Get <span className="gradient-text">In Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* LEFT: Contact Form */}
          <motion.div variants={fadeInLeft} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl">
              {/* Name Field */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-300 mb-2 block"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-300 mb-2 block"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-300 mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`${inputClasses} resize-none`}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary w-full mt-2">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* RIGHT: Contact Info */}
          <motion.div variants={fadeInRight} className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {contactItems.map((item, index) => {
                const IconComponent = item.icon;
                const content = (
                  <div className="glass glass-hover p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-slate-300 text-sm truncate">
                      {item.label}
                    </span>
                  </div>
                );

                if (item.isLink) {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={index}>{content}</div>;
              })}
            </div>

            {/* Resume Download Button */}
            <a
              href={personalInfo.resumeUrl}
              className="btn-outline w-full mt-6 inline-flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
