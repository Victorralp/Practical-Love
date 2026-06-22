import { useEffect, useRef, useState } from 'react';
import { Heart, Send, Sparkles, PenTool, RefreshCw } from 'lucide-react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function LoveLetterToYou() {
  const [name, setName] = useState('');
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [responseSent, setResponseSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const sectionRef = useRef<HTMLElement | null>(null);

  // Generate floating sparkles when envelope opens
  useEffect(() => {
    if (envelopeOpened) {
      const newSparkles = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage width
        y: 80 + Math.random() * 20, // start near bottom
        size: Math.random() * 6 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 3,
      }));
      setSparkles(newSparkles);
    }
  }, [envelopeOpened]);

  // Define the personalized letter lines
  const letterLines = [
    { text: `My beloved ${name.trim() || 'child'},`, delay: 0, className: 'text-4xl md:text-5xl font-semibold text-[#661214]' },
    { text: '', delay: 600, className: '' },
    {
      text: 'Before I formed you in the womb, I knew you.',
      delay: 900,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'Before you took your very first breath, I had already chosen you.',
      delay: 1700,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'Before the world had a chance to label you, or decide what you were worth...',
      delay: 2500,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'I had already decided — you are precious, you are honored, and you are Mine.',
      delay: 3300,
      className: 'text-2xl md:text-3xl font-semibold text-[#801a1d]',
    },
    { text: '', delay: 3900, className: '' },
    {
      text: 'I have watched over every single step of your journey.',
      delay: 4300,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'I saw you in those quiet nights when you felt completely alone and wept in the dark.',
      delay: 5100,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'I witnessed your silent struggles, the times you were misunderstood, and the wounds you carry inside.',
      delay: 5900,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'None of your pain has escaped My sight. I have counted every tear, and I hold them dear.',
      delay: 6700,
      className: 'text-2xl md:text-3xl font-medium',
    },
    { text: '', delay: 7300, className: '' },
    {
      text: 'You have spent so much strength trying to prove yourself, trying to earn love, searching in dry places that left you empty.',
      delay: 7700,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'But My love for you is not a transaction. You do not have to perform for Me, and you do not have to be perfect to receive Me.',
      delay: 8700,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'I do not love a future, flawless version of you.',
      delay: 9700,
      className: 'text-2xl md:text-3xl font-semibold',
    },
    {
      text: 'I love you right now. In the middle of your doubts, your questions, your mistakes, and your weariness.',
      delay: 10500,
      className: 'text-2xl md:text-3xl font-semibold text-[#801a1d]',
    },
    { text: '', delay: 11100, className: '' },
    {
      text: 'I did not send love as a distant theory to be studied.',
      delay: 11500,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'I sent it as a Person — My Son, Jesus — to bridge the gap and bring you close to My heart.',
      delay: 12300,
      className: 'text-2xl md:text-3xl',
    },
    {
      text: 'Nothing you have ever done, and nothing that has been done to you, can ever separate you from My love.',
      delay: 13100,
      className: 'text-2xl md:text-3xl',
    },
    { text: '', delay: 13700, className: '' },
    {
      text: 'Rest your tired heart. You are safe. You are home.',
      delay: 14100,
      className: 'text-3xl md:text-4xl font-semibold text-[#661214]',
    },
    { text: '', delay: 14700, className: '' },
    {
      text: '— Your Heavenly Father',
      delay: 15300,
      className: 'text-3xl md:text-4xl font-semibold text-right block mt-8',
    },
  ];

  // Reveal lines sequentially when opened
  useEffect(() => {
    if (!envelopeOpened || visibleLines >= letterLines.length) {
      return;
    }

    const currentLine = letterLines[visibleLines];
    const prevDelay = visibleLines > 0 ? letterLines[visibleLines - 1].delay : 0;
    const wait = currentLine.delay - prevDelay;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, Math.max(wait, 150));

    return () => clearTimeout(timer);
  }, [envelopeOpened, visibleLines]);

  const handleOpenEnvelope = () => {
    setSealCracked(true);
    setTimeout(() => {
      setEnvelopeOpened(true);
    }, 800);
  };

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseText.trim()) return;

    setIsSending(true);
    // Simulate sending prayer response with sparkles
    setTimeout(() => {
      setIsSending(false);
      setResponseSent(true);
    }, 2000);
  };

  const handleReset = () => {
    setEnvelopeOpened(false);
    setSealCracked(false);
    setVisibleLines(0);
    setResponseText('');
    setResponseSent(false);
    setShowResponse(false);
  };

  return (
    <section
      ref={sectionRef}
      id="love-letter"
      style={{ transitionDuration: '2000ms' }}
      className={`relative min-h-screen overflow-hidden px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-all ease-in-out ${
        envelopeOpened ? 'bg-[#fcfaf7]' : 'bg-[#150a08]'
      }`}
    >
      {/* Background candlelit glow when envelope is closed */}
      {!envelopeOpened && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2b1511_0%,_#0c0403_100%)] animate-candle" />
      )}

      {/* Background parchment texture when letter is open */}
      {envelopeOpened && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,248,240,0.6)_0%,_rgba(246,234,219,0.7)_50%,_rgba(240,224,204,0.8)_100%)] opacity-80" />
      )}

      {/* Decorative floating sparkle particles when letter is open */}
      {envelopeOpened && sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle-particle animate-float"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            position: 'absolute',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fcd34d 0%, rgba(252, 211, 77, 0) 70%)',
            pointerEvents: 'none',
            animation: `float-particle ${sparkle.duration}s linear infinite`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}

      {/* Interactive Container */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center z-10">
        
        {/* ENVELOPE STATE: Closed & Sealed */}
        {!envelopeOpened && (
          <div className="w-full max-w-lg perspective-1000">
            {/* Ambient Candle light above the envelope */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(255,186,115,0.15)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative bg-[#2e1713] border-4 border-[#3e201b] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.7),_inset_0_1px_2px_rgba(255,255,255,0.15)] p-8 sm:p-12 transition-all duration-700 flex flex-col items-center">
              
              {/* Envelope flap visual lines */}
              <div className="absolute inset-x-0 top-0 h-4 border-b border-[#4d2922]/30 bg-gradient-to-b from-[#381c18] to-[#2e1713] rounded-t-xl" />
              
              {/* Antique address card in center of envelope */}
              <div className="w-full bg-[#fbf6ef] border-2 border-double border-[#d0b49f] rounded-lg p-6 sm:p-8 shadow-[inset_0_0_20px_rgba(139,92,26,0.05)] text-center flex flex-col justify-between items-center min-h-[220px]">
                <div>
                  <div className="h-px w-12 bg-[#b89876]/40 mx-auto mb-3" />
                  <p className="font-serif text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b89876]">
                    A Letter Written Before Time
                  </p>
                  <div className="h-px w-12 bg-[#b89876]/40 mx-auto mt-3 mb-6" />
                </div>

                <div className="w-full space-y-2">
                  <label htmlFor="name-input" className="font-serif italic text-sm text-[#8c6b54] tracking-wider block">
                    Write your name to personalize the letter...
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Thy Beloved Child"
                    maxLength={30}
                    className="w-full bg-transparent border-b border-[#c1a287] focus:border-[#8c6b54] text-center font-handwriting text-3xl text-[#4a2b21] focus:outline-none placeholder-[#c1a287]/50 transition-colors py-1.5"
                  />
                </div>

                <p className="text-[11px] text-[#b89876] italic font-serif mt-4">
                  Open by pressing the wax seal below.
                </p>
              </div>

              {/* Wax Seal Stamp Button */}
              <div className="relative mt-8 -mb-16 z-20">
                <button
                  onClick={handleOpenEnvelope}
                  className={`wax-seal-btn w-20 h-20 rounded-full flex items-center justify-center text-[#ffdf9e] ${
                    sealCracked ? 'scale-90 opacity-80 rotate-12 transition-all duration-700' : ''
                  }`}
                  aria-label="Open Love Letter"
                >
                  {sealCracked ? (
                    <Sparkles className="w-8 h-8 animate-spin text-[#ffd369]" />
                  ) : (
                    <Heart className="w-9 h-9 fill-[#ff3b3f]/10 text-[#ffa62b] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-pulse" />
                  )}
                </button>
                
                {/* Wax seal label indicator */}
                {!sealCracked && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-24 whitespace-nowrap text-xs font-serif italic text-[#8c6b54] animate-bounce tracking-wide">
                    Press Seal
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LETTER STATE: Open & Readable */}
        {envelopeOpened && (
          <div className="w-full max-w-3xl flex flex-col items-center">
            
            {/* Reset / Rewrite option */}
            <button
              onClick={handleReset}
              className="mb-8 flex items-center gap-2 text-xs font-serif text-[#b89876] hover:text-[#8c6b54] border border-[#b89876]/30 hover:border-[#8c6b54]/50 rounded-full px-4 py-1.5 bg-white/40 backdrop-blur-sm shadow-sm transition-all self-end"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-open Envelope
            </button>

            {/* Parchment letter body */}
            <div className="deckled-border w-full rounded-3xl p-8 md:p-16 lg:p-20 shadow-[0_30px_90px_rgba(43,20,14,0.12)] border border-[#eaddcf]/60 relative text-left">
              
              {/* Gold corners */}
              <div className="gold-decor-corner top-4 left-4 border-t-2 border-l-2 border-[#d0b49f]/50 rounded-tl" />
              <div className="gold-decor-corner top-4 right-4 border-t-2 border-r-2 border-[#d0b49f]/50 rounded-tr" />
              <div className="gold-decor-corner bottom-4 left-4 border-b-2 border-l-2 border-[#d0b49f]/50 rounded-bl" />
              <div className="gold-decor-corner bottom-4 right-4 border-b-2 border-r-2 border-[#d0b49f]/50 rounded-br" />

              {/* Envelope seal shadow background detail */}
              <div className="absolute right-8 top-8 w-20 h-20 opacity-[0.03] border-4 border-dashed border-[#b89876] rounded-full flex items-center justify-center font-serif text-xs font-bold text-[#b89876] select-none">
                E T E R N A L
              </div>

              {/* Content area */}
              <div className="space-y-4 md:space-y-6">
                {letterLines.map((line, index) => {
                  const isVisible = index < visibleLines;

                  if (line.text === '') {
                    return (
                      <div
                        key={index}
                        className="h-4 md:h-6"
                        style={{ opacity: isVisible ? 1 : 0 }}
                      />
                    );
                  }

                  return (
                    <div
                      key={index}
                      className="overflow-hidden"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: '0.1s',
                      }}
                    >
                      <p
                        className={`font-handwriting leading-relaxed text-[#2b140e] tracking-wide ${line.className}`}
                      >
                        {line.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons: Write Response */}
              {visibleLines >= letterLines.length && !showResponse && !responseSent && (
                <div className="mt-16 flex flex-col items-center justify-center">
                  <div className="h-px w-24 bg-[#b89876]/30 mb-8" />
                  <button
                    onClick={() => setShowResponse(true)}
                    className="flex items-center gap-3 bg-gradient-to-r from-[#661214] to-[#801a1d] hover:from-[#801a1d] hover:to-[#a41315] text-[#fcfaf7] px-8 py-3.5 rounded-full font-serif text-sm tracking-wider uppercase shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <PenTool className="w-4 h-4 text-[#ffd369]" /> Write a response in prayer
                  </button>
                </div>
              )}

              {/* REPLY FORM: Interactive Letter Draft */}
              {showResponse && !responseSent && (
                <form
                  onSubmit={handleSendResponse}
                  className="mt-12 p-6 md:p-8 bg-white/40 border border-[#eaddcf] rounded-2xl shadow-inner space-y-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#f9f5ee]/40 backdrop-blur-sm pointer-events-none" />
                  
                  <div className="relative z-10 space-y-4">
                    <label className="font-serif italic text-sm text-[#8c6b54] tracking-wide block">
                      Write your reply, prayer, or reflection to Father:
                    </label>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="My Father, thank you for loving me. I come to you with my struggles..."
                      rows={5}
                      required
                      disabled={isSending}
                      className="w-full bg-[#fdfcf9]/80 border border-[#d0b49f]/60 focus:border-[#8c6b54] rounded-lg p-4 font-handwriting text-2xl text-[#2b140e] focus:outline-none placeholder-[#8c6b54]/40 shadow-inner resize-none transition-colors"
                    />
                    
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setShowResponse(false)}
                        className="text-xs font-serif text-[#8c6b54] hover:text-[#661214] transition-colors"
                        disabled={isSending}
                      >
                        Cancel
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSending || !responseText.trim()}
                        className="flex items-center gap-2 bg-[#661214] hover:bg-[#801a1d] disabled:bg-[#d0b49f]/50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-full font-serif text-xs uppercase tracking-wider shadow transition-all duration-300"
                      >
                        {isSending ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 animate-spin text-[#ffd369]" /> Releasing to Heaven...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> Release in Prayer
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* RESPONSE SENT: Comfort confirmation */}
              {responseSent && (
                <div className="mt-12 p-6 md:p-10 border border-dashed border-[#b89876]/40 rounded-2xl text-center space-y-4 bg-gradient-to-br from-[#faf6f0] to-[#fbfbf9]">
                  <div className="w-12 h-12 rounded-full bg-[#fcd34d]/20 mx-auto flex items-center justify-center text-[#d09e10]">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#661214]">
                    Your response has risen like incense.
                  </h4>
                  <p className="font-handwriting text-2xl text-[#2b140e] leading-relaxed max-w-lg mx-auto">
                    "I have heard your prayer. I have seen your heart. You are deeply loved, and you are never alone."
                  </p>
                  <p className="text-xs font-serif italic text-[#8c6b54] pt-2">
                    Take a deep breath and rest in this truth.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating animation definition */}
      <style>{`
        @keyframes float-particle {
          0% {
            transform: translateY(20vh) translateX(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80vh) translateX(50px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
