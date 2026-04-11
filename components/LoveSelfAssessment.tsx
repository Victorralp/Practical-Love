import { useState, useEffect, useRef } from 'react';

const QUESTIONS = [
  { id: 'patience', trait: 'Patience', question: 'When someone frustrates you, how often do you respond with calm instead of irritation?', verse: 'Proverbs 15:18' },
  { id: 'kindness', trait: 'Kindness', question: 'How intentional are you about doing something warm for someone who cannot repay you?', verse: 'Ephesians 4:32' },
  { id: 'envy', trait: 'Contentment', question: 'When others succeed or receive blessings, how genuinely do you celebrate with them?', verse: 'Philippians 4:11-12' },
  { id: 'humility', trait: 'Humility', question: 'How willing are you to admit you are wrong — even when it costs you dignity?', verse: 'Philippians 2:3' },
  { id: 'rudeness', trait: 'Courtesy', question: 'How consistently do you speak with respect, even when you disagree or feel disrespected?', verse: 'Colossians 4:6' },
  { id: 'selflessness', trait: 'Sacrifice', question: 'How often do you put someone else\'s needs above your own comfort?', verse: 'John 15:13' },
  { id: 'anger', trait: 'Self-Control', question: 'When provoked, how quickly can you choose restraint over retaliation?', verse: 'James 1:19-20' },
  { id: 'forgiveness', trait: 'Forgiveness', question: 'How fully do you release past offenses instead of keeping a record?', verse: 'Matthew 6:14-15' },
  { id: 'truth', trait: 'Truthfulness', question: 'How committed are you to honesty — even when the truth is uncomfortable?', verse: 'Ephesians 4:15' },
  { id: 'protection', trait: 'Protection', question: 'How actively do you shield the people you love from harm, slander, and discouragement?', verse: 'Proverbs 31:8-9' },
  { id: 'hope', trait: 'Hope', question: 'When things feel hopeless, how well do you hold onto faith that God is still working?', verse: 'Romans 15:13' },
  { id: 'endurance', trait: 'Endurance', question: 'When love gets difficult, how long do you keep showing up without giving up?', verse: 'Galatians 6:9' },
] as const;

const LABELS = ['Rarely', 'Sometimes', 'Often', 'Usually', 'Always'];

function getProfileSummary(scores: Record<string, number>) {
  const entries = Object.entries(scores);
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];
  const average = Math.round(entries.reduce((sum, [, v]) => sum + v, 0) / entries.length);

  const question = QUESTIONS.find(q => q.id === weakest[0]);

  return {
    strongest: QUESTIONS.find(q => q.id === strongest[0])?.trait ?? strongest[0],
    weakest: question?.trait ?? weakest[0],
    weakestVerse: question?.verse ?? '',
    average,
    level:
      average >= 4 ? 'Your love is maturing beautifully. Keep pressing forward.'
        : average >= 3 ? 'You are growing well. Focus on the edges that still need attention.'
          : average >= 2 ? 'There is real potential here. Consistency will unlock it.'
            : 'This is the honest beginning. Grace meets you here.',
  };
}

export default function LoveSelfAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleScore = (value: number) => {
    const q = QUESTIONS[currentQuestion];
    setScores(prev => ({ ...prev, [q.id]: value }));

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const resetAssessment = () => {
    setScores({});
    setCurrentQuestion(0);
    setIsComplete(false);
  };

  const profile = isComplete ? getProfileSummary(scores) : null;
  const progress = Math.round(((currentQuestion + (isComplete ? 1 : 0)) / QUESTIONS.length) * 100);

  return (
    <section
      ref={sectionRef}
      id="love-self-assessment"
      className="rounded-[2rem] border border-[rgba(176,111,74,0.12)] bg-white/95 p-6 shadow-lg md:p-8"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b76840]">
        Love self-assessment
      </p>
      <h2 className="mt-3 font-serif text-3xl text-[#3e1e17]">
        How well do you practice love?
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#6b4332]">
        Answer 12 honest questions. No one sees this but you. At the end, you'll see where your love is strong — and where it needs to grow.
      </p>

      {/* Progress bar */}
      <div className="mt-6 h-2 rounded-full bg-[#f3dfcb]">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-[#c17249] to-[#912018] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-[#8d5339]">
        {isComplete ? 'Assessment complete' : `Question ${currentQuestion + 1} of ${QUESTIONS.length}`}
      </p>

      {!isComplete ? (
        <div className="mt-8">
          {/* Question */}
          <div
            key={currentQuestion}
            className="love-assessment-question"
            style={{
              animation: 'fadeSlideIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-[#f3dfcb] px-3 py-1 text-xs font-semibold text-[#9d4b2a]">
                {QUESTIONS[currentQuestion].trait}
              </span>
              <span className="text-xs text-[#8d5339]">
                {QUESTIONS[currentQuestion].verse}
              </span>
            </div>
            <p className="font-serif text-xl leading-relaxed text-[#3e1e17] md:text-2xl">
              {QUESTIONS[currentQuestion].question}
            </p>

            {/* Score buttons */}
            <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-3">
              {LABELS.map((label, index) => (
                <button
                  key={label}
                  onClick={() => handleScore(index + 1)}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-[rgba(176,111,74,0.12)] bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c17249]/30 hover:shadow-md sm:p-4"
                >
                  <span className="text-xl font-bold text-[#3e1e17] transition-colors group-hover:text-[#912018] sm:text-2xl">
                    {index + 1}
                  </span>
                  <span className="text-[10px] font-medium text-[#8d5339] sm:text-xs">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : profile ? (
        <div
          className="mt-8 space-y-6"
          style={{ animation: 'fadeSlideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
        >
          {/* Result */}
          <div className="rounded-[1.75rem] border border-[rgba(176,111,74,0.15)] bg-[linear-gradient(135deg,_rgba(255,248,240,0.95)_0%,_rgba(255,243,231,0.95)_100%)] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b76840]">
              Your love profile
            </p>
            <p className="mt-4 font-serif text-2xl leading-relaxed text-[#3e1e17] md:text-3xl">
              {profile.level}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[rgba(176,111,74,0.12)] bg-white/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                  Your strength
                </p>
                <p className="mt-2 font-serif text-2xl text-[#3e1e17]">{profile.strongest}</p>
                <p className="mt-2 text-sm leading-6 text-[#6b4332]">
                  This is where your love shines brightest. Keep nurturing it.
                </p>
              </div>
              <div className="rounded-2xl border border-[rgba(176,111,74,0.12)] bg-white/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#912018]">
                  Your growth edge
                </p>
                <p className="mt-2 font-serif text-2xl text-[#3e1e17]">{profile.weakest}</p>
                <p className="mt-2 text-sm leading-6 text-[#6b4332]">
                  Start here. Read <strong>{profile.weakestVerse}</strong> and practice this trait for 7 days.
                </p>
              </div>
            </div>
          </div>

          {/* Score grid */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {QUESTIONS.map(q => {
              const score = scores[q.id] ?? 0;
              const intensity = score / 5;
              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-[rgba(176,111,74,0.1)] p-3 text-center"
                  style={{
                    backgroundColor: `rgba(193, 114, 73, ${intensity * 0.15})`,
                  }}
                >
                  <p className="text-xs font-medium text-[#8d5339]">{q.trait}</p>
                  <p className="mt-1 text-lg font-bold text-[#3e1e17]">{score}/5</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={resetAssessment}
              className="rounded-full border border-[#c17249]/20 px-6 py-3 text-sm font-semibold text-[#c17249] transition-all hover:bg-[#c17249]/5"
            >
              Take the assessment again
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
