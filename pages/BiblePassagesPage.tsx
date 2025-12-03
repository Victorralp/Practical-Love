import { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, BookOpen } from 'lucide-react';

interface BiblePassage {
  reference: string;
  text: string;
  explanation: string;
  application: string;
  category: 'command' | 'example' | 'promise' | 'warning';
}

export default function BiblePassagesPage() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set([0, 1, 2])); // First 3 expanded by default

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const passages: BiblePassage[] = [
    { reference: "Matthew 5:43-45", text: "", explanation: "", application: "", category: "command" },
    { reference: "Matthew 19:19", text: "", explanation: "", application: "", category: "command" },
    { reference: "Matthew 22:37-39", text: "", explanation: "", application: "", category: "command" },
    { reference: "Mark 12:31-33", text: "", explanation: "", application: "", category: "command" },
    { reference: "Luke 6:27", text: "", explanation: "", application: "", category: "command" },
    { reference: "Luke 6:32-35", text: "", explanation: "", application: "", category: "command" },
    { reference: "John 3:16", text: "", explanation: "", application: "", category: "example" },
    { reference: "John 13:34-35", text: "", explanation: "", application: "", category: "command" },
    { reference: "John 14:15", text: "", explanation: "", application: "", category: "command" },
    { reference: "John 14:21-31", text: "", explanation: "", application: "", category: "command" },
    { reference: "John 15:9-19", text: "", explanation: "", application: "", category: "command" },
    { reference: "Romans 8:28", text: "", explanation: "", application: "", category: "promise" },
    { reference: "Romans 8:35-39", text: "", explanation: "", application: "", category: "promise" },
    { reference: "Romans 12:9-10", text: "", explanation: "", application: "", category: "command" },
    { reference: "Romans 13:8", text: "", explanation: "", application: "", category: "command" },
    { reference: "Romans 13:9", text: "", explanation: "", application: "", category: "command" },
    { reference: "Romans 13:10", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 Corinthians 2:9", text: "", explanation: "", application: "", category: "promise" },
    { reference: "1 Corinthians 13", text: "", explanation: "", application: "", category: "command" },
    { reference: "Galatians 5:6", text: "", explanation: "", application: "", category: "command" },
    { reference: "Galatians 5:13-22", text: "", explanation: "", application: "", category: "command" },
    { reference: "Ephesians 4:2", text: "", explanation: "", application: "", category: "command" },
    { reference: "Ephesians 4:15", text: "", explanation: "", application: "", category: "command" },
    { reference: "Ephesians 5:2", text: "", explanation: "", application: "", category: "command" },
    { reference: "Ephesians 5:25", text: "", explanation: "", application: "", category: "command" },
    { reference: "Ephesians 5:28", text: "", explanation: "", application: "", category: "command" },
    { reference: "Ephesians 5:33", text: "", explanation: "", application: "", category: "command" },
    { reference: "Colossians 3:14", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 Thessalonians 4:9", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 Timothy 1:5", text: "", explanation: "", application: "", category: "command" },
    { reference: "2 Timothy 1:7", text: "", explanation: "", application: "", category: "promise" },
    { reference: "Titus 2:4", text: "", explanation: "", application: "", category: "command" },
    { reference: "Philemon 1:5-10", text: "", explanation: "", application: "", category: "example" },
    { reference: "Hebrews 10:24", text: "", explanation: "", application: "", category: "command" },
    { reference: "Hebrews 13:1", text: "", explanation: "", application: "", category: "command" },
    { reference: "James 2:8", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 Peter 1:8", text: "", explanation: "", application: "", category: "promise" },
    { reference: "1 Peter 3:10", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 Peter 4:8", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 John 3:14", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 John 3:16-23", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 John 4:7-9", text: "", explanation: "", application: "", category: "command" },
    { reference: "1 John 4:20-21", text: "", explanation: "", application: "", category: "warning" },
    { reference: "2 John 1:5-6", text: "", explanation: "", application: "", category: "command" },
    { reference: "2 John 1:1-6", text: "", explanation: "", application: "", category: "command" },
    { reference: "3 John 1", text: "", explanation: "", application: "", category: "example" },
    { reference: "Jude 1:2", text: "", explanation: "", application: "", category: "promise" },
    { reference: "Jude 1:21", text: "", explanation: "", application: "", category: "command" },
    { reference: "Revelation 2:4", text: "", explanation: "", application: "", category: "warning" },
    { reference: "Revelation 3:19", text: "", explanation: "", application: "", category: "promise" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'command': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'example': return 'bg-green-100 border-green-300 text-green-800';
      case 'promise': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'warning': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'command': return '📝';
      case 'example': return '💡';
      case 'promise': return '✨';
      case 'warning': return '⚠️';
      default: return '📖';
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-orange-100 to-red-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-red-600 mr-4" />
            <BookOpen className="w-12 h-12 text-orange-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-red-800 mb-6">
            LOVE PASSAGES IN <span className="text-orange-600">NEW TESTAMENT</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            50 Biblical passages about love from the New Testament
          </p>
          <div className="bg-green-100 border-2 border-green-400 rounded-xl p-6 max-w-3xl mx-auto">
            <p className="text-lg font-semibold text-gray-800">
              "For God so loved the world" (John 3:16)
            </p>
            <p className="text-gray-700 mt-2">
              This includes every human being on this planet — NO EXCEPTION!
            </p>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-xl p-8 max-w-5xl mx-auto shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {passages.map((passage, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 shadow hover:shadow-md transition-shadow duration-200 text-center"
              >
                <span className="text-xs text-gray-500 font-medium">#{index + 1}</span>
                <p className="text-sm font-semibold text-gray-800 mt-1">{passage.reference}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-red-800 mb-4">Please Note</h3>
            <div className="text-left space-y-3 text-gray-700">
              <p>• Go to <a href="https://www.logosrhema.org.ng" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.logosrhema.org.ng</a>, click on Publication then Click on:</p>
              <p className="ml-6">- Love Nigerian or Live on Curses</p>
              <p className="ml-6">- Love Americans or Live on Curses</p>
              <p>• You can download (a) and (or) (b)</p>
              <p>• To see power of love in action, go to <a href="https://www.logosrhema.org.ng" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.logosrhema.org.ng</a> and Events then click TESTIMONY</p>
              <p>• Please above (1-50) using LIFE Application Bible Commentary</p>
              <p>• We are to reproduce and give to every NIGERIAN</p>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-white mb-4">Study These Passages</h3>
            <p className="text-lg text-white">
              These 50 passages form the biblical foundation for understanding and practicing God's love. 
              Study them, memorize them, and apply them in your family and community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}