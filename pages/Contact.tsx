
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! This is a demo form and your message has not been sent.");
  }

  return (
    <div className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Reach out with any questions or feedback.</p>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-2xl font-serif font-semibold text-brand-dark mb-6">Contact Information</h2>
                <div className="space-y-4 text-gray-700">
                    <div className="flex items-center">
                        <MapPin className="text-brand-primary mr-3" />
                        <span>123 Beauty Lane, Wellness City, 45678</span>
                    </div>
                    <div className="flex items-center">
                        <Mail className="text-brand-primary mr-3" />
                        <span>hello@cabadokas.com</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="text-brand-primary mr-3" />
                        <span>(123) 456-7890</span>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" name="message" rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-dark text-white py-3 px-6 rounded-md font-semibold hover:bg-brand-primary transition-colors">
                    Send Message
                </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
   