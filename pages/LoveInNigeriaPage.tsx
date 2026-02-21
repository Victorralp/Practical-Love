import { DollarSign, Shield, Users, BookOpen, Sparkles, MapPin } from 'lucide-react';
import { PageHero, SectionCard, CTASection, FeatureCard, NumberedList, PageShell } from '../components/ui';
import Logo from '../components/Logo';

export default function LoveInNigeriaPage() {
  const problemMessages = [
    { number: 1, content: 'We do not Love ourselves in Nigeria.', highlight: true },
    {
      number: 2,
      content: 'To make this worst as stated in (1) above WE ARE STUBBORN IN WICKEDNESS.',
      highlight: true,
    },
    {
      number: 3,
      content: 'All families in Nigeria are guilty including my own and your own families.',
      highlight: true,
    },
    {
      number: 4,
      content:
        'Why? Because Money and Materialism is the language of Love in our homes and families.',
      highlight: true,
    },
    {
      number: 5,
      content: 'Love of money is the root of all evils, name any evil you find it in Nigeria.',
      highlight: true,
    },
  ];

  const solutionMessages = [
    {
      number: 1,
      content:
        'There is a thin line between LOVE of God and LOVE of money; you need to work hard DAILY to be on the side of God, because LOVE of God is the root of all blessings while LOVE of money is the root of all evils.',
    },
    {
      number: 2,
      content:
        'For God so loved the world... (John 3:16). But take note this includes every human being on this planet NO EXCEPTION.',
    },
    { number: 3, content: 'The idea of HUSBAND AND WIFE AND FAMILY is from God and God alone.' },
    { number: 4, content: "God's Love language is in the yellow card in your hand." },
    {
      number: 5,
      content:
        'Any family who is able to memorize and practicalized the characteristics of Love in his or her family IT IS MANDATORY OR COMPULSORY FOR GOD TO BLESS THAT FAMILY.',
    },
    {
      number: 6,
      content:
        'If you love your wife and/or wife Love your husband, parents Love their children and children Love your parents based on THIS LANGUAGE OF LOVE IN THE YELLOW CARD IN YOUR HAND, you are honouring God and God says those who honour me I will honour them.',
    },
    {
      number: 7,
      content:
        "Any Nigerian deep or stubborn in corruption and wickedness, trace their roots, they usually don't come from a LOVING AND GODLY/GOD FEARING AND LOVING HOMES/FAMILIES.",
    },
    {
      number: 8,
      content:
        'There is no way something good will come out of Loving and Godly family, that will not impact the family, community, church, mosque and society at large.',
    },
  ];

  return (
    <PageShell
      className="bg-gradient-to-b from-orange-50 via-white to-red-50"
      containerClassName="py-16 section-gap"
    >
      <PageHero
        badge="Love Ministry for Nigeria"
        icon={
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-sm">
            <Logo className="w-6 h-6" />
          </div>
        }
        title="Transforming Nigeria through Practical Love"
        subtitle="A clear call to heal families, renew communities, and restore integrity by living the 17 characteristics of love."
        actions={
          <div className="flex flex-col sm:flex-row gap-3">
            <CTASection
              title=""
              description=""
              primaryAction={{ label: 'Get the Yellow Card', href: '/yellow-card' }}
              secondaryAction={{ label: 'Read 50 Love Passages', href: '/bible-passages' }}
              variant="white"
              className="p-0"
            />
          </div>
        }
      />

      <SectionCard variant="gradient" className="section-gap">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Families First"
            description="Every corrupt or righteous leader is shaped at home. Heal the family, heal the nation."
            accentColor="orange"
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Love Transforms"
            description="Practical, God-kind love turns selfishness into service and division into unity."
            accentColor="red"
          />
          <FeatureCard
            icon={<MapPin className="w-6 h-6" />}
            title="Made for Nigeria"
            description="A movement rooted in Scripture, tailored to Nigeria’s realities, and reproducible in every community."
            accentColor="orange"
          />
        </div>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-8">
        <SectionCard className="h-full">
          <div className="space-y-3 mb-4">
            <span className="pill">The hard truth</span>
            <h2 className="text-3xl font-serif text-red-800">Where we are</h2>
            <p className="text-gray-600">Naming the problem is the first step to change.</p>
          </div>
          <NumberedList items={problemMessages} />
        </SectionCard>

        <SectionCard variant="default" className="h-full">
          <div className="space-y-3 mb-4">
            <span className="pill">The path forward</span>
            <h2 className="text-3xl font-serif text-orange-800">What changes everything</h2>
            <p className="text-gray-600">Practical steps rooted in Scripture for homes and communities.</p>
          </div>
          <NumberedList items={solutionMessages} />
        </SectionCard>
      </div>

      <SectionCard className="section-gap" variant="default">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Key Principles</h2>
          <p className="text-lg text-gray-600">Problem, solution, and promise at a glance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="surface-soft p-6 text-center border-t-4 border-red-600">
            <div className="bg-red-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-7 h-7 text-red-600" />
            </div>
            <h4 className="text-xl font-serif text-gray-900 mb-3">The Problem</h4>
            <p className="text-gray-600 text-sm">
              Money and materialism have replaced love as the main language in many Nigerian homes.
            </p>
          </div>
          <div className="surface-soft p-6 text-center border-t-4 border-orange-500">
            <div className="bg-amber-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Logo className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-serif text-gray-900 mb-3">The Solution</h4>
            <p className="text-gray-600 text-sm">
              Replace love of money with God’s love; live the 17 characteristics daily.
            </p>
          </div>
          <div className="surface-soft p-6 text-center border-t-4 border-orange-500">
            <div className="bg-orange-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-red-600" />
            </div>
            <h4 className="text-xl font-serif text-gray-900 mb-3">The Promise</h4>
            <p className="text-gray-600 text-sm">
              God honors families who honor Him by practicing love—blessing is guaranteed.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard variant="dark" className="text-center">
        <BookOpen className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <blockquote className="text-2xl md:text-3xl font-serif text-white mb-4 italic">
          "For God so loved the world that He gave His only begotten Son, that whoever believes in
          Him should not perish but have everlasting life."
        </blockquote>
        <cite className="text-yellow-400 text-lg">— John 3:16</cite>
      </SectionCard>

      <CTASection
        title="Transform Your Family Today"
        description="Start practicing the 17 characteristics of love and watch God’s promise unfold in your home, community, and nation."
        primaryAction={{
          label: 'Get Your Yellow Card',
          href: '/yellow-card',
        }}
        secondaryAction={{
          label: 'Start Practicing Love',
          href: '/characteristics',
        }}
        variant="gradient"
      />
    </PageShell>
  );
}


