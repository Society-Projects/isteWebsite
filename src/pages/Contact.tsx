import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { Mail, MapPin, Phone, Send, CheckCircle2, Linkedin, Github, Instagram, Twitter, MessageSquare, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'Technical & Development',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Get In Touch"
        title="Connect With ISTE Chapter"
        description="Have questions about chapter memberships, hackathon sponsorships, or upcoming technical workshops? Drop us a message!"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Contact Form */}
        <div className="lg:col-span-7 rounded-3xl glass-panel p-8 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Send Us a Message</h3>
              <p className="text-slate-400 text-xs font-mono">We typically respond within 24 hours</p>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white font-heading">Message Sent Successfully!</h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you <span className="text-cyan-400 font-semibold">{formData.name}</span>. Our executive team has received your message and will get back to you at <span className="text-cyan-400">{formData.email}</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', domain: 'Technical & Development', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-slate-300 text-xs font-mono font-semibold hover:bg-slate-800"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Sharma"
                    className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">College Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@student.edu"
                    className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">Domain / Interest Area</label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                >
                  <option value="Technical & Development">Technical & Web Development</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="UI/UX & Creative Design">UI/UX & Creative Design</option>
                  <option value="Corporate & Sponsorships">Corporate Alliances & Sponsorships</option>
                  <option value="Events & Operations">Events & Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can collaborate or help you..."
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Chapter Details Card */}
          <div className="rounded-3xl glass-card p-8 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading border-b border-slate-800 pb-4">
              Society HQ Information
            </h3>

            <div className="space-y-4 text-slate-300 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Campus Location</h4>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                    ISTE Chapter Room 304, Student Activity Center, Block C, Main Campus
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Official Email</h4>
                  <a href="mailto:iste@studentchapter.org" className="text-cyan-400 text-xs hover:underline">
                    iste@studentchapter.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Chapter Hotline</h4>
                  <p className="text-slate-400 text-xs mt-0.5">+91 98765 43210 / +91 91234 56789</p>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Campus Map Preview Card */}
          <div className="rounded-3xl glass-card p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Campus Geolocation</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
              <img
                src="/orientation.JPG"
                alt="Campus View"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent" />
              <div className="absolute text-center p-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-white font-bold text-sm">Main Campus HQ</p>
                <p className="text-slate-300 text-xs font-mono">Open Mon - Sat (09:00 AM - 06:00 PM)</p>
              </div>
            </div>
          </div>

          {/* Social Connections */}
          <div className="rounded-3xl glass-card p-6 border border-slate-800">
            <h4 className="text-white font-semibold text-sm mb-4">Official Channels</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-400', href: 'https://linkedin.com' },
                { name: 'GitHub', icon: Github, color: 'text-slate-300', href: 'https://github.com' },
                { name: 'Instagram', icon: Instagram, color: 'text-pink-400', href: 'https://instagram.com' },
                { name: 'Twitter', icon: Twitter, color: 'text-cyan-400', href: 'https://twitter.com' },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center gap-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
