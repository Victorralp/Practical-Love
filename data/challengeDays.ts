/**
 * 30-Day Love Challenge Daily Content
 * Requirements: 4.3
 * 
 * Each day maps to a specific love characteristic from 1 Corinthians 13
 * with reflection questions to guide daily practice.
 */

export interface ChallengeDay {
  day: number;
  characteristic: string;
  characteristicNumber: number;
  focus: string;
  scriptureReference: string;
  reflectionQuestions: string[];
}

/**
 * The 17 characteristics of love from 1 Corinthians 13
 */
export const loveCharacteristics = [
  { num: 1, text: 'Love is patient' },
  { num: 2, text: 'Love is kind' },
  { num: 3, text: 'Love does not envy' },
  { num: 4, text: 'Love does not boast' },
  { num: 5, text: 'Love is not proud' },
  { num: 6, text: 'Love does not dishonor others' },
  { num: 7, text: 'Love is not self-seeking' },
  { num: 8, text: 'Love is not easily angered' },
  { num: 9, text: 'Love keeps no record of wrongs' },
  { num: 10, text: 'Love does not delight in evil' },
  { num: 11, text: 'Love rejoices with the truth' },
  { num: 12, text: 'Love always protects' },
  { num: 13, text: 'Love always trusts' },
  { num: 14, text: 'Love always hopes' },
  { num: 15, text: 'Love always perseveres' },
  { num: 16, text: 'Love never fails' },
  { num: 17, text: 'The greatest of these is love' },
];

