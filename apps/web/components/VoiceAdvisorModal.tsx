'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  PhoneOff,
  ArrowLeft,
  ArrowRight,
  Volume2,
  Sparkles,
  Building,
  Check,
  CheckCircle2,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface VoiceAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity?: string;
}

type CallStep = 'welcome' | 'calling' | 'on_call' | 'after_call';

export const VoiceAdvisorModal: React.FC<VoiceAdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedCity = 'Hyderabad',
}) => {
  const [step, setStep] = useState<CallStep>('welcome');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState<
    Array<{ sender: 'ai' | 'user'; text: string }>
  >([
    {
      sender: 'ai',
      text: `Hello! I'm Ava, your AI Home Advisor. I see you're looking at ${selectedCity}. Tell me about your dream home—location, budget, or preferred amenities?`,
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  // Timer for call duration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'on_call') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [step]);

  // Simulate transition from Calling -> On call
  useEffect(() => {
    if (step === 'calling') {
      const timeout = setTimeout(() => {
        setStep('on_call');
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || userQuery;
    if (!text.trim()) return;

    const newTranscript = [...transcript, { sender: 'user' as const, text }];
    setTranscript(newTranscript);
    setUserQuery('');

    // AI Response Simulation
    setTimeout(() => {
      let aiReply = `Understood! Searching prime corridors in ${selectedCity} for "${text}". I have shortlisted 3 verified TS-RERA luxury listings matching your criteria.`;
      if (text.toLowerCase().includes('villa') || text.toLowerCase().includes('jubilee')) {
        aiReply = `Excellent choice! Jubilee Hills & Kokapet Neopolis have 4 BHK gated villas starting from ₹6.8 Cr with private plunge pools and high CAGR appreciation.`;
      } else if (text.toLowerCase().includes('bengaluru') || text.toLowerCase().includes('indiranagar')) {
        aiReply = `Indiranagar & Sadashivnagar offer top-tier tech penthouses with 14.5% 3-yr rental yield. Let me prepare your personalized dossier.`;
      }
      setTranscript((prev) => [...prev, { sender: 'ai' as const, text: aiReply }]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl text-white overflow-hidden animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full h-full max-w-7xl mx-auto my-0 sm:my-6 sm:h-[90vh] sm:rounded-3xl border border-slate-800 bg-[#0d0d0d] shadow-2xl overflow-hidden">
        
        {/* TOP CONTROL NAVIGATION BAR */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#121212]/90 backdrop-blur-md shrink-0">
          {/* Back Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-300 hover:text-white uppercase transition-colors group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 group-hover:border-slate-500">
              <ArrowLeft className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
            </div>
            <span>Back</span>
          </button>

          {/* STEP TABS SWITCHER (Welcome | Calling | On call | After call) */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-slate-800 text-[11px] font-medium">
            <button
              onClick={() => setStep('welcome')}
              className={`px-3 py-1 rounded-full transition-all ${
                step === 'welcome'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Welcome
            </button>
            <button
              onClick={() => setStep('calling')}
              className={`px-3 py-1 rounded-full transition-all ${
                step === 'calling'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Calling
            </button>
            <button
              onClick={() => setStep('on_call')}
              className={`px-3 py-1 rounded-full transition-all ${
                step === 'on_call'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              On call
            </button>
            <button
              onClick={() => setStep('after_call')}
              className={`px-3 py-1 rounded-full transition-all ${
                step === 'after_call'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              After call
            </button>
          </div>

          {/* CITY & STATUS INDICATOR */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-amber-400/90 font-bold border border-amber-500/30 px-2.5 py-1 rounded-full bg-amber-500/10">
              {selectedCity}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Voice Advisor</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest hidden md:inline">
                Available Now
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SPLIT SCREEN BODY CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* LEFT COLUMN: AMBIENT LUXURY WINDOW VIEW */}
          <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-8 sm:p-12 overflow-hidden border-r border-slate-800/80">
            {/* Background Image Layer */}
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-90 transition-all duration-700 hover:scale-105"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85")',
              }}
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

            {/* Top Tag */}
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-300/90 bg-black/60 px-3 py-1.5 rounded-full border border-amber-400/30 backdrop-blur-md">
                EstateFlow Private Concierge
              </span>
            </div>

            {/* Bottom Statement */}
            <div className="relative z-10 space-y-4 max-w-md">
              <span className="text-[11px] font-extrabold tracking-[0.25em] text-amber-400 uppercase">
                A Different Way to Find a Home
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                No forms. No endless scrolling. Just a conversation about how you want to live.
              </h2>

              {/* Progress dashes */}
              <div className="flex items-center gap-1.5 pt-4">
                <div className="h-0.5 w-8 bg-amber-400 rounded-full" />
                <div className="h-0.5 w-3 bg-slate-600 rounded-full" />
                <div className="h-0.5 w-3 bg-slate-600 rounded-full" />
                <div className="h-0.5 w-3 bg-slate-600 rounded-full" />
                <div className="h-0.5 w-3 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VOICE ADVISOR COCKPIT & FLOW STATES */}
          <div className="lg:col-span-7 bg-[#111111] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto relative">
            
            {/* 1. WELCOME STEP */}
            {step === 'welcome' && (
              <div className="flex flex-col justify-between h-full space-y-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Advisor Avatar Profile Box */}
                <div className="flex items-start gap-6 pt-2">
                  <div className="relative shrink-0">
                    <div className="w-28 h-40 sm:w-36 sm:h-48 rounded-t-full border border-amber-400/40 overflow-hidden relative shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                        alt="Ava - AI Voice Advisor"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                    {/* AI Advisor Gold Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-sm shadow-lg">
                      AI ADVISOR
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <h3 className="font-serif text-4xl sm:text-5xl font-light text-slate-100 italic">
                      Ava
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">
                      Your personal luxury home advisor
                    </p>
                    <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Ready when you are
                    </p>
                  </div>
                </div>

                {/* Main Headline Prompt */}
                <div className="space-y-4 my-auto py-6">
                  <h1 className="font-serif text-3xl sm:text-5xl text-slate-100 font-light leading-tight">
                    Tell me about the home you <br />
                    <span className="italic text-amber-400 font-normal">have in mind.</span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-lg">
                    Speak naturally, the way you would with a friend. I&apos;ll listen, ask the right questions, and find homes that suit you in {selectedCity}.
                  </p>
                </div>

                {/* Start Conversation CTA Button */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setStep('calling')}
                    className="w-full bg-[#d4af37] hover:bg-[#c29f2e] text-slate-950 font-black text-xs uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-between transition-all shadow-xl hover:shadow-amber-500/10 active:scale-[0.99] group"
                  >
                    <span>Start the conversation</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                    <span>Free • No sign-up</span>
                    <span>About three minutes</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CALLING / CONNECTING STEP */}
            {step === 'calling' && (
              <div className="flex flex-col items-center justify-center h-full my-auto text-center space-y-8 animate-in fade-in duration-300">
                <div className="relative">
                  {/* Pulsing Ripple Rings */}
                  <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                  <div className="absolute -inset-4 rounded-full bg-amber-400/10 animate-pulse" />
                  
                  <div className="w-32 h-32 rounded-full border-2 border-amber-400/60 overflow-hidden relative z-10 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                      alt="Ava"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-light text-white italic">
                    Connecting to Ava...
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Establishing Private Audio Stream ({selectedCity})
                  </p>
                </div>

                {/* Audio Wave Visualizer Simulation */}
                <div className="flex items-center gap-1.5 h-10">
                  <span className="w-1 bg-amber-400 rounded-full h-4 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 bg-amber-400 rounded-full h-8 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 bg-amber-400 rounded-full h-6 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="w-1 bg-amber-400 rounded-full h-10 animate-bounce" style={{ animationDelay: '450ms' }} />
                  <span className="w-1 bg-amber-400 rounded-full h-5 animate-bounce" style={{ animationDelay: '600ms' }} />
                </div>
              </div>
            )}

            {/* 3. ON CALL VOICE CONVERSATION STEP */}
            {step === 'on_call' && (
              <div className="flex flex-col justify-between h-full space-y-6 animate-in fade-in duration-300">
                {/* Top Call Info Bar */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/60 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-amber-400/50 overflow-hidden shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                        alt="Ava"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-serif italic">Ava (AI Advisor)</h4>
                      <p className="text-[10px] text-emerald-400 font-mono font-semibold">● LIVE ENCRYPTED VOICE LINE</p>
                    </div>
                  </div>

                  <div className="font-mono text-sm text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {formatTime(callDuration)}
                  </div>
                </div>

                {/* Live Speech Transcript Messages Box */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-black/40 border border-slate-800/80 max-h-[360px]">
                  {transcript.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1 px-1">
                        {msg.sender === 'user' ? 'You' : 'Ava'}
                      </span>
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-amber-500/20 text-amber-100 border border-amber-500/30 font-medium'
                            : 'bg-slate-900 text-slate-200 border border-slate-800 font-normal'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Voice Prompt Suggestions */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">
                    Or Tap a Sample Voice Query:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Show 4 BHK luxury villas in Jubilee Hills',
                      'Looking for 3 BHK penthouses with high CAGR rental yield',
                      'What are top builder launches in Kokapet Neopolis?',
                    ].map((sample, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(sample)}
                        className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-slate-800 transition-all font-medium text-left"
                      >
                        💬 &quot;{sample}&quot;
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voice Input & Call Controls */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Speak or type your requirement..."
                      className="flex-1 bg-black/80 rounded-xl px-4 py-3 text-xs text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder:text-slate-600 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-4 py-3 rounded-xl transition-all"
                    >
                      Speak
                    </button>
                  </div>

                  {/* Audio Controls (Mute / End Call) */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all ${
                        isMuted
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                      <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('after_call')}
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg transition-all"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>End Call & Review Match</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. AFTER CALL SUMMARY & PROPERTY RECOMMENDATIONS STEP */}
            {step === 'after_call' && (
              <div className="flex flex-col justify-between h-full space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>AI Dossier Prepared ({selectedCity})</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-slate-100">
                    Ava&apos;s Curated Property Matches
                  </h3>
                  <p className="text-xs text-slate-400">
                    Based on your voice requirements, here are 2 high-priority verified listings matched with direct developer pricing:
                  </p>
                </div>

                {/* Property Match Cards */}
                <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
                  {[
                    {
                      title: selectedCity === 'Hyderabad' ? 'The Crown Jewel Sky Penthouse' : 'Indiranagar Imperial Ridge 4 BHK',
                      location: selectedCity === 'Hyderabad' ? 'Jubilee Hills, Hyderabad' : 'Indiranagar, Bengaluru',
                      price: '₹7.50 Cr',
                      bhk: '4 BHK • 4,800 Sq.Ft',
                      tag: '99.4% TS-RERA Verified',
                      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
                    },
                    {
                      title: selectedCity === 'Hyderabad' ? 'Neopolis Signature Villa' : 'Sadashivnagar Golf Estate',
                      location: selectedCity === 'Hyderabad' ? 'Kokapet Neopolis, Hyderabad' : 'Sadashivnagar, Bengaluru',
                      price: '₹5.80 Cr',
                      bhk: '3 BHK • 3,400 Sq.Ft',
                      tag: 'Direct Builder Pricing',
                      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 hover:border-amber-400/40 transition-all flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
                        />
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider">
                            {item.tag}
                          </span>
                          <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{item.location}</span>
                          </p>
                          <p className="text-[11px] font-extrabold text-emerald-400">
                            {item.price} • <span className="text-slate-400 font-normal">{item.bhk}</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white border border-slate-700 shrink-0 flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('welcome')}
                    className="text-xs font-bold text-slate-400 hover:text-white"
                  >
                    ← Start New Voice Call
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-[#d4af37] hover:bg-[#c29f2e] text-slate-950 font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all"
                  >
                    Done & Explore Properties
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
