import { DollarSign, Heart, Shield, Users, BookOpen, Sparkles } from 'lucide-react'
import { PageHeader, SectionCard, CTASection, FeatureCard, NumberedList } from '../components/ui'

export default function LoveInNigeriaPage() {
  const problemMessages = [
    { number: 1, content: "We do not Love ourselves in Nigeria.", highlight: true },
    { number: 2, content: "To make this worst as stated in (1) above WE ARE STUBBORN IN WICKEDNESS.", highlight: true },
    { number: 3, content: "All families in Nigeria are guilty including my own and your own families.", highlight: true },
    { number: 4, content: "Why? Because Money and Materialism is the language of Love in our homes and families.", highlight: true },
    { number: 5, content: "Love of money is the root of all evils, name any evil you find it in Nigeria.", highlight: true },
  ]

  const solutionMessages = [
    { number: 1, content: "There is a thin line between LOVE of God and LOVE of money; you need to work hard DAILY to be on the side of God, because LOVE of God is the root of all blessings while LOVE of money is the root of all evils." },
    { number: 2, content: "For God so loved the world... (John 3:16). But take note this includes every human being on this planet NO EXCEPTION." },
    { number: 3, content: "The idea of HUSBAND AND WIFE AND FAMILY is from God and God alone." },
    { number: 4, content: "God's Love language is in the yellow card in your hand." },
    { number: 5, content: "Any family who is able to memorize and practicalized the characteristics of Love in his or her family IT IS MANDATORY OR COMPULSORY FOR GOD TO BLESS THAT FAMILY." },
    { number: 6, content: "If you love your wife and/or wife Love your husband, parents Love their children and children Love your parents based on THIS LANGUAGE OF LOVE IN THE YELLOW CARD IN YOUR HAND, you are honouring God and God says those who honour me I will honour them." },
    { number: 7, content: "Any Nigerian deep or stubborn in corruption and wickedness, trace their roots, they usually don't come from a LOVING AND GODLY/GOD FEARING AND LOVING HOMES/FAMILIES." },
    { number: 8, content: "There is no way something good will come out of Loving and Godly family, that will not impact the family, community, church, mosque and society at large." },
  ]


  return (
    <section className="py-24 px-6 bg-gradient-to-b from-orange-50 via-white to-red-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <PageHeader
          icon={
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>
          }
          title="Love Ministry for Nigeria"
          subtitle="A direct message about the state of love in our nation and the path to genuine transformation through practical, God-kind of love."
          badge="A Call to Action"
        />

        {/* Examples of Godly Leadership */}
        <SectionCard 
          title="Examples of Godly Leadership" 
          variant="gradient"
          className="mb-16"
        >
          <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Loving and God-fearing families produce leaders that impact not just communities, but the world.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Mrs. Ngozi Okonjo-Iweala"
              description="Former Finance Minister and current WTO Director-General. Her exemplary leadership roots trace back to a loving, godly family that honored God."
              accentColor="blue"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Mr. Adesina Akinwunmi"
              description="President of the African Development Bank (AfDB). His transformative impact demonstrates the power of upbringing in a loving, God-fearing home."
              accentColor="green"
            />
          </div>
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-300">
            <p className="text-yellow-800 font-bold text-lg text-center font-serif italic">
              "Those who honor me I will honor them" — God's promise to families who practice practical love.
            </p>
          </div>
        </SectionCard>

        {/* The Hard Truth Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-red-200">
              The Hard Truth
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-red-800 mb-4">
              The Problem We Face
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding where we are is the first step to transformation
            </p>
          </div>
          <SectionCard className="max-w-4xl mx-auto">
            <NumberedList items={problemMessages} />
          </SectionCard>
        </div>


        {/* The Solution Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-green-200">
              The Path Forward
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-green-800 mb-4">
              God's Solution for Nigeria
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The way out through practical, biblical love
            </p>
          </div>
          <SectionCard variant="default" className="max-w-4xl mx-auto">
            <NumberedList items={solutionMessages} />
          </SectionCard>
        </div>

        {/* Key Principles - Three Column Layout */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              Key Principles
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the problem, solution, and promise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-red-600 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-2xl font-serif text-gray-800 mb-4">The Problem</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Money and materialism have tragically replaced love as the primary language in many Nigerian homes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-green-600 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-serif text-gray-800 mb-4">The Solution</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                We must actively replace the love of money with God's kind of love, using the 17 characteristics as our daily guide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-blue-600 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-serif text-gray-800 mb-4">The Promise</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                It is mandatory for God to bless any family that memorizes and practices these characteristics of love.
              </p>
            </div>
          </div>
        </div>


        {/* Scripture Reference */}
        <SectionCard variant="dark" className="mb-16 text-center">
          <BookOpen className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <blockquote className="text-2xl md:text-3xl font-serif text-white mb-4 italic">
            "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
          </blockquote>
          <cite className="text-yellow-400 text-lg">— John 3:16</cite>
        </SectionCard>

        {/* Call to Action */}
        <CTASection
          title="Transform Your Family Today"
          description="If you love your spouse, parents love their children, and children love their parents - based on the LANGUAGE OF LOVE IN THE YELLOW CARD - you are honoring God. And God says: 'Those who honor Me, I will honor.'"
          primaryAction={{
            label: "Get Your Yellow Card",
            href: "/yellow-card"
          }}
          secondaryAction={{
            label: "Start Practicing Love",
            href: "/characteristics"
          }}
          variant="gradient"
        />
      </div>
    </section>
  )
}