export const challengeDays: ChallengeDay[] = [
  {
    day: 1,
    characteristic: 'Love is patient',
    characteristicNumber: 1,
    focus: 'Patience in difficult situations',
    scriptureReference: '1 Corinthians 13:4a',
    reflectionQuestions: [
      'When did I feel impatient today, and how did I respond?',
      'Who in my life needs more patience from me?',
      'What situation tomorrow will require me to practice patience?',
    ],
  },
  {
    day: 2,
    characteristic: 'Love is kind',
    characteristicNumber: 2,
    focus: 'Kindness to strangers and family',
    scriptureReference: '1 Corinthians 13:4b',
    reflectionQuestions: [
      'What act of kindness did I show today?',
      'Who could benefit from an unexpected kindness from me?',
      'How can I make kindness a daily habit?',
    ],
  },
  {
    day: 3,
    characteristic: 'Love does not envy',
    characteristicNumber: 3,
    focus: 'Avoiding jealousy and comparison',
    scriptureReference: '1 Corinthians 13:4c',
    reflectionQuestions: [
      'Did I compare myself to others today? How did it affect me?',
      'What blessings in my own life am I grateful for?',
      'How can I celebrate others\' success without feeling diminished?',
    ],
  },
  {
    day: 4,
    characteristic: 'Love does not boast',
    characteristicNumber: 4,
    focus: 'Humble service to others',
    scriptureReference: '1 Corinthians 13:4d',
    reflectionQuestions: [
      'Did I seek recognition for my actions today?',
      'How can I serve others without drawing attention to myself?',
      'What motivates me to help others - recognition or genuine care?',
    ],
  },
  {
    day: 5,
    characteristic: 'Love is not proud',
    characteristicNumber: 5,
    focus: 'Practicing humility in relationships',
    scriptureReference: '1 Corinthians 13:4e',
    reflectionQuestions: [
      'Was there a moment today when pride affected my interactions?',
      'How can I put others\' needs before my own ego?',
      'What would it look like to approach tomorrow with genuine humility?',
    ],
  },

  {
    day: 6,
    characteristic: 'Love does not dishonor others',
    characteristicNumber: 6,
    focus: 'Showing respect to everyone',
    scriptureReference: '1 Corinthians 13:5a',
    reflectionQuestions: [
      'Did I treat everyone with dignity and respect today?',
      'Were there moments when I spoke negatively about someone?',
      'How can I honor others even when I disagree with them?',
    ],
  },
  {
    day: 7,
    characteristic: 'Love is not self-seeking',
    characteristicNumber: 7,
    focus: 'Putting others first',
    scriptureReference: '1 Corinthians 13:5b',
    reflectionQuestions: [
      'Did I prioritize my own interests over others today?',
      'What opportunity did I have to put someone else first?',
      'How can I be more aware of others\' needs tomorrow?',
    ],
  },
  {
    day: 8,
    characteristic: 'Love is not easily angered',
    characteristicNumber: 8,
    focus: 'Managing anger constructively',
    scriptureReference: '1 Corinthians 13:5c',
    reflectionQuestions: [
      'What triggered my anger or frustration today?',
      'How did I respond when I felt angry?',
      'What strategies can help me respond calmly in difficult moments?',
    ],
  },
  {
    day: 9,
    characteristic: 'Love keeps no record of wrongs',
    characteristicNumber: 9,
    focus: 'Letting go of grudges',
    scriptureReference: '1 Corinthians 13:5d',
    reflectionQuestions: [
      'Am I holding onto any past hurts or offenses?',
      'How does keeping score affect my relationships?',
      'What would it take for me to truly forgive and let go?',
    ],
  },
  {
    day: 10,
    characteristic: 'Love does not delight in evil',
    characteristicNumber: 10,
    focus: 'Choosing good over evil',
    scriptureReference: '1 Corinthians 13:6a',
    reflectionQuestions: [
      'Did I take pleasure in anyone\'s misfortune today?',
      'How do I respond when I hear negative news about others?',
      'What does it mean to actively reject evil in my daily life?',
    ],
  },
  {
    day: 11,
    characteristic: 'Love rejoices with the truth',
    characteristicNumber: 11,
    focus: 'Truthful communication',
    scriptureReference: '1 Corinthians 13:6b',
    reflectionQuestions: [
      'Was I completely honest in all my interactions today?',
      'Did I celebrate truth even when it was uncomfortable?',
      'How can I be a person of integrity in my words and actions?',
    ],
  },
  {
    day: 12,
    characteristic: 'Love always protects',
    characteristicNumber: 12,
    focus: 'Protecting and supporting loved ones',
    scriptureReference: '1 Corinthians 13:7a',
    reflectionQuestions: [
      'Who did I protect or defend today?',
      'Are there people in my life who need my protection?',
      'How can I create a safe space for those around me?',
    ],
  },
  {
    day: 13,
    characteristic: 'Love always trusts',
    characteristicNumber: 13,
    focus: 'Trusting others even when uncertain',
    scriptureReference: '1 Corinthians 13:7b',
    reflectionQuestions: [
      'Did I give others the benefit of the doubt today?',
      'What fears prevent me from trusting others fully?',
      'How can I build trust in my relationships?',
    ],
  },
  {
    day: 14,
    characteristic: 'Love always hopes',
    characteristicNumber: 14,
    focus: 'Maintaining hope during challenges',
    scriptureReference: '1 Corinthians 13:7c',
    reflectionQuestions: [
      'Did I maintain a hopeful attitude today despite difficulties?',
      'How can I be a source of hope for others?',
      'What am I hoping for in my relationships and life?',
    ],
  },
  {
    day: 15,
    characteristic: 'Love always perseveres',
    characteristicNumber: 15,
    focus: 'Persevering through difficulties',
    scriptureReference: '1 Corinthians 13:7d',
    reflectionQuestions: [
      'What challenges did I face today, and how did I respond?',
      'In what areas of my life do I need to persevere?',
      'How can I encourage others who are struggling to persevere?',
    ],
  },

  {
    day: 16,
    characteristic: 'Love never fails',
    characteristicNumber: 16,
    focus: 'Unfailing commitment to relationships',
    scriptureReference: '1 Corinthians 13:8a',
    reflectionQuestions: [
      'Did I remain committed to loving others even when it was hard?',
      'What does unfailing love look like in my daily life?',
      'How can I demonstrate consistent love to those around me?',
    ],
  },
  {
    day: 17,
    characteristic: 'The greatest of these is love',
    characteristicNumber: 17,
    focus: 'Prioritizing love above all',
    scriptureReference: '1 Corinthians 13:13',
    reflectionQuestions: [
      'Did I make love my highest priority today?',
      'How does love compare to my other values and goals?',
      'What would change if I truly put love first in everything?',
    ],
  },
  // Days 18-30: Deeper practice of the characteristics (cycle through with deeper focus)
  {
    day: 18,
    characteristic: 'Love is patient',
    characteristicNumber: 1,
    focus: 'Deep patience with difficult people',
    scriptureReference: '1 Corinthians 13:4a',
    reflectionQuestions: [
      'Who is the most difficult person for me to be patient with?',
      'How can I extend patience to them specifically?',
      'What does God\'s patience with me teach me about patience with others?',
    ],
  },
  {
    day: 19,
    characteristic: 'Love is kind',
    characteristicNumber: 2,
    focus: 'Radical kindness to enemies',
    scriptureReference: '1 Corinthians 13:4b',
    reflectionQuestions: [
      'Is there someone I find hard to be kind to?',
      'How can I show kindness to someone who has hurt me?',
      'What would radical, unexpected kindness look like today?',
    ],
  },
  {
    day: 20,
    characteristic: 'Love does not envy',
    characteristicNumber: 3,
    focus: 'Celebrating others\' success genuinely',
    scriptureReference: '1 Corinthians 13:4c',
    reflectionQuestions: [
      'Can I genuinely celebrate when others succeed?',
      'What triggers feelings of envy in me?',
      'How can I transform envy into admiration and inspiration?',
    ],
  },
  {
    day: 21,
    characteristic: 'Love does not boast',
    characteristicNumber: 4,
    focus: 'Secret acts of service',
    scriptureReference: '1 Corinthians 13:4d',
    reflectionQuestions: [
      'Did I do something good today without telling anyone?',
      'Why do I feel the need to share my accomplishments?',
      'How can I find satisfaction in serving without recognition?',
    ],
  },
  {
    day: 22,
    characteristic: 'Love is not proud',
    characteristicNumber: 5,
    focus: 'Learning from others',
    scriptureReference: '1 Corinthians 13:4e',
    reflectionQuestions: [
      'What can I learn from someone I might consider "beneath" me?',
      'How does pride prevent me from growing?',
      'What would it look like to approach everyone as my teacher?',
    ],
  },
  {
    day: 23,
    characteristic: 'Love does not dishonor others',
    characteristicNumber: 6,
    focus: 'Speaking well of others always',
    scriptureReference: '1 Corinthians 13:5a',
    reflectionQuestions: [
      'Did I speak positively about others today, even when they weren\'t present?',
      'How can I build others up with my words?',
      'What would change if I only spoke honorably about everyone?',
    ],
  },
  {
    day: 24,
    characteristic: 'Love is not self-seeking',
    characteristicNumber: 7,
    focus: 'Sacrificial giving',
    scriptureReference: '1 Corinthians 13:5b',
    reflectionQuestions: [
      'What did I sacrifice for someone else today?',
      'Where am I holding back from giving fully?',
      'How can I give without expecting anything in return?',
    ],
  },
  {
    day: 25,
    characteristic: 'Love is not easily angered',
    characteristicNumber: 8,
    focus: 'Responding with grace under pressure',
    scriptureReference: '1 Corinthians 13:5c',
    reflectionQuestions: [
      'How did I handle the most stressful moment of my day?',
      'What helps me stay calm when I feel provoked?',
      'How can I prepare myself to respond with grace tomorrow?',
    ],
  },

  {
    day: 26,
    characteristic: 'Love keeps no record of wrongs',
    characteristicNumber: 9,
    focus: 'Complete forgiveness',
    scriptureReference: '1 Corinthians 13:5d',
    reflectionQuestions: [
      'Is there an old wound I\'m still carrying?',
      'What would complete forgiveness look like in that situation?',
      'How can I release the past and embrace freedom?',
    ],
  },
  {
    day: 27,
    characteristic: 'Love rejoices with the truth',
    characteristicNumber: 11,
    focus: 'Living authentically',
    scriptureReference: '1 Corinthians 13:6b',
    reflectionQuestions: [
      'Am I living authentically in all areas of my life?',
      'Where might I be hiding behind a mask?',
      'How can I embrace truth even when it\'s uncomfortable?',
    ],
  },
  {
    day: 28,
    characteristic: 'Love always protects',
    characteristicNumber: 12,
    focus: 'Standing up for the vulnerable',
    scriptureReference: '1 Corinthians 13:7a',
    reflectionQuestions: [
      'Who in my community needs someone to stand up for them?',
      'How can I be a voice for those who cannot speak for themselves?',
      'What does it cost me to protect others?',
    ],
  },
  {
    day: 29,
    characteristic: 'Love always hopes',
    characteristicNumber: 14,
    focus: 'Being a beacon of hope',
    scriptureReference: '1 Corinthians 13:7c',
    reflectionQuestions: [
      'How can I bring hope to someone who is discouraged?',
      'What gives me hope when times are difficult?',
      'How can I share that hope with others?',
    ],
  },
  {
    day: 30,
    characteristic: 'Love never fails',
    characteristicNumber: 16,
    focus: 'Committing to a lifetime of love',
    scriptureReference: '1 Corinthians 13:8a',
    reflectionQuestions: [
      'What have I learned about love over these 30 days?',
      'How has practicing love changed my relationships?',
      'What commitment will I make to continue growing in love?',
    ],
  },
];

/**
 * Get the challenge day content for a specific day
 */
export function getChallengeDayContent(day: number): ChallengeDay | undefined {
  return challengeDays.find((d) => d.day === day);
}

/**
 * Get the characteristic for a specific day
 */
export function getDayCharacteristic(day: number): string {
  const dayContent = getChallengeDayContent(day);
  return dayContent?.characteristic ?? loveCharacteristics[(day - 1) % 17].text;
}

/**
 * Get the reflection questions for a specific day
 */
export function getDayReflectionQuestions(day: number): string[] {
  const dayContent = getChallengeDayContent(day);
  return dayContent?.reflectionQuestions ?? [
    'How did I demonstrate this characteristic today?',
    'In what moment could I have shown more love?',
    'What is one way I will practice this tomorrow?',
  ];
}

export default challengeDays;
