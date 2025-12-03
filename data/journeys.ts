/**
 * Guided Journeys Data
 * Requirements: 4.1, 4.2
 */

import { Journey } from '../types/growth';

export const journeys: Journey[] = [
  {
    id: 'journey-patience',
    title: '7 Days of Patience',
    description: 'A week-long journey to develop patience in your daily interactions and grow in emotional resilience.',
    durationDays: 7,
    category: 'patience',
    steps: [
      {
        id: 'patience-day-1',
        dayNumber: 1,
        title: 'Understanding Patience',
        content: 'Patience is more than waiting—it is how we behave while waiting. Today, we begin by understanding what patience truly means and why it matters in our relationships and personal growth.',
        scriptureReference: 'James 1:2-4 - "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance."',
        actionItem: 'Write down three situations where you typically lose patience. For each, note what triggers your impatience.'
      },
      {
        id: 'patience-day-2',
        dayNumber: 2,
        title: 'The Pause',
        content: 'Today we practice the power of the pause. Before reacting to any frustrating situation, we will learn to create space between stimulus and response.',
        scriptureReference: 'Proverbs 14:29 - "Whoever is patient has great understanding, but one who is quick-tempered displays folly."',
        actionItem: 'Practice the 10-second pause today. When frustrated, count to 10 before responding. Note how this changes your reactions.'
      },
      {
        id: 'patience-day-3',
        dayNumber: 3,
        title: 'Patience with Others',
        content: 'People are imperfect, and so are we. Today we focus on extending patience to others, remembering that everyone is fighting battles we know nothing about.',
        scriptureReference: 'Colossians 3:12-13 - "Therefore, as God\'s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience."',
        actionItem: 'Choose one person who tests your patience. Pray for them and look for one positive quality in them today.'
      },
      {
        id: 'patience-day-4',
        dayNumber: 4,
        title: 'Patience with Yourself',
        content: 'We are often hardest on ourselves. Today we practice self-compassion and patience with our own growth process.',
        actionItem: 'Write a letter of encouragement to yourself about an area where you are growing slowly. Acknowledge your progress, however small.'
      },
      {
        id: 'patience-day-5',
        dayNumber: 5,
        title: 'Patience in Waiting',
        content: 'Some things cannot be rushed. Today we embrace the waiting seasons of life and find purpose in the process.',
        scriptureReference: 'Psalm 27:14 - "Wait for the Lord; be strong and take heart and wait for the Lord."',
        actionItem: 'Identify something you are waiting for. Write down three ways you can grow or serve others during this waiting period.'
      },
      {
        id: 'patience-day-6',
        dayNumber: 6,
        title: 'Patience Under Pressure',
        content: 'Stress tests our patience. Today we develop strategies for maintaining patience when life gets overwhelming.',
        actionItem: 'Create a "patience toolkit" - write down 3 techniques you can use when you feel your patience slipping (deep breathing, walking away, prayer, etc.).'
      },
      {
        id: 'patience-day-7',
        dayNumber: 7,
        title: 'A Patient Life',
        content: 'As we conclude this journey, we commit to making patience a lifestyle, not just a momentary practice.',
        scriptureReference: 'Galatians 5:22-23 - "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control."',
        actionItem: 'Write a commitment statement about how you will continue practicing patience. Share it with someone who can hold you accountable.'
      }
    ]
  },
  {
    id: 'journey-forgiveness',
    title: '5 Days to Freedom Through Forgiveness',
    description: 'A transformative journey to understand, practice, and experience the freedom that comes through forgiveness.',
    durationDays: 5,
    category: 'forgiveness',
    steps: [
      {
        id: 'forgiveness-day-1',
        dayNumber: 1,
        title: 'What Forgiveness Is (and Is Not)',
        content: 'Forgiveness is often misunderstood. It is not excusing harmful behavior, forgetting what happened, or reconciling with unsafe people. It is releasing the hold that resentment has on your heart for your own freedom.',
        scriptureReference: 'Matthew 6:14-15 - "For if you forgive other people when they sin against you, your heavenly Father will also forgive you."',
        actionItem: 'Write down your current understanding of forgiveness. Then list any misconceptions you may have held about what forgiveness requires.'
      },
      {
        id: 'forgiveness-day-2',
        dayNumber: 2,
        title: 'The Cost of Unforgiveness',
        content: 'Holding onto resentment is like drinking poison and expecting the other person to suffer. Today we examine how unforgiveness affects our mental, emotional, and physical health.',
        actionItem: 'Identify one grudge you are holding. Write down how this unforgiveness has affected your peace, relationships, or wellbeing.'
      },
      {
        id: 'forgiveness-day-3',
        dayNumber: 3,
        title: 'Beginning the Process',
        content: 'Forgiveness is often a process, not a single event. Today we take the first steps toward releasing resentment.',
        scriptureReference: 'Ephesians 4:31-32 - "Get rid of all bitterness, rage and anger, brawling and slander, along with every form of malice. Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."',
        actionItem: 'Choose one person you need to forgive. Write them a letter expressing your hurt (you do not need to send it). Then write a second letter choosing to release them.'
      },
      {
        id: 'forgiveness-day-4',
        dayNumber: 4,
        title: 'Forgiving Yourself',
        content: 'Sometimes the hardest person to forgive is ourselves. Today we practice self-forgiveness and release the shame of past mistakes.',
        actionItem: 'Write down something you have been unable to forgive yourself for. Then write a response as if you were counseling a dear friend who had done the same thing.'
      },
      {
        id: 'forgiveness-day-5',
        dayNumber: 5,
        title: 'Living in Freedom',
        content: 'Forgiveness is not a one-time decision but a daily choice. Today we commit to a lifestyle of forgiveness and freedom.',
        scriptureReference: 'Colossians 3:13 - "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you."',
        actionItem: 'Create a forgiveness practice: each night before bed, release any offenses from the day. Write this commitment somewhere you will see it daily.'
      }
    ]
  },
  {
    id: 'journey-kindness',
    title: '7 Days of Intentional Kindness',
    description: 'A week-long journey to cultivate a heart of kindness and make a positive impact on everyone you encounter.',
    durationDays: 7,
    category: 'kindness',
    steps: [
      {
        id: 'kindness-day-1',
        dayNumber: 1,
        title: 'The Heart of Kindness',
        content: 'Kindness begins in the heart before it shows in actions. Today we examine our motivations and cultivate genuine care for others.',
        scriptureReference: 'Ephesians 4:32 - "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."',
        actionItem: 'Reflect on your typical day. Identify three opportunities where you could show more kindness. Write them down.'
      },
      {
        id: 'kindness-day-2',
        dayNumber: 2,
        title: 'Kindness in Words',
        content: 'Our words have power to build up or tear down. Today we focus on speaking words that encourage, affirm, and uplift others.',
        scriptureReference: 'Proverbs 16:24 - "Gracious words are a honeycomb, sweet to the soul and healing to the bones."',
        actionItem: 'Give three genuine compliments today. Be specific about what you appreciate in each person.'
      },
      {
        id: 'kindness-day-3',
        dayNumber: 3,
        title: 'Kindness in Actions',
        content: 'Actions speak louder than words. Today we look for practical ways to serve and help others.',
        actionItem: 'Perform one act of service for someone without being asked. It could be a chore, an errand, or helping with a task.'
      },
      {
        id: 'kindness-day-4',
        dayNumber: 4,
        title: 'Kindness to Strangers',
        content: 'Extending kindness beyond our circle of friends and family expands our capacity for love.',
        scriptureReference: 'Hebrews 13:2 - "Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it."',
        actionItem: 'Show kindness to a stranger today - pay for someone\'s coffee, help someone with directions, or simply offer a warm smile and greeting.'
      },
      {
        id: 'kindness-day-5',
        dayNumber: 5,
        title: 'Kindness to the Difficult',
        content: 'The true test of kindness is how we treat those who are difficult to love. Today we practice kindness toward challenging people.',
        scriptureReference: 'Luke 6:35 - "But love your enemies, do good to them, and lend to them without expecting to get anything back."',
        actionItem: 'Think of someone you find difficult. Do one kind thing for them today, even if it is simply praying for their wellbeing.'
      },
      {
        id: 'kindness-day-6',
        dayNumber: 6,
        title: 'Kindness to Yourself',
        content: 'We cannot pour from an empty cup. Today we practice self-kindness and self-care.',
        actionItem: 'Do something kind for yourself today - rest, enjoy a hobby, or simply speak encouragingly to yourself about your growth.'
      },
      {
        id: 'kindness-day-7',
        dayNumber: 7,
        title: 'A Lifestyle of Kindness',
        content: 'As we conclude this journey, we commit to making kindness our default response to every person and situation.',
        scriptureReference: 'Micah 6:8 - "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God."',
        actionItem: 'Write a personal kindness manifesto - your commitment to how you will treat others going forward. Share it with someone who can encourage you.'
      }
    ]
  }
];

export default journeys;
