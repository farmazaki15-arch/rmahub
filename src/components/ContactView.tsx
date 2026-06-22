import React, { useState } from 'react';
import { Mail, Send, CheckCircle, ShieldAlert, Heart, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Audit Request');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const contactFaqs = [
    { q: "How do I claim a validation audit for my technical SaaS product?", a: "Simply fill out our contact form with subject 'SaaS Audit Request'. Include your product specifications sheet. Sarah Chen will catalog performance metrics and schedule an independent review." },
    { q: "Is the ChatGPT SEO discount code reusable?", a: "Yes, our partner code 'FARMAONLINE' provides a persistent 25% discount for any newly enrolling student entering the Independent Academy." },
    { q: "Can I syndicate FarmaOnline XML templates under my own branding?", a: "All our code representations are under Apache-2.0 licenses. Feel free to clone or modify! We only ask for an honest credit citation link." }
  ];

  return (
    <section className="font-sans max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in text-gray-900 dark:text-gray-100 space-y-12">
      
      {/* Title */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-5">
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-linear-to-r from-pink-500/10 to-blue-500/10 text-pink-650 dark:text-pink-400 font-bold">
          CONTACT INTENT CHANNEL
        </span>
        <h1 className="text-3xl font-bold font-display tracking-tight text-gray-900 dark:text-white mt-1.5">
          Establish Authority Correspondence
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
          Request schema evaluations, tool auditing queries, or submit partner affiliate inquiries directly to Alex and Sarah Chen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Form panel */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="p-8 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-md font-bold font-display text-gray-900 dark:text-white">
                Correspondence Transmitted!
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm mx-auto">
                Thank you, **{name}**. We have verified your telemetry dispatch. Our standard response window guarantee is **within 24 Hours** during standard business slots.
              </p>
              <button
                onClick={() => { setSubmitted(false); setMessage(''); }}
                className="mt-4 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase text-gray-400 border-b border-gray-55 dark:border-gray-850 pb-2">
                Secured Audit Request dispatch
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-400 mb-1 uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full text-xs bg-gray-50 dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-lg focus:outline-hidden focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-400 mb-1 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@agency.com"
                    className="w-full text-xs bg-gray-50 dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-lg focus:outline-hidden focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-gray-400 mb-1 uppercase">Correspondence Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs bg-gray-50 dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-2.5 py-1.5 rounded-lg focus:outline-hidden"
                >
                  <option value="Audit Request">LLMO Validation Audit Request</option>
                  <option value="Sponsor Inquiries">Sponsored Campaign Pitch</option>
                  <option value="Feedback Bug">Technical schema report / Feedback</option>
                  <option value="General Conversation">Conversational Q&A chat</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-gray-400 mb-1 uppercase">Telemetry Content Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Detail your indexing issues, product specifications, or affiliate partnerships offer here..."
                  className="w-full text-xs bg-gray-50 dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-lg focus:outline-hidden"
                />
              </div>

              {/* Response Time Guarantee notice block */}
              <div className="p-3 rounded-lg bg-pink-100/10 border border-pink-500/15 text-[10px] text-gray-500 dark:text-gray-400 leading-snug">
                ⌛ <strong>Audit response Guarantee notice:</strong> Dispatches parsed during traditional slots are processed by Sarah Chen directly inside <strong>24 Hours</strong>. High volume TPU updates may delay response windows by up to half a slot.
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold text-xs rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.01]"
              >
                Transmit Correspondence Dispatch
              </button>
            </form>
          )}
        </div>

        {/* Info detail and contact FAQs */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 space-y-4">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
              Direct Contact Details
            </h4>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-purple-500" />
                <span className="font-mono">inquiries@farmaonline.media</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-normal">
                Submit direct credentials, secure database schemas, or code review attachments straight via our encryption proxy container endpoint.
              </p>
            </div>
          </div>

          {/* Quick FAQ answers (Required Contact FAQs) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block">
              Pre-Contact Solutions FAQ
            </h4>

            <div className="space-y-2">
              {contactFaqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border border-gray-150 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-2.5 text-left font-bold text-[11px] hover:bg-gray-50 dark:hover:bg-gray-850 flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5 text-gray-400" />}
                    </button>
                    {isOpen && (
                      <p className="p-2.5 bg-gray-50/50 dark:bg-gray-950/25 border-t border-gray-100 dark:border-gray-850 text-[10.5px] text-gray-500 leading-normal">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
