"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Globe, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";
import MetaLayout from "@/components/MetaLayout";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Intelligence Inquiry",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "Intelligence Inquiry", message: "" });
    }, 1500);
  };

  return (
    <MetaLayout title="Contact Relay" subtitle="Establish a Connection">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter">Get in Touch</h2>
            <p className="text-zinc-500 leading-relaxed">
              Our tactical operations center is active 24/7. Whether you have a protocol inquiry, integration request, or market feedback, our team of intelligence analysts is ready to respond.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 font-mono">Channel 01: Email</h4>
                <p className="text-sm font-bold">ops@gleam.intel</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 font-mono">HQ: Decentralized</h4>
                <p className="text-sm font-bold">Node 7, Singapore Financial District</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 font-mono">Global Relay</h4>
                <p className="text-sm font-bold">Distributed Cloud Infrastructure</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800">
             <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
               <MessageSquare className="w-4 h-4 text-emerald-500" /> System Status
             </h3>
             <p className="text-[10px] text-zinc-600 font-mono leading-relaxed uppercase tracking-tight">
               Response latency: 180ms - 1200ms
               <br />
               Protocol: Secure Handshake 2.4
               <br />
               Current Wait Time: &lt; 2 Hours
             </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-900/20 border border-zinc-800 rounded-[40px] p-8 md:p-12 shadow-2xl">
            {status === "sent" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                   <Send className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black italic tracking-tighter">Transmission Successful</h3>
                <p className="text-zinc-500 max-w-xs mx-auto">Your intelligence request has been broadcast to our operations team.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="text-xs font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Initiate New Relay
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Identifier</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="YOUR_NAME"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs focus:outline-none focus:border-emerald-500 transition-all uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Relay Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="MAIL@DOMAIN.COM"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs focus:outline-none focus:border-indigo-500 transition-all uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Sector</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs focus:outline-none focus:border-amber-500 transition-all uppercase cursor-pointer appearance-none"
                  >
                    <option>Intelligence Inquiry</option>
                    <option>Protocol Bug</option>
                    <option>Partnership Relay</option>
                    <option>Security Vulnerability</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Transmission Data</label>
                  <textarea 
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="ENTER_INTEL_HERE..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs focus:outline-none focus:border-emerald-500 transition-all uppercase resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  {status === "sending" ? "BROADCASTING..." : (
                    <>
                      <Send className="w-3 h-3" /> Initialize Transmission
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </MetaLayout>
  );
}
