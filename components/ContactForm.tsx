"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We are pleased to help
          </h2>
          <p className="text-lg text-gray-600">
            Fill out the form below and we&apos;ll get back to you within 24 hours
          </p>
        </div>

        <div className="backdrop-blur-xl bg-gradient-to-br from-[var(--color-electric-50)]/80 to-lime-50/80 border border-white/40 rounded-2xl p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-electric-500)] w-5 h-5" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-white/70 border-white/60 focus:border-[var(--color-electric-400)]"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-coral-500)] w-5 h-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-white/70 border-white/60 focus:border-[var(--color-coral-400)]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lime-500 w-5 h-5" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-white/70 border-white/60 focus:border-lime-400"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-white/70 border-white/60 focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <div>
              <textarea
                name="message"
                rows={6}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 bg-white/70 border border-white/60 rounded-lg focus:border-[var(--color-electric-400)] focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-400)]/20 transition-all duration-300"
                required
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="h-12 bg-gradient-to-r from-[var(--color-electric-500)] to-[var(--color-coral-500)] hover:from-[var(--color-electric-600)] hover:to-[var(--color-coral-600)] text-white font-semibold px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-electric-500)]/30"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;