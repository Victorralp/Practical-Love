/**
 * Daily Love Challenges Data
 * Requirements: 1.1, 1.2
 */

import { Challenge } from '../types/growth';

export const challenges: Challenge[] = [
  // Patience Challenges
  {
    id: 'patience-1',
    title: 'The Pause Practice',
    description:
      'When you feel frustrated today, pause for 10 seconds before responding. Use this time to take a deep breath and choose your words carefully.',
    actionStep: 'Count to 10 silently before responding to any frustrating situation today.',
    category: 'patience',
    timeframe: 'daily',
    scriptureReference:
      'James 1:19 - "Everyone should be quick to listen, slow to speak and slow to become angry."',
  },
  {
    id: 'patience-2',
    title: 'Wait Without Complaint',
    description:
      'Practice patience in everyday waiting situations - traffic, queues, or slow service. Use these moments as opportunities to reflect rather than frustrate.',
    actionStep:
      'When waiting today, smile and use the time to pray or think of something you are grateful for.',
    category: 'patience',
    timeframe: 'daily',
    scriptureReference:
      'Psalm 27:14 - "Wait for the Lord; be strong and take heart and wait for the Lord."',
  },
  // Kindness Challenges
  {
    id: 'kindness-1',
    title: 'Unexpected Kindness',
    description:
      'Perform an unexpected act of kindness for someone today. It could be a colleague, family member, or complete stranger.',
    actionStep:
      'Do one kind thing for someone who does not expect it - pay for their coffee, leave an encouraging note, or help with a task.',
    category: 'kindness',
    timeframe: 'daily',
    scriptureReference: 'Ephesians 4:32 - "Be kind and compassionate to one another."',
  },
  {
    id: 'kindness-2',
    title: 'Words of Encouragement',
    description:
      'Speak words of genuine encouragement to three different people today. Focus on specific things you appreciate about them.',
    actionStep:
      'Send three encouraging messages or speak kind words to three people, being specific about what you value in them.',
    category: 'kindness',
    timeframe: 'daily',
  },
  // Forgiveness Challenges
  {
    id: 'forgiveness-1',
    title: 'Release a Grudge',
    description:
      'Identify one person you have been holding a grudge against. Today, make a conscious decision to release that resentment.',
    actionStep:
      'Write down the name of someone you need to forgive, then pray for them or wish them well in your heart.',
    category: 'forgiveness',
    timeframe: 'daily',
    scriptureReference:
      'Colossians 3:13 - "Bear with each other and forgive one another if any of you has a grievance against someone."',
  },
  {
    id: 'forgiveness-2',
    title: 'Apologize First',
    description:
      'Think of a recent conflict or misunderstanding. Take the initiative to apologize for your part, regardless of who was more at fault.',
    actionStep:
      'Reach out to someone you have had tension with and apologize for your contribution to the conflict.',
    category: 'forgiveness',
    timeframe: 'daily',
  },
  // Empathy Challenges
  {
    id: 'empathy-1',
    title: 'Walk in Their Shoes',
    description:
      'Choose someone you interact with regularly but do not fully understand. Spend time today trying to see life from their perspective.',
    actionStep:
      'Have a conversation with someone and focus entirely on understanding their viewpoint without sharing your own opinions.',
    category: 'empathy',
    timeframe: 'daily',
    scriptureReference:
      'Romans 12:15 - "Rejoice with those who rejoice; mourn with those who mourn."',
  },
  {
    id: 'empathy-2',
    title: 'Listen Without Fixing',
    description:
      'When someone shares a problem with you today, resist the urge to offer solutions. Simply listen and acknowledge their feelings.',
    actionStep:
      'Practice active listening by reflecting back what you hear and asking "How does that make you feel?"',
    category: 'empathy',
    timeframe: 'daily',
  },
  // Humility Challenges
  {
    id: 'humility-1',
    title: 'Serve in Secret',
    description:
      'Do something helpful for someone without them knowing it was you. Practice serving without recognition.',
    actionStep:
      'Complete a task or chore that benefits others without telling anyone or seeking credit.',
    category: 'humility',
    timeframe: 'daily',
    scriptureReference:
      'Matthew 6:3-4 - "When you give to the needy, do not let your left hand know what your right hand is doing."',
  },
  {
    id: 'humility-2',
    title: 'Admit a Mistake',
    description:
      'Acknowledge a mistake or limitation to someone today. Practice vulnerability and honesty about your imperfections.',
    actionStep: 'Share with someone a recent mistake you made and what you learned from it.',
    category: 'humility',
    timeframe: 'daily',
  },
  // Trust Challenges
  {
    id: 'trust-1',
    title: 'Keep Your Word',
    description:
      'Be intentional about keeping every promise you make today, no matter how small. Build trust through reliability.',
    actionStep:
      'Before making any commitment today, pause to ensure you can follow through, then do exactly what you said.',
    category: 'trust',
    timeframe: 'daily',
    scriptureReference: 'Matthew 5:37 - "Let your yes be yes, and your no be no."',
  },
  {
    id: 'trust-2',
    title: 'Share Something Personal',
    description:
      'Build trust by being appropriately vulnerable with someone. Share something personal that helps them know you better.',
    actionStep: 'Open up to a friend or family member about something you normally keep private.',
    category: 'trust',
    timeframe: 'daily',
  },
  // Perseverance Challenges
  {
    id: 'perseverance-1',
    title: 'Finish What You Started',
    description:
      'Identify something you have been putting off or left incomplete. Commit to making progress on it today.',
    actionStep: 'Spend at least 30 minutes working on a task or project you have been avoiding.',
    category: 'perseverance',
    timeframe: 'daily',
    scriptureReference:
      'Galatians 6:9 - "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."',
  },
  {
    id: 'perseverance-2',
    title: 'Encourage Someone Struggling',
    description:
      'Reach out to someone who is going through a difficult time. Remind them that perseverance leads to growth.',
    actionStep:
      'Send a message or call someone who is facing challenges and offer words of encouragement to keep going.',
    category: 'perseverance',
    timeframe: 'daily',
  },
];

export default challenges;
