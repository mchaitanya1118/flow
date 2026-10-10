'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  Building2,
  ArrowRight,
  X,
  Play,
  RotateCcw,
} from 'lucide-react';

interface VoiceAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity?: string;
}

export const VoiceAdvisorModal: React.FC<VoiceAdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedCity = 'Hyderabad',
}) => {
  const [callStage, setCallStage] = useState<'welcome' | 'calling' | 'on_call' | 'after_call'>('welcome');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([]);
  const [waveHeights, setWaveHeights] = useState<number[]>([30, 60, 45, 80, 55, 90, 40, 70, 35, 65, 50, 75]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Call duration counter & audio wave animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let waveTimer: NodeJS.Timeout;

    if (callStage === 'on_call') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      waveTimer = setInterval(() => {
        setWaveHeights([
          Math.floor(20 + Math.random() * 70),
          Math.floor(30 + Math.random() * 60),
          Math.floor(15 + Math.random() * 80),
          Math.floor(40 + Math.random() * 55),
          Math.floor(25 + Math.random() * 75),
          Math.floor(35 + Math.random() * 65),
          Math.floor(20 + Math.random() * 80),
          Math.floor(45 + Math.random() * 50),
          Math.floor(15 + Math.random() * 70),
          Math.floor(30 + Math.random() * 65),
          Math.floor(40 + Math.random() * 55),
          Math.floor(25 + Math.random() * 70),
        ]);
      }, 200);
    }

    return () => {
      clearInterval(timer);
      clearInterval(waveTimer);
    };
  }, [callStage]);

  // Auto transition from calling to on_call
  useEffect(() => {
    if (callStage === 'calling') {
      const timer = setTimeout(() => {
        setCallStage('on_call');
        setCallDuration(0);
        setTranscript([
          {
            sender: 'ai',
            text: `Hello! I'm Ava, your personal home advisor at EstateFlow ${selectedCity}. How can I assist your property search today?`,
          },
        ]);

        // Simulate user speaking after 4 seconds
        setTimeout(() => {
          setTranscript((prev) => [
            ...prev,
            {
              sender: 'user',
              text: `Hi Ava! I am looking for a 3 BHK luxury penthouse in ${selectedCity === 'Hyderabad' ? 'Kokapet Neopolis' : 'Indiranagar'} with sunset views under ₹3.5 Crore.`,
            },
          ]);

          // Simulate AI response after 7 seconds
          setTimeout(() => {
            setTranscript((prev) => [
              ...prev,
              {
                sender: 'ai',
                text: `Excellent choice. In ${selectedCity === 'Hyderabad' ? 'Kokapet' : 'Indiranagar'}, we have 2 high-floor sky villas with 270° views matching your budget. Let me curate them for you right now.`,
              },
            ]);
          }, 3000);
        }, 3000);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [callStage, selectedCity]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setCallStage('calling');
  };

  const endCall = () => {
    setCallStage('after_call');
  };

  const resetCall = () => {
    setCallStage('welcome');
    setCallDuration(0);
    setTranscript([]);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 lg:p-6 text-white font-sans animate-in fade-in zoom-in-95 duration-200">
      {/* Main Luxury Modal Card */}
      <div className="max-w-6xl w-full h-[92vh] max-h-[800px] bg-[#141311] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#2a2622] shadow-2xl flex flex-col lg:flex-row relative">
        
        {/* CLOSE BUTTON (TOP RIGHT) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 p-2.5 rounded-full border border-white/10 transition-colors"
          aria-label="Close Voice Advisor"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: ARCHITECTURAL SUNSET VIEW & STAGE NAVIGATION */}
        <div className="lg:w-1/2 relative bg-slate-900 flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#2a2622]">
          {/* Sunset Glass Architecture Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45 transform scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')`,
            }}
          />
          {/* Subtle Warm Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-[#141311]/40 to-[#141311]/80 z-0" />

          {/* TOP BAR: BACK BUTTON, STAGE PILL & CITY */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/20 hover:bg-black/40 text-slate-200 hover:text-white text-xs font-medium tracking-wider uppercase transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>

            {/* STAGE SELECTOR PILL TABS */}
            <div className="bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/15 flex items-center gap-1 text-[11px] font-mono">
              <button
                onClick={() => setCallStage('welcome')}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  callStage === 'welcome'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Welcome
              </button>
              <button
                onClick={() => setCallStage('calling')}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  callStage === 'calling'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Calling
              </button>
              <button
                onClick={() => setCallStage('on_call')}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  callStage === 'on_call'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                On call
              </button>
              <button
                onClick={() => setCallStage('after_call')}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  callStage === 'after_call'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                After call
              </button>
            </div>

            {/* CITY BADGE */}
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#d9b884] uppercase font-bold hidden sm:inline">
              {selectedCity}
            </span>
          </div>

          {/* BOTTOM LEFT SERIF TYPOGRAPHY & STEPPER */}
          <div className="relative z-10 space-y-4 pt-16 lg:pt-0">
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#d9b884] uppercase font-bold block">
              A DIFFERENT WAY TO FIND A HOME
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-100 font-light leading-snug tracking-tight">
              No forms. No endless scrolling. Just a conversation about how you want to live.
            </h2>
            
            {/* Stepper Dots/Lines */}
            <div className="flex items-center gap-2 pt-2">
              <div className="h-0.5 w-8 bg-[#d9b884]" />
              <div className="h-0.5 w-4 bg-white/30" />
              <div className="h-0.5 w-4 bg-white/30" />
              <div className="h-0.5 w-4 bg-white/30" />
              <div className="h-0.5 w-4 bg-white/30" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: VOICE ADVISOR COCKPIT */}
        <div className="lg:w-1/2 bg-[#161513] p-6 sm:p-8 lg:p-12 flex flex-col justify-between overflow-y-auto">
          {/* TOP BAR: VOICE ADVISOR & STATUS BADGE */}
          <div className="flex items-center justify-between pb-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 font-bold">
              VOICE ADVISOR
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-[10px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AVAILABLE NOW</span>
            </div>
          </div>

          {/* DYNAMIC CONTENT BASED ON CALL STAGE */}
          <div className="my-auto space-y-6 sm:space-y-8 py-4">
            {/* PROFILE AVATAR CARD */}
            <div className="flex items-center gap-5">
              {/* Arch Window Frame with Photo */}
              <div className="relative shrink-0">
                <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-t-full overflow-hidden border-2 border-[#c4a572]/50 bg-slate-900 shadow-xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                    alt="Ava AI Advisor"
                    className="w-full h-full object-cover object-top filter contrast-105"
                  />
                  {/* Overlay arch glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                {/* Gold AI ADVISOR Tag */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#d9b884] text-slate-950 text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-sm shadow-md whitespace-nowrap">
                  AI ADVISOR
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-1">
                <h3 className="font-serif text-3xl sm:text-4xl text-slate-100 italic font-normal">
                  Ava
                </h3>
                <p className="text-xs text-slate-400 font-sans">Your personal home advisor</p>
                <p className="text-xs text-[#d9b884] font-mono mt-1 flex items-center gap-1.5">
                  {callStage === 'welcome' && <span>Ready when you are</span>}
                  {callStage === 'calling' && <span className="animate-pulse">Connecting...</span>}
                  {callStage === 'on_call' && <span className="text-emerald-400 font-bold">● Active Call ({formatTime(callDuration)})</span>}
                  {callStage === 'after_call' && <span>Call Summary Ready</span>}
                </p>
              </div>
            </div>

            {/* STAGE 1: WELCOME INTRO */}
            {callStage === 'welcome' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-100 font-normal leading-[1.15]">
                  Tell me about the home you{' '}
                  <span className="italic text-[#d9b884] font-serif">have in mind.</span>
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed max-w-md">
                  Speak naturally, the way you would with a friend. I&apos;ll listen, ask the right questions, and find homes that suit you.
                </p>

                <button
                  type="button"
                  onClick={startCall}
                  className="w-full bg-[#d9b884] hover:bg-[#e6c994] text-[#1c1917] font-sans font-extrabold text-xs sm:text-sm tracking-widest uppercase py-4 px-8 rounded-none transition-all flex items-center justify-between shadow-xl shadow-[#d9b884]/10 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>START THE CONVERSATION</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}

            {/* STAGE 2: CALLING / RINGING */}
            {callStage === 'calling' && (
              <div className="space-y-6 text-center py-6 animate-in fade-in duration-300">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#d9b884]/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-[#d9b884]/40 animate-pulse" />
                  <div className="relative w-16 h-16 rounded-full bg-[#d9b884] flex items-center justify-center text-slate-950 shadow-2xl">
                    <Phone className="w-8 h-8 animate-bounce" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-2xl text-slate-100 italic">Calling Ava...</h2>
                  <p className="text-xs text-slate-400 font-mono">Securing encrypted audio stream to EstateFlow AI Desk</p>
                </div>

                <button
                  type="button"
                  onClick={resetCall}
                  className="px-6 py-2.5 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold hover:bg-rose-900 transition-colors"
                >
                  Cancel Call
                </button>
              </div>
            )}

            {/* STAGE 3: ON CALL INTERACTIVE VOICE STREAM */}
            {callStage === 'on_call' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Audio Frequency Waveform Visualizer */}
                <div className="p-4 rounded-2xl bg-black/40 border border-[#2a2622] space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                      <Volume2 className="w-4 h-4 animate-pulse" /> Audio Stream Live
                    </span>
                    <span className="font-mono text-slate-300 font-bold">{formatTime(callDuration)}</span>
                  </div>

                  {/* Animated Wave Bars */}
                  <div className="flex items-center justify-center gap-1.5 h-16 pt-2">
                    {waveHeights.map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-[#c4a572] to-[#f0d8a8] rounded-full transition-all duration-150 ease-in-out"
                        style={{ height: `${isMuted ? 6 : h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Real-time Voice Transcript Feed */}
                <div className="p-4 rounded-2xl bg-[#1c1a17] border border-[#2a2622] max-h-48 overflow-y-auto space-y-3 text-xs font-sans">
                  {transcript.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] ${
                          msg.sender === 'user'
                            ? 'bg-[#d9b884] text-slate-950 font-semibold rounded-tr-none'
                            : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call Control Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className={`flex-1 py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      isMuted
                        ? 'bg-amber-950/80 border-amber-700 text-amber-300'
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                    <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={endCall}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition-all"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>End Call</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: AFTER CALL SUMMARY & PROPERTY RECOMMENDATIONS */}
            {callStage === 'after_call' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Call Complete — AI Curation Ready</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Based on your 3 BHK luxury penthouses preference in {selectedCity}, Ava matched 3 verified properties matching your budget and sunset view requirements.
                  </p>
                </div>

                {/* Matched Properties Chips */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Curated Property Matches ({selectedCity}):
                  </span>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#d9b884]" />
                      <span>Sky Residence Penthouse 401</span>
                    </div>
                    <span className="text-[#d9b884] font-black">₹3.45 Cr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#d9b884]" />
                      <span>The Horizon Neopolis Suite</span>
                    </div>
                    <span className="text-[#d9b884] font-black">₹2.95 Cr</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={resetCall}
                    className="flex-1 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-[#d9b884]" />
                    <span>Restart Call</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3.5 rounded-xl bg-[#d9b884] hover:bg-[#e6c994] text-[#1c1917] font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <span>View Matches</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER NOTE */}
          <div className="pt-4 border-t border-[#2a2622] text-center lg:text-left text-slate-500 text-[11px] font-sans">
            Free · No sign-up · About three minutes
          </div>
        </div>
      </div>
    </div>
  );
};
