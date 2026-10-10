'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, ShieldCheck, Sparkles, Bot } from 'lucide-react';
import { buildWhatsAppLink, WHATSAPP_QUICK_TOPICS } from '../lib/whatsapp';
import { VoiceAdvisorModal } from './VoiceAdvisorModal';

export function WhatsAppWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceAdvisorOpen, setIsVoiceAdvisorOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isWaHovered, setIsWaHovered] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Hyderabad');

  useEffect(() => {
    setMounted(true);

    const savedCity = localStorage.getItem('estateflow_city');
    if (savedCity) setSelectedCity(savedCity);

    const handleCityChange = () => {
      const current = localStorage.getItem('estateflow_city');
      if (current) setSelectedCity(current);
    };

    const handleOpenVoiceModal = () => {
      setIsVoiceAdvisorOpen(true);
    };

    window.addEventListener('estateflow_city_change', handleCityChange);
    window.addEventListener('open_voice_advisor', handleOpenVoiceModal);

    return () => {
      window.removeEventListener('estateflow_city_change', handleCityChange);
      window.removeEventListener('open_voice_advisor', handleOpenVoiceModal);
    };
  }, []);

  if (!mounted) return null;

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = buildWhatsAppLink({ customMessage: customMsg });
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMsg('');
    setIsOpen(false);
  };

  const handleQuickSend = (templateText: string) => {
    const url = buildWhatsAppLink({ customMessage: templateText });
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end gap-3">
        {/* 1. FLOATING PHONE BUTTON (TRIGGER VOICE ADVISOR POPUP) */}
        <div
          className="relative group flex items-center justify-end"
          onMouseEnter={() => setIsPhoneHovered(true)}
          onMouseLeave={() => setIsPhoneHovered(false)}
        >
          <button
            type="button"
            onClick={() => setIsVoiceAdvisorOpen(true)}
            className="flex items-center gap-2.5 bg-slate-950 hover:bg-slate-900 text-white p-3 sm:p-3.5 rounded-full shadow-2xl hover:shadow-emerald-900/30 border border-slate-700/80 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Open Voice Advisor AI Popup"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <Phone className="w-5 h-5 text-emerald-400 fill-emerald-400/20 relative z-10" />
            </div>

            {/* Smoothly expanding phone text on mouse over */}
            <div
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out font-bold text-xs flex items-center gap-1.5 ${
                isPhoneHovered ? 'max-w-xs opacity-100 pr-2' : 'max-w-0 opacity-0'
              }`}
            >
              <span className="text-amber-300 font-extrabold flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-amber-300" /> Ava Voice AI:
              </span>
              <span className="text-white font-extrabold tracking-wide">Call Now</span>
            </div>
          </button>

          {/* Hover Badge Indicator */}
          {isPhoneHovered && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:block bg-slate-900 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-slate-700 animate-in fade-in slide-in-from-right-2">
              🎙️ <span className="text-amber-300">Ava AI Voice Advisor</span> • <span className="text-emerald-400">Available</span>
            </div>
          )}
        </div>

        {/* Expanded Concierge Popover Window */}
        {isOpen && (
          <div className="mb-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 transform scale-100 animate-in fade-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3.5 right-3.5 text-emerald-100 hover:text-white bg-emerald-700/50 hover:bg-emerald-700 p-1.5 rounded-full transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30 text-white font-bold text-lg">
                    EF
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-semibold text-white text-base">EstateFlow Concierge</h4>
                    <ShieldCheck className="w-4 h-4 text-emerald-200 fill-emerald-200/20" />
                  </div>
                  <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                    Online • Replies within 2 mins
                  </p>
                </div>
              </div>
            </div>

            {/* Body content */}
            <div className="p-4 bg-slate-50 space-y-4 max-h-[400px] overflow-y-auto">
              {/* Chat bubble preview */}
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-emerald-700 text-xs">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Instant Support
                  </span>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
                <p>
                  Hello! 👋 Welcome to EstateFlow. Need help finding a property, arranging a site visit, or inquiring about prices?
                </p>
              </div>

              {/* Quick Topic Chips */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Quick Inquiries
                </p>
                <div className="space-y-2">
                  {WHATSAPP_QUICK_TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleQuickSend(topic.template)}
                      className="w-full text-left text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 px-3 py-2 rounded-xl transition-all flex items-center justify-between group shadow-sm"
                    >
                      <span>{topic.label}</span>
                      <span className="text-slate-400 group-hover:text-emerald-600 text-xs">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Input */}
            <form onSubmit={handleSendCustom} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your WhatsApp message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 text-xs bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition-colors shrink-0 flex items-center justify-center"
                title="Start WhatsApp Chat"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 2. FLOATING WHATSAPP BUTTON (HOVER EXPANDS TEXT, CLICK OPENS CHAT WIDGET) */}
        <div
          className="relative group flex items-center justify-end"
          onMouseEnter={() => setIsWaHovered(true)}
          onMouseLeave={() => setIsWaHovered(false)}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3 sm:p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            aria-label="Open WhatsApp Chat Support"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
            </span>

            <MessageCircle className="w-5 h-5 fill-white stroke-emerald-600 shrink-0" />

            {/* Smoothly expanding text on hover */}
            <div
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out font-black text-xs ${
                isWaHovered ? 'max-w-xs opacity-100 pr-2' : 'max-w-0 opacity-0'
              }`}
            >
              <span>WhatsApp Support</span>
            </div>

            {/* Unread badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              1
            </span>
          </button>

          {/* Hover Badge Indicator for WhatsApp */}
          {isWaHovered && !isOpen && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:block bg-emerald-700 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-emerald-500 animate-in fade-in slide-in-from-right-2">
              💬 Click to open WhatsApp Chat
            </div>
          )}
        </div>
      </div>

      {/* LUXURY VOICE ADVISOR AI MODAL POPUP */}
      <VoiceAdvisorModal
        isOpen={isVoiceAdvisorOpen}
        onClose={() => setIsVoiceAdvisorOpen(false)}
        selectedCity={selectedCity}
      />
    </React.Fragment>
  );
}
