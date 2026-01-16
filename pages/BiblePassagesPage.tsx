import { useState } from 'react';
import { Heart, BookOpen, Filter, X } from 'lucide-react';

interface BiblePassage {
  reference: string;
  text: string;
  explanation: string;
  application: string;
  category: 'command' | 'example' | 'promise' | 'warning';
}

type CategoryFilter = 'all' | 'command' | 'example' | 'promise' | 'warning';

const categoryConfig = {
  command: { label: 'Command', icon: '📝', color: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-100', borderColor: 'border-blue-300' },
  example: { label: 'Example', icon: '💡', color: 'bg-purple-500', textColor: 'text-purple-600', bgLight: 'bg-purple-100', borderColor: 'border-purple-300' },
  promise: { label: 'Promise', icon: '✨', color: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-100', borderColor: 'border-green-300' },
  warning: { label: 'Warning', icon: '⚠️', color: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-100', borderColor: 'border-red-300' },
};

export default function BiblePassagesPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [selectedPassage, setSelectedPassage] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const openPopup = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const container = card.closest('.grid')?.parentElement;
    
    if (!container) return;
    
    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate position relative to the container
    const relativeTop = cardRect.top - containerRect.top + container.scrollTop;
    const relativeLeft = cardRect.right - containerRect.left + 10; // 10px gap to the right
    
    // Check if popup would overflow on the right
    const popupWidth = 340;
    
    let left = relativeLeft;
    let top = relativeTop;
    
    // If would overflow right, position to the left of the card
    if (cardRect.right + popupWidth + 10 > containerRect.right) {
      left = cardRect.left - containerRect.left - popupWidth - 10;
    }
    
    // If still would overflow left, position below the card
    if (left < 0) {
      left = cardRect.left - containerRect.left;
      top = relativeTop + cardRect.height + 10;
    }
    
    setPopupPosition({ top, left });
    setSelectedPassage(index);
  };

  const closePopup = () => {
    setSelectedPassage(null);
  };

  const passages: BiblePassage[] = [
    { reference: "Matthew 5:43-45", text: "You have heard that it was said, 'Love your neighbor and hate your enemy.' But I tell you, love your enemies and pray for those who persecute you, that you may be children of your Father in heaven.", explanation: "Love extends beyond friends to enemies.", application: "Pray for someone who has wronged you today.", category: "command" },
    { reference: "Matthew 19:19", text: "honor your father and mother,' and 'love your neighbor as yourself.'", explanation: "The summary of the commandments regarding others.", application: "Show honor to your parents and love to a neighbor.", category: "command" },
    { reference: "Matthew 22:37-39", text: "Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' This is the first and greatest commandment. And the second is like it: 'Love your neighbor as yourself.'", explanation: "The Great Commandment.", application: "Prioritize God first, then others.", category: "command" },
    { reference: "Mark 12:31-33", text: "The second is this: 'Love your neighbor as yourself.' There is no commandment greater than these... To love him with all your heart... and to love your neighbor as yourself is more important than all burnt offerings and sacrifices.", explanation: "Love is more important than religious ritual.", application: "Focus on love over ritual.", category: "command" },
    { reference: "Luke 6:27", text: "But to you who are listening I say: Love your enemies, do good to those who hate you.", explanation: "Active love towards opposition.", application: "Do one good deed for someone you dislike.", category: "command" },
    { reference: "Luke 6:32-35", text: "If you love those who love you, what credit is that to you? ... But love your enemies, do good to them, and lend to them without expecting to get anything back.", explanation: "When operating in love, no human being can stop your blessing and promotion under the sun.", application: "Give without expecting repayment.", category: "command" },
    { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", explanation: "The ultimate example of sacrificial love from God in heaven by giving the best of the best from heaven to those of us who do not deserve it.", application: "Believe and receive God's love.", category: "example" },
    { reference: "John 13:34-35", text: "A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.", explanation: "The mark of a true disciple is love.", application: "Love others as Jesus loved you.", category: "command" },
    { reference: "John 14:15", text: "If you love me, keep my commands.", explanation: "Obedience is thicker than blood.", application: "Obey God's word as an act of love.", category: "command" },
    { reference: "John 14:21-31", text: "Whoever has my commands and keeps them is the one who loves me... I love the Father and do exactly what my Father has commanded me.", explanation: "Love serves as the motivation for obedience.", application: "Let your love for God drive your actions.", category: "command" },
    { reference: "John 15:9-19", text: "As the Father has loved me, so have I loved you. Now remain in my love... My command is this: Love each other as I have loved you.", explanation: "Jesus is the only role model.", application: "Spend time in God's presence.", category: "command" },
    { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", explanation: "God's sovereignty works for lovers of God.", application: "Trust God's plan in difficult times.", category: "promise" },
    { reference: "Romans 8:35-39", text: "Who shall separate us from the love of Christ? ... For I am convinced that neither death nor life... nor anything else in all creation, will be able to separate us from the love of God.", explanation: "The security of God's love.", application: "Rest in the assurance of God's love.", category: "promise" },
    { reference: "Romans 12:9-10", text: "Love must be sincere. Hate what is evil; cling to what is good. Be devoted to one another in love. Honor one another above yourselves.", explanation: "Marks of a true Christian.", application: "Serve someone else before yourself.", category: "command" },
    { reference: "Romans 13:8", text: "Let no debt remain outstanding, except the continuing debt to love one another, for whoever loves others has fulfilled the law.", explanation: "Love is a perpetual obligation.", application: "Look for ways to pay your 'debt' of love.", category: "command" },
    { reference: "Romans 13:9", text: "The commandments... are summed up in this one rule: 'Love your neighbor as yourself.'", explanation: "Love fulfills the commandments.", application: "Treat your neighbor as you would want to be treated.", category: "command" },
    { reference: "Romans 13:10", text: "Love does no harm to a neighbor. Therefore love is the fulfillment of the law.", explanation: "Love is harmless and helpful.", application: "Ensure your actions harm no one.", category: "command" },
    { reference: "1 Corinthians 2:9", text: "However, as it is written: 'What no eye has seen, what no ear has heard, and what no human mind has conceived' — the things God has prepared for those who love him.", explanation: "Future glory for those who love God with present blessing and favour for those who operate in love.", application: "Hope in God's future promises.", category: "promise" },
    { reference: "1 Corinthians 13", text: "Love is patient, love is kind... It always protects, always trusts, always hopes, always perseveres. Love never fails.", explanation: "The definition and character of love.", application: "Practice one specific characteristic of love today.", category: "command" },
    { reference: "Galatians 5:6", text: "For in Christ Jesus neither circumcision nor uncircumcision has any value. The only thing that counts is faith expressing itself through love.", explanation: "Faith works through love.", application: "Let your faith be seen in your love.", category: "command" },
    { reference: "Galatians 5:13-22", text: "serve one another humbly in love... But the fruit of the Spirit is love, joy, peace...", explanation: "Freedom is for serving in love.", application: "Serve someone humbly today.", category: "command" },
    { reference: "Ephesians 4:2", text: "Be completely humble and gentle; be patient, bearing with one another in love.", explanation: "Unity requires loving patience.", application: "Be patient with a difficult person.", category: "command" },
    { reference: "Ephesians 4:15", text: "Instead, speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ.", explanation: "Truth and love must go together.", application: "Speak a hard truth with gentleness.", category: "command" },
    { reference: "Ephesians 5:2", text: "and walk in the way of love, just as Christ loved us and gave himself up for us as a fragrant offering and sacrifice to God.", explanation: "Imitate Christ's sacrificial walk.", application: "Sacrifice your preference for another.", category: "command" },
    { reference: "Ephesians 5:25", text: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.", explanation: "Sacrificial love in marriage does not depend on the wife's action — irrespective of their action.", application: "Husbands, do something special for your wives.", category: "command" },
    { reference: "Ephesians 5:28", text: "In this same way, husbands ought to love their wives as their own bodies. He who loves his wife loves himself.", explanation: "Caring for one's wife is self-care.", application: "Care for your spouse's needs.", category: "command" },
    { reference: "Ephesians 5:33", text: "However, each one of you also must love his wife as he loves himself, and the wife must respect her husband.", explanation: "Summary of marital duties.", application: "Love and respect in your marriage.", category: "command" },
    { reference: "Colossians 3:14", text: "And over all these virtues put on love, which binds them all together in perfect unity.", explanation: "Love is the binding virtue.", application: "Let love unify your other actions.", category: "command" },
    { reference: "1 Thessalonians 4:9", text: "Now about your love for one another we do not need to write to you, for you yourselves have been taught by God to love each other.", explanation: "God teaches us to love.", application: "Ask God to teach you how to love better.", category: "command" },
    { reference: "1 Timothy 1:5", text: "The goal of this command is love, which comes from a pure heart and a good conscience and a sincere faith.", explanation: "The purpose of instruction is love.", application: "Check your motives: are they loving?", category: "command" },
    { reference: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", explanation: "God's Spirit is not the spirit of fear — any spirit of fear is not a spirit of God.", application: "Rely on the Spirit's power to love.", category: "promise" },
    { reference: "Titus 2:4", text: "Then they can urge the younger women to love their husbands and children.", explanation: "Love is learned and taught.", application: "Mentor someone in loving their family.", category: "command" },
    { reference: "Philemon 1:5-10", text: "I hear about your love for all his holy people and your faith in the Lord Jesus... Your love has given me great joy and encouragement.", explanation: "Love refreshes others.", application: "Refresh someone with your love.", category: "example" },
    { reference: "Hebrews 10:24", text: "And let us consider how we may spur one another on toward love and good deeds.", explanation: "Encourage others to love.", application: "Encourage a friend to do good.", category: "command" },
    { reference: "Hebrews 13:1", text: "Keep on loving one another as brothers and sisters.", explanation: "Brotherly love should continue.", application: "Treat church members as family.", category: "command" },
    { reference: "James 2:8", text: "If you really keep the royal law found in Scripture, 'Love your neighbor as yourself,' you are doing right.", explanation: "The Royal Law.", application: "Fulfill the royal law today.", category: "command" },
    { reference: "1 Peter 1:8", text: "Though you have not seen him, you love him; and even though you do not see him now, you believe in him and are filled with an inexpressible and glorious joy.", explanation: "Loving the unseen Christ.", application: "Express your love to Jesus.", category: "promise" },
    { reference: "1 Peter 3:10", text: "For, 'Whoever would love life and see good days must keep their tongue from evil and their lips from deceitful speech.'", explanation: "Meaning and speaking the truth always.", application: "Speak only good today.", category: "command" },
    { reference: "1 Peter 4:8", text: "Above all, love each other deeply, because love covers over a multitude of sins.", explanation: "Love forgives and overlooks offenses.", application: "Forgive a repeat offense.", category: "command" },
    { reference: "1 John 3:14", text: "We know that we have passed from death to life, because we love each other. Anyone who does not love remains in death.", explanation: "Love is evidence of salvation.", application: "Examine your heart for love for believers.", category: "command" },
    { reference: "1 John 3:16-23", text: "This is how we know what love is: Jesus Christ laid down his life for us. And we ought to lay down our lives for our brothers and sisters... let us not love with words or speech but with actions and in truth.", explanation: "Love is practical action.", application: "Do a tangible act of love.", category: "command" },
    { reference: "1 John 4:7-9", text: "Dear friends, let us love one another, for love comes from God... This is how God showed his love among us: He sent his one and only Son into the world that we might live through him.", explanation: "God is the source of love.", application: "Connect with God to love others.", category: "command" },
    { reference: "1 John 4:20-21", text: "Whoever claims to love God yet hates a brother or sister is a liar... Anyone who loves God must also love their brother and sister.", explanation: "Loving God requires loving people.", application: "Mend a broken relationship.", category: "warning" },
    { reference: "2 John 1:5-6", text: "I am writing to remind you, dear friends, that we should love one another. This is not a new commandment, but one we have had from the beginning. Love means doing what God has commanded us.", explanation: "Love involves obedience.", application: "Walk in God's commandments.", category: "command" },
    { reference: "2 John 1:1-6", text: "(Same passage context - emphasize walking in truth and love)", explanation: "Truth and love.", application: "Be true and loving.", category: "command" },
    { reference: "3 John 1", text: "The elder, To my dear friend Gaius, whom I love in the truth.", explanation: "Personal affection in truth.", application: "Express affection to a friend.", category: "example" },
    { reference: "Jude 1:2", text: "Mercy, peace and love be yours in abundance.", explanation: "A blessing of love.", application: "Pray this blessing for someone.", category: "promise" },
    { reference: "Jude 1:21", text: "Keep yourselves in God's love as you wait for the mercy of our Lord Jesus Christ to bring you to eternal life.", explanation: "Remain in God's love.", application: "Stay close to God today.", category: "command" },
    { reference: "Revelation 2:4", text: "Yet I hold this against you: You have forsaken the love you had at first.", explanation: "Don't lose your first love.", application: "Return to your initial passion for Christ.", category: "warning" },
    { reference: "Revelation 3:19", text: "Those whom I love I rebuke and discipline. So be earnest and repent.", explanation: "Discipline is a sign of love.", application: "Accept correction as God's love.", category: "promise" }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-orange-100 to-red-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-14 h-14 text-red-600 mr-4 animate-pulse" />
            <BookOpen className="w-14 h-14 text-orange-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-red-800 mb-6">
            LOVE PASSAGES IN <span className="text-orange-600">NEW TESTAMENT</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Exploring the 50 foundational Biblical passages about love that guide our ministry and life.
            <br /><span className="text-sm font-semibold text-orange-600 mt-2 block">(Click on any reference to read the verse)</span>
          </p>
          <div className="bg-white border-l-8 border-green-500 rounded-xl p-8 max-w-3xl mx-auto shadow-md">
            <p className="text-2xl font-serif font-bold text-gray-800 mb-2">
              "For God so loved the world" <span className="text-base text-gray-500 font-sans">(John 3:16)</span>
            </p>
            <p className="text-gray-700 font-medium text-lg">
              This includes every human being on this planet — <span className="text-red-600 font-bold uppercase">NO EXCEPTION!</span>
            </p>
          </div>
        </div>

        {/* Category Legend and Filter */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-orange-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveFilter('all')}
                className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === 'all'
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({passages.length})
              </button>
              {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category) => {
                const config = categoryConfig[category];
                const count = passages.filter(p => p.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeFilter === category
                        ? `${config.color} text-white shadow-md`
                        : `${config.bgLight} ${config.textColor} hover:opacity-80`
                    }`}
                  >
                    <span>{config.icon}</span>
                    <span>{config.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeFilter === category ? 'bg-white/20' : 'bg-white/50'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Legend Description */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3 font-medium">Category Descriptions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <span className="text-lg">📝</span>
                <div>
                  <p className="font-semibold text-blue-800 text-sm">Command</p>
                  <p className="text-xs text-blue-600">Instructions to follow</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                <span className="text-lg">💡</span>
                <div>
                  <p className="font-semibold text-purple-800 text-sm">Example</p>
                  <p className="text-xs text-purple-600">Love demonstrated</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <span className="text-lg">✨</span>
                <div>
                  <p className="font-semibold text-green-800 text-sm">Promise</p>
                  <p className="text-xs text-green-600">God's assurances</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="font-semibold text-red-800 text-sm">Warning</p>
                  <p className="text-xs text-red-600">Cautions to heed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-orange-100 overflow-visible relative">
          {/* Show filtered count */}
          {activeFilter !== 'all' && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-800">{passages.filter(p => p.category === activeFilter).length}</span> {categoryConfig[activeFilter]?.label.toLowerCase()} passages
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Clear filter
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 overflow-visible">
            {passages
              .filter(passage => activeFilter === 'all' || passage.category === activeFilter)
              .map((passage) => {
                const config = categoryConfig[passage.category];
                const originalIndex = passages.indexOf(passage);
                return (
              <div
                    key={originalIndex}
                    className={`group relative bg-orange-50 rounded-xl p-4 shadow-sm hover:shadow-xl hover:bg-orange-100 transition-shadow duration-300 cursor-pointer border-2 ${config.borderColor} hover:border-orange-300 min-h-[100px]`}
                    role="button"
                    tabIndex={0}
                    aria-label={`View passage ${passage.reference}`}
                    onClick={(e) => openPopup(originalIndex, e)}
                    onKeyDown={(e) => e.key === 'Enter' && openPopup(originalIndex, e as unknown as React.MouseEvent<HTMLDivElement>)}
              >
                    {/* Category indicator dot */}
                    <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${config.color}`} title={config.label}></div>
                <span className="text-xs text-orange-500 font-bold uppercase tracking-wider block mb-1">
                      #{originalIndex + 1}
                </span>
                <p className="text-sm md:text-base font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                  {passage.reference}
                </p>
                    {/* Category badge */}
                    <span className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full ${config.bgLight} ${config.textColor} font-medium`}>
                      {config.icon} {config.label}
                    </span>
              </div>
                );
            })}
          </div>

          {/* Popup positioned next to the card */}
          {selectedPassage !== null && (
            <>
              {/* Backdrop to close popup when clicking outside */}
              <div 
                className="fixed inset-0"
                style={{ zIndex: 99998 }}
                onClick={closePopup}
              />
              
              {/* Popup */}
              <div 
                className="absolute w-[340px] bg-white rounded-2xl shadow-2xl border-2 border-orange-400 overflow-hidden"
                style={{
                  top: `${popupPosition.top}px`,
                  left: `${popupPosition.left}px`,
                  zIndex: 99999,
                  maxHeight: '80vh'
                }}
              >
                {/* Header */}
                <div className={`p-4 border-b ${
                  passages[selectedPassage].category === 'command' ? 'bg-blue-50 border-blue-200' :
                  passages[selectedPassage].category === 'promise' ? 'bg-green-50 border-green-200' :
                  passages[selectedPassage].category === 'warning' ? 'bg-red-50 border-red-200' :
                  'bg-purple-50 border-purple-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        #{selectedPassage + 1}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-gray-800 mt-1">
                        {passages[selectedPassage].reference}
                      </h3>
                      <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                        passages[selectedPassage].category === 'command' ? 'bg-blue-100 text-blue-700' :
                        passages[selectedPassage].category === 'promise' ? 'bg-green-100 text-green-700' :
                        passages[selectedPassage].category === 'warning' ? 'bg-red-100 text-red-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {categoryConfig[passages[selectedPassage].category].icon} {categoryConfig[passages[selectedPassage].category].label}
                      </span>
                    </div>
                    <button 
                      onClick={closePopup}
                      className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="Close popup"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Content - scrollable */}
                <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                  {/* Scripture Text */}
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg">
                    <p className="text-gray-800 italic leading-relaxed text-sm">
                      "{passages[selectedPassage].text}"
                    </p>
                  </div>

                  {/* Explanation */}
                  {passages[selectedPassage].explanation && (
                    <div>
                      <h4 className="font-bold text-gray-700 mb-1 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        Meaning
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {passages[selectedPassage].explanation}
                      </p>
                    </div>
                  )}

                  {/* Application */}
                  {passages[selectedPassage].application && (
                    <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                      <h4 className="font-bold text-green-800 mb-1 text-sm flex items-center">
                        <span className="mr-1">💡</span>
                        Application
                      </h4>
                      <p className="text-green-700 leading-relaxed text-sm">
                        {passages[selectedPassage].application}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-20 flex flex-col items-center">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg max-w-4xl w-full border-t-4 border-red-800">
            <h3 className="text-2xl font-serif text-red-800 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Study & Application Guide
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="flex items-start">
                <span className="bg-red-100 text-red-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm">1</span>
                <p>Download the free books: <span className="font-semibold text-gray-900">Love Nigerian or Live on Curses</span> and <span className="font-semibold text-gray-900">Love Americans or Live on Curses</span> from our publications page.</p>
              </div>
              <div className="flex items-start">
                <span className="bg-red-100 text-red-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm">2</span>
                <p>Use a <span className="font-semibold">Life Application Bible Commentary</span> to study these 50 passages in depth (passages 1-50).</p>
              </div>
              <div className="flex items-start">
                <span className="bg-red-100 text-red-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm">3</span>
                <p>See the power of love in action by visiting our <a href="/testimonies" className="text-red-600 font-bold hover:underline inline-block min-h-[44px] py-2">Testimonies</a> page.</p>
              </div>
              <div className="flex items-start">
                <span className="bg-red-100 text-red-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm">4</span>
                <p className="font-semibold text-red-800">Our Goal: Reproduce and give a Yellow Card to every NIGERIAN.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-10 max-w-4xl w-full text-center shadow-xl">
            <h3 className="text-3xl font-serif text-white mb-4">Start Your Love Journey</h3>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              These 50 passages form the biblical foundation for understanding and practicing God's love.
            </p>
            <button className="bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg min-h-[44px] min-w-[44px]">
              Download Full Study Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}