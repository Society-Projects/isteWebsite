import React, { useState } from 'react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is compulsory.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is compulsory.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is compulsory.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const primaryUrl = import.meta.env.VITE_CONTACT_FORM_BACKEND 
        ? `${import.meta.env.VITE_CONTACT_FORM_BACKEND.replace(/\/+$/, '')}/api/contact`
        : '/api/contact';

      let response;
      try {
        response = await fetch(primaryUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (primaryErr) {
        // Fallback to relative path (proxied by Vercel/Vite server) if primary fetch failed
        if (primaryUrl !== '/api/contact') {
          response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        } else {
          throw primaryErr;
        }
      }

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Message sent successfully',
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: '',
        });
        setErrors({});
      } else {
        if (data.details) {
          setErrors(data.details);
        }
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to submit form. Please check your inputs.',
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus({
        type: 'error',
        message: 'Network error: Unable to connect to backend server. Render backend may be starting up or CORS is blocked.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-transparent text-white flex flex-col items-center justify-start p-6 md:p-12 relative overflow-hidden selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">

      {/* Subtle, premium background lighting — navy/cyan glows */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#0B3D91]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-6xl my-16 md:my-24 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

        {/* LEFT COLUMN: Input Form */}
        <div className="lg:col-span-7 group relative rounded-2xl bg-[#0D1524] border border-white/10 hover:border-[#00F0FF]/30 transition-all duration-300 shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F0FF]/5 rounded-full blur-xl opacity-100 pointer-events-none"></div>

          <div className="h-full bg-[#0D1524]/90 backdrop-blur-2xl rounded-2xl p-8 md:p-10 space-y-8 relative z-10">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
                Let's connect
              </h1>
              <p className="text-slate-400 mt-2 text-sm md:text-base font-normal">
                Have questions or want to collaborate? Drop us a message below.
              </p>
            </div>

            {submitStatus && (
              <div
                className={`p-4 rounded-xl text-sm border flex items-center gap-3 ${
                  submitStatus.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}
              >
                <span>{submitStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    First Name <span className="text-[#00F0FF]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="e.g. John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#050508] border rounded-xl focus:outline-none transition-all shadow-inner text-white placeholder-slate-600 ${
                      errors.firstName
                        ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                        : 'border-white/10 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/30'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-rose-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Smith"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#050508] border border-white/10 rounded-xl focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/30 text-white placeholder-slate-600 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Email Address <span className="text-[#00F0FF]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#050508] border rounded-xl focus:outline-none transition-all shadow-inner text-white placeholder-slate-600 ${
                    errors.email
                      ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                      : 'border-white/10 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/30'
                  }`}
                />
                {errors.email && (
                  <p className="text-rose-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-slate-400">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="e.g. +91 XXXXX XXXXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#050508] border border-white/10 rounded-xl focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/30 text-white placeholder-slate-600 transition-all shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Message <span className="text-[#00F0FF]">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Let us know how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#050508] border rounded-xl focus:outline-none transition-all resize-none shadow-inner text-white placeholder-slate-600 ${
                    errors.message
                      ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                      : 'border-white/10 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]/30'
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-rose-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-[#00F0FF] text-black font-bold rounded-xl hover:bg-[#00D4E0] transition-colors transition-all transform active:scale-95 duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send message</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Showcase Info Card */}
        <div className="lg:col-span-5 group relative rounded-2xl bg-[#0D1524] border border-white/10 hover:border-[#00F0FF]/30 transition-all duration-300 shadow-xl">
          <div className="h-full bg-[#0D1524]/90 backdrop-blur-2xl rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">

            <div className="space-y-10">
              <div className="space-y-4">
                <span className="font-display inline-flex items-center px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-black text-[#00F0FF] rounded-full border border-[#00F0FF]/30 shadow-sm w-fit">
                  Official Chapter
                </span>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white uppercase">
                  ISTE Thapar Chapter
                </h2>
              </div>

              <div className="space-y-8 pt-4">
                <div className="space-y-2">
                  <span className="text-xs md:text-sm uppercase tracking-widest text-[#00F0FF] font-bold block">Email Us</span>
                  <a href="mailto:iste@thapar.edu" className="text-2xl md:text-3xl font-semibold text-white hover:text-[#00F0FF] transition-colors duration-250 block">
                    iste@thapar.edu
                  </a>
                </div>

                <div className="space-y-2">
                  <span className="text-xs md:text-sm uppercase tracking-widest text-[#00F0FF] font-bold block">Our Campus Location</span>
                  <p className="text-slate-350 leading-relaxed text-base md:text-lg font-normal">
                    Thapar Institute of Engineering & Technology,<br />
                    Patiala, Punjab
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-12">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold block mb-4">Connect With Us</span>
              <div className="flex items-center gap-4">
                {/* Facebook */}
                <a href="https://www.facebook.com/ISTE.Thapar/" target="_blank" rel="noreferrer" className="p-3 bg-black border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-[#00F0FF] transition-all duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/iste_tiet/?hl=en" target="_blank" rel="noreferrer" className="p-3 bg-black border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-[#00F0FF] transition-all duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/iste-thapar/?originalSubdomain=in" target="_blank" rel="noreferrer" className="p-3 bg-black border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-[#00F0FF] transition-all duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};