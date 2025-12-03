import { Sprout, Bird, Scale, Handshake, Crown, Zap } from 'lucide-react';

interface CharacteristicProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function CharacteristicCard({ icon, title, description }: CharacteristicProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800 mb-2 leading-snug">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function CharacteristicsPage() {
  const characteristics = [
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "#1 LOVE endures long and is patient and kind",
      description: "Love is patient and kind"
    },
    {
      icon: <Bird className="w-8 h-8" />,
      title: "#2 LOVE is never envious or boils over with jealousy",
      description: "Love is never envious nor boils over with jealousy"
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "#3 LOVE is not boastful or vainglorious",
      description: "Love does not boast or act vainglorious"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "#4 LOVE does not display itself haughtily",
      description: "Love does not display itself haughtily"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "#5 LOVE is not conceited (arrogant and inflated with pride)",
      description: "Love is not conceited, arrogant, or inflated with pride"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "#6 LOVE is not rude or unmannerly",
      description: "Love is not rude, unmannerly, or acts unbecomingly"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "#7 LOVE does not act unbecomingly",
      description: "Love does not act unbecomingly"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "#8 LOVE (GOD'S LOVE IN US) does not insist on his own way or his own right",
      description: "Love does not insist on its own way or its own right"
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "#9 LOVE is not self-seeking",
      description: "Love is not self-seeking"
    },
    {
      icon: <Bird className="w-8 h-8" />,
      title: "#10 LOVE is not touchy or fretful or resentful",
      description: "Love is not touchy, fretful, or resentful"
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "#11 LOVE takes no account of evil done to it",
      description: "Love takes no account of evil done to it"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "#12 LOVE pays no attention to a suffered wrong",
      description: "Love pays no attention to a suffered wrong"
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "#13 LOVE does not rejoice at injustice and unrighteousness, but rejoices when right and truth prevail",
      description: "Love rejoices when right and truth prevail"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "#14 LOVE bears up under anything that comes",
      description: "Love bears up under anything that comes"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "#15 LOVE is ever ready to believe the best of every person",
      description: "Love is ever ready to believe the best of every person"
    },
    {
      icon: <Bird className="w-8 h-8" />,
      title: "#16 LOVE hopes under all circumstances, and it endures everything",
      description: "Love hopes under all circumstances and endures everything"
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "#17 LOVE never fails, never fades out, or becomes obsolete, or comes to an end",
      description: "Love never fails, never fades out, or becomes obsolete"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-yellow-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-red-800 mb-6">
            Characteristics of Love
          </h2>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-6 max-w-3xl mx-auto mb-8">
            <p className="text-xl font-semibold text-gray-800 mb-2">
              INSERT YOUR NAME WHEREVER YOU SEE LOVE
            </p>
            <p className="text-gray-700">
              From 1 Corinthians 13 - The 17 Characteristics of Love
            </p>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These are the characteristics that define true love according to God's Word. 
            Replace "LOVE" with your name and see how you measure up!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {characteristics.map((characteristic, index) => (
            <CharacteristicCard
              key={index}
              icon={characteristic.icon}
              title={characteristic.title}
              description={characteristic.description}
            />
          ))}
        </div>
        
        {/* Bottom Message */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 max-w-4xl mx-auto text-center">
          <p className="text-xl text-white font-semibold mb-4">
            Anyone who is able to memorize and practice these characteristics of Love in their family — 
            IT IS MANDATORY OR COMPULSORY FOR GOD TO BLESS THAT FAMILY!
          </p>
          <p className="text-lg text-orange-100">
            Get your Yellow Card and start your transformation today!
          </p>
        </div>
      </div>
    </section>
  );
}