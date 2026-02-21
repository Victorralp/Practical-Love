/**
 * Self-Reflection Prompts Data
 * Requirements: 3.1
 */

import { ReflectionPrompt } from '../types/growth';

export const reflectionPrompts: ReflectionPrompt[] = [
  // Patience Prompts
  {
    id: 'reflect-patience-1',
    question:
      'Think about a recent situation where you lost patience. What triggered your impatience, and how did you respond?',
    category: 'patience',
    followUp: 'If you could go back, how would you handle that situation differently?',
  },
  {
    id: 'reflect-patience-2',
    question:
      'Who in your life tests your patience the most? What do you think this reveals about areas where you can grow?',
    category: 'patience',
    followUp: 'What is one thing you can appreciate about this person despite the challenges?',
  },
  {
    id: 'reflect-patience-3',
    question: 'Describe a time when someone showed patience with you. How did it make you feel?',
    category: 'patience',
  },
  // Kindness Prompts
  {
    id: 'reflect-kindness-1',
    question:
      'When was the last time you went out of your way to be kind to someone? What motivated you?',
    category: 'kindness',
    followUp: 'How did the other person respond, and how did it make you feel?',
  },
  {
    id: 'reflect-kindness-2',
    question:
      'Is there someone in your life who could use more kindness from you? What holds you back from showing it?',
    category: 'kindness',
  },
  {
    id: 'reflect-kindness-3',
    question: "Describe a time when someone's unexpected kindness changed your day or perspective.",
    category: 'kindness',
    followUp: 'How can you create similar moments for others?',
  },
  // Forgiveness Prompts
  {
    id: 'reflect-forgiveness-1',
    question:
      'Is there someone you are struggling to forgive? What makes forgiveness difficult in this situation?',
    category: 'forgiveness',
    followUp: 'How has holding onto this unforgiveness affected your peace or wellbeing?',
  },
  {
    id: 'reflect-forgiveness-2',
    question:
      'Think about a time when you were forgiven by someone. How did their forgiveness impact you?',
    category: 'forgiveness',
  },
  {
    id: 'reflect-forgiveness-3',
    question:
      'Is there something you need to forgive yourself for? What would self-forgiveness look like in this area?',
    category: 'forgiveness',
    followUp: 'What would you say to a friend who had done the same thing?',
  },
  // Empathy Prompts
  {
    id: 'reflect-empathy-1',
    question:
      'Think of someone whose views or actions you find difficult to understand. What might their life experiences be that shaped their perspective?',
    category: 'empathy',
    followUp: 'How does considering their background change how you see them?',
  },
  {
    id: 'reflect-empathy-2',
    question:
      'When was the last time you truly listened to someone without thinking about your response? What did you learn?',
    category: 'empathy',
  },
  {
    id: 'reflect-empathy-3',
    question:
      'Describe a time when you felt truly understood by someone. What did they do that made you feel heard?',
    category: 'empathy',
    followUp: 'How can you offer that same gift of understanding to others?',
  },
  // Humility Prompts
  {
    id: 'reflect-humility-1',
    question:
      'What is something you used to be certain about but have since changed your mind on? What led to that change?',
    category: 'humility',
    followUp: 'What does this teach you about holding your current opinions?',
  },
  {
    id: 'reflect-humility-2',
    question:
      'Think about a recent success. Who else contributed to that success that you might not have acknowledged?',
    category: 'humility',
  },
  {
    id: 'reflect-humility-3',
    question:
      'What is an area of weakness or limitation you find difficult to admit? Why is it hard to acknowledge?',
    category: 'humility',
    followUp: 'How might accepting this limitation actually free you?',
  },
  // Trust Prompts
  {
    id: 'reflect-trust-1',
    question: 'Who do you trust most in your life? What have they done to earn that trust?',
    category: 'trust',
    followUp: 'Are you doing similar things to earn trust from others?',
  },
  {
    id: 'reflect-trust-2',
    question:
      'Has your trust ever been broken? How has that experience affected your ability to trust others?',
    category: 'trust',
  },
  {
    id: 'reflect-trust-3',
    question: 'In what ways might you be unintentionally undermining trust in your relationships?',
    category: 'trust',
    followUp: 'What is one specific change you could make to become more trustworthy?',
  },
  // Perseverance Prompts
  {
    id: 'reflect-perseverance-1',
    question:
      'What is something you have been tempted to give up on? What keeps you going despite the challenges?',
    category: 'perseverance',
    followUp: 'What would it mean to you to see this through to completion?',
  },
  {
    id: 'reflect-perseverance-2',
    question:
      'Think about a time when you persevered through difficulty. What did you learn about yourself?',
    category: 'perseverance',
  },
  {
    id: 'reflect-perseverance-3',
    question:
      'What obstacles are currently standing between you and your goals? Which of these are within your control to address?',
    category: 'perseverance',
    followUp: 'What is one small step you can take this week to move forward?',
  },
];

export default reflectionPrompts;
