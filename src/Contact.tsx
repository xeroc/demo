/**
 * Contact Page Component for ChaosCraft
 * Contact form with client-side validation
 */

import React, { useState, FormEvent } from 'react';

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  body: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  body?: string;
}

/**
 * Contact form page component
 */
const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    body: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate full name
    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = 'Full name must not exceed 100 characters';
    }

    // Validate email
    if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate subject
    if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = 'Subject must not exceed 200 characters';
    }

    // Validate body
    if (formData.body.trim().length < 10) {
      newErrors.body = 'Message must be at least 10 characters';
    } else if (formData.body.trim().length > 5000) {
      newErrors.body = 'Message must not exceed 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          body: formData.body.trim()
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          body: ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const error = await response.json();
        alert('Error: ' + (error.message || 'Failed to send message'));
      }
    } catch (error) {
      alert('Error: Unable to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center">
          Contact Us
        </h1>

        {showSuccess && (
          <div className="bg-green-500/20 border border-green-400/50 text-green-200 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        <form 
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-xl"
        >
          {/* Honeypot field for spam protection */}
          <input 
            type="text" 
            name="website" 
            className="hidden" 
            tabIndex={-1} 
            autoComplete="off"
            onChange={handleInputChange}
          />

          <div className="form-group mb-4 sm:mb-5 md:mb-6">
            <label 
              htmlFor="fullName" 
              className="block mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg font-semibold text-gray-200"
            >
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              minLength={2}
              maxLength={100}
              placeholder="Enter your full name"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 text-sm sm:text-base md:text-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
            />
            {errors.fullName && (
              <div className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-1.5">
                {errors.fullName}
              </div>
            )}
          </div>

          <div className="form-group mb-4 sm:mb-5 md:mb-6">
            <label 
              htmlFor="email" 
              className="block mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg font-semibold text-gray-200"
            >
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              maxLength={254}
              placeholder="Enter your email address"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 text-sm sm:text-base md:text-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
            />
            {errors.email && (
              <div className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-1.5">
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group mb-4 sm:mb-5 md:mb-6">
            <label 
              htmlFor="subject" 
              className="block mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg font-semibold text-gray-200"
            >
              Subject <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              minLength={5}
              maxLength={200}
              placeholder="What is this about?"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 text-sm sm:text-base md:text-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
            />
            {errors.subject && (
              <div className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-1.5">
                {errors.subject}
              </div>
            )}
          </div>

          <div className="form-group mb-5 sm:mb-6 md:mb-8">
            <label 
              htmlFor="body" 
              className="block mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg font-semibold text-gray-200"
            >
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              placeholder="Write your message here..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 text-sm sm:text-base md:text-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all resize-y min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
            />
            {errors.body && (
              <div className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-1.5">
                {errors.body}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
