/**
 * Growth Tips Data with Practical Exercises
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */

import { GrowthTip } from '../types/growth';

export const tips: GrowthTip[] = [
  // Patience Tips
  {
    id: 'tip-patience-1',
    title: 'The Art of Waiting Well',
    category: 'patience',
    summary: 'Learn to transform frustrating wait times into opportunities for growth and reflection.',
    content: 'Patience is not simply waiting—it is how we behave while waiting. When we learn to wait well, we develop inner strength and emotional resilience. The key is to shift our perspective from seeing delays as obstacles to viewing them as opportunities.',
    exercises: [
      {
        id: 'ex-patience-1a',
        title: 'Mindful Waiting',
        steps: [
          'When you find yourself waiting, take three deep breaths',
          'Notice your surroundings - what do you see, hear, smell?',
          'Think of one thing you are grateful for in this moment',
          'If frustration arises, acknowledge it without judgment',
          'Return your focus to your breath until the wait is over'
        ],
        duration: '5-10 minutes'
      },
      {
        id: 'ex-patience-1b',
        title: 'Patience Journal',
        steps: [
          'At the end of each day, write down one situation where you had to wait',
          'Note how you felt during the wait',
          'Reflect on what you could have done differently',
          'Write one positive thing that came from the waiting period'
        ],
        duration: '10 minutes daily'
      }
    ]
  },
  {
    id: 'tip-patience-2',
    title: 'Responding vs Reacting',
    category: 'patience',
    summary: 'Develop the skill of thoughtful response rather than impulsive reaction.',
    content: 'There is a crucial difference between reacting and responding. Reacting is instant and emotional; responding is thoughtful and intentional. By creating space between stimulus and response, we gain control over our actions and build stronger relationships.',
    exercises: [
      {
        id: 'ex-patience-2a',
        title: 'The STOP Technique',
        steps: [
          'S - Stop what you are doing when triggered',
          'T - Take a breath and feel your feet on the ground',
          'O - Observe your thoughts and emotions without judgment',
          'P - Proceed with awareness and intention'
        ],
        duration: '1-2 minutes per situation'
      }
    ]
  },
  // Kindness Tips
  {
    id: 'tip-kindness-1',
    title: 'Small Acts, Big Impact',
    category: 'kindness',
    summary: 'Discover how small, consistent acts of kindness can transform relationships and communities.',
    content: 'Kindness does not require grand gestures. Often, the smallest acts of consideration have the greatest impact. A smile, a word of encouragement, or a moment of attention can change someone\'s entire day. The key is consistency and genuine intention.',
    exercises: [
      {
        id: 'ex-kindness-1a',
        title: 'Daily Kindness Challenge',
        steps: [
          'Each morning, set an intention to perform three kind acts',
          'Look for opportunities throughout the day - hold doors, offer compliments, help with tasks',
          'Notice how the recipient responds',
          'Reflect on how performing kindness made you feel',
          'Share one act of kindness with a friend or family member'
        ],
        duration: 'Throughout the day'
      }
    ]
  },
  {
    id: 'tip-kindness-2',
    title: 'The Language of Appreciation',
    category: 'kindness',
    summary: 'Learn to express genuine appreciation in ways that resonate with others.',
    content: 'Everyone wants to feel valued and appreciated. Learning to express appreciation effectively is a powerful form of kindness. The key is being specific, sincere, and timely with your words of affirmation.',
    exercises: [
      {
        id: 'ex-kindness-2a',
        title: 'Appreciation Letter',
        steps: [
          'Choose someone who has positively impacted your life',
          'Write down three specific things they have done that you appreciate',
          'Explain how their actions affected you',
          'Express your gratitude in a handwritten note or heartfelt message',
          'Deliver the message in person if possible'
        ],
        duration: '20-30 minutes'
      }
    ]
  },
  // Forgiveness Tips
  {
    id: 'tip-forgiveness-1',
    title: 'Understanding Forgiveness',
    category: 'forgiveness',
    summary: 'Learn what forgiveness truly means and why it is essential for your own wellbeing.',
    content: 'Forgiveness is not about excusing harmful behavior or forgetting what happened. It is about releasing the hold that resentment has on your heart. When we forgive, we free ourselves from the burden of bitterness and open space for healing and growth.',
    exercises: [
      {
        id: 'ex-forgiveness-1a',
        title: 'Forgiveness Reflection',
        steps: [
          'Find a quiet place and take several deep breaths',
          'Think of someone you need to forgive (start with a minor offense)',
          'Acknowledge the hurt you experienced without minimizing it',
          'Consider what holding onto this resentment costs you',
          'Speak aloud or write: "I choose to release this burden for my own peace"',
          'Repeat this process as needed - forgiveness is often a journey, not a single event'
        ],
        duration: '15-20 minutes'
      }
    ]
  },
  // Empathy Tips
  {
    id: 'tip-empathy-1',
    title: 'Deep Listening',
    category: 'empathy',
    summary: 'Master the art of listening to understand rather than to respond.',
    content: 'True empathy begins with listening—not just to words, but to emotions, body language, and what is left unsaid. When we listen deeply, we create a safe space for others to be vulnerable and feel truly understood.',
    exercises: [
      {
        id: 'ex-empathy-1a',
        title: 'Active Listening Practice',
        steps: [
          'In your next conversation, commit to listening without planning your response',
          'Maintain gentle eye contact and open body language',
          'Reflect back what you hear: "It sounds like you are feeling..."',
          'Ask clarifying questions: "Can you tell me more about that?"',
          'Resist the urge to share your own similar experiences',
          'Thank the person for sharing with you'
        ],
        duration: '10-15 minutes per conversation'
      }
    ]
  },
  {
    id: 'tip-empathy-2',
    title: 'Perspective Taking',
    category: 'empathy',
    summary: 'Develop the ability to see situations from others\' points of view.',
    content: 'Empathy requires us to step outside our own experience and imagine life from another\'s perspective. This does not mean agreeing with everyone, but understanding why they might think, feel, or act as they do.',
    exercises: [
      {
        id: 'ex-empathy-2a',
        title: 'Walk in Their Shoes',
        steps: [
          'Think of someone whose views or actions you find difficult to understand',
          'Write down what you know about their background, experiences, and circumstances',
          'Consider what fears, hopes, or needs might drive their behavior',
          'Imagine explaining their perspective to someone else as if you were them',
          'Notice if your feelings toward this person shift'
        ],
        duration: '15-20 minutes'
      }
    ]
  },
  // Humility Tips
  {
    id: 'tip-humility-1',
    title: 'The Strength of Humility',
    category: 'humility',
    summary: 'Discover how humility is not weakness but a source of genuine strength.',
    content: 'Humility is not thinking less of yourself—it is thinking of yourself less. It means having an accurate view of your strengths and weaknesses, being open to learning, and valuing others\' contributions. Humble people are often the most confident because they do not need external validation.',
    exercises: [
      {
        id: 'ex-humility-1a',
        title: 'Daily Humility Check',
        steps: [
          'At the end of each day, ask yourself: "Did I listen more than I spoke today?"',
          'Reflect: "Did I acknowledge someone else\'s contribution or idea?"',
          'Consider: "Did I admit when I did not know something?"',
          'Note one thing you learned from someone else today',
          'Identify one area where you can grow or improve'
        ],
        duration: '5-10 minutes daily'
      }
    ]
  },
  // Trust Tips
  {
    id: 'tip-trust-1',
    title: 'Building Trust Through Consistency',
    category: 'trust',
    summary: 'Learn how small, consistent actions build deep trust over time.',
    content: 'Trust is built in drops and lost in buckets. It is the accumulation of small, consistent actions over time that creates deep trust. Being reliable, keeping confidences, and following through on commitments are the building blocks of trustworthy relationships.',
    exercises: [
      {
        id: 'ex-trust-1a',
        title: 'Trust Inventory',
        steps: [
          'List three people whose trust you want to strengthen',
          'For each person, identify one commitment you have made to them',
          'Evaluate: Have you been consistent in keeping this commitment?',
          'If not, identify what has prevented you from following through',
          'Create a specific plan to improve your reliability with each person',
          'Follow up with them to acknowledge any past inconsistencies'
        ],
        duration: '20-30 minutes'
      }
    ]
  },
  {
    id: 'tip-trust-2',
    title: 'Vulnerability and Trust',
    category: 'trust',
    summary: 'Understand how appropriate vulnerability deepens trust in relationships.',
    content: 'Trust grows when we allow ourselves to be seen—imperfections and all. Sharing our struggles, fears, and failures with safe people creates connection and invites others to do the same. Vulnerability is not weakness; it is the birthplace of trust.',
    exercises: [
      {
        id: 'ex-trust-2a',
        title: 'Gradual Vulnerability',
        steps: [
          'Identify a trusted person in your life',
          'Think of something you have been hesitant to share',
          'Start small—share something mildly vulnerable first',
          'Notice how they respond and how you feel',
          'Gradually increase vulnerability as trust builds',
          'Reciprocate when they share vulnerably with you'
        ],
        duration: 'Ongoing practice'
      }
    ]
  },
  // Perseverance Tips
  {
    id: 'tip-perseverance-1',
    title: 'The Power of Persistence',
    category: 'perseverance',
    summary: 'Develop mental resilience to keep going when things get difficult.',
    content: 'Perseverance is not about never falling—it is about getting up every time you fall. It is the quiet determination to keep moving forward despite obstacles, setbacks, and discouragement. This quality is developed through practice and intentional mindset shifts.',
    exercises: [
      {
        id: 'ex-perseverance-1a',
        title: 'Obstacle Reframing',
        steps: [
          'Identify a current challenge or obstacle you are facing',
          'Write down your initial negative thoughts about it',
          'Ask: "What can I learn from this situation?"',
          'Ask: "How might this challenge make me stronger?"',
          'Rewrite your thoughts with a growth mindset',
          'Identify one small step you can take today despite the obstacle'
        ],
        duration: '15-20 minutes'
      }
    ]
  },
  {
    id: 'tip-perseverance-2',
    title: 'Celebrating Small Wins',
    category: 'perseverance',
    summary: 'Learn to recognize and celebrate progress to maintain motivation.',
    content: 'Long journeys are completed one step at a time. Recognizing and celebrating small wins along the way provides the motivation to keep going. This is not about lowering standards but about acknowledging progress and building momentum.',
    exercises: [
      {
        id: 'ex-perseverance-2a',
        title: 'Progress Journal',
        steps: [
          'Choose a goal or area where you want to persevere',
          'Break it down into small, measurable milestones',
          'Each day, write down one small step you took toward your goal',
          'Celebrate each milestone, no matter how small',
          'When you face setbacks, review your progress to remember how far you have come'
        ],
        duration: '5-10 minutes daily'
      }
    ]
  }
];

export default tips;
