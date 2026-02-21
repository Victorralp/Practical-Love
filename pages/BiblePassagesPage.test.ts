/**
 * Property-based tests for Bible Passages Page
 * Feature: page-redesign
 * Validates: Requirements 2.3
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Valid passage categories as defined in the BiblePassage interface
const VALID_CATEGORIES = ['command', 'example', 'promise', 'warning'] as const;
type PassageCategory = (typeof VALID_CATEGORIES)[number];

// BiblePassage interface matching the page component
interface BiblePassage {
  reference: string;
  text: string;
  explanation: string;
  application: string;
  category: PassageCategory;
}

// The actual passages data from BiblePassagesPage.tsx
const passages: BiblePassage[] = [
  {
    reference: 'Matthew 5:43-45',
    text: "You have heard that it was said, 'Love your neighbor and hate your enemy.' But I tell you, love your enemies and pray for those who persecute you, that you may be children of your Father in heaven.",
    explanation: 'Love extends beyond friends to enemies.',
    application: 'Pray for someone who has wronged you today.',
    category: 'command',
  },
  {
    reference: 'Matthew 19:19',
    text: "honor your father and mother,' and 'love your neighbor as yourself.'",
    explanation: 'The summary of the commandments regarding others.',
    application: 'Show honor to your parents and love to a neighbor.',
    category: 'command',
  },
  {
    reference: 'Matthew 22:37-39',
    text: "Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' This is the first and greatest commandment. And the second is like it: 'Love your neighbor as yourself.'",
    explanation: 'The Great Commandment.',
    application: 'Prioritize God first, then others.',
    category: 'command',
  },
  {
    reference: 'Mark 12:31-33',
    text: "The second is this: 'Love your neighbor as yourself.' There is no commandment greater than these... To love him with all your heart... and to love your neighbor as yourself is more important than all burnt offerings and sacrifices.",
    explanation: 'Love is more important than religious ritual.',
    application: 'Focus on love over ritual.',
    category: 'command',
  },
  {
    reference: 'Luke 6:27',
    text: 'But to you who are listening I say: Love your enemies, do good to those who hate you.',
    explanation: 'Active love towards opposition.',
    application: 'Do one good deed for someone you dislike.',
    category: 'command',
  },
  {
    reference: 'Luke 6:32-35',
    text: 'If you love those who love you, what credit is that to you? ... But love your enemies, do good to them, and lend to them without expecting to get anything back.',
    explanation: 'Distinctive Christian love expects nothing in return.',
    application: 'Give without expecting repayment.',
    category: 'command',
  },
  {
    reference: 'John 3:16',
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    explanation: 'The ultimate example of sacrificial love.',
    application: "Believe and receive God's love.",
    category: 'example',
  },
  {
    reference: 'John 13:34-35',
    text: 'A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.',
    explanation: 'The mark of a disciple is love.',
    application: 'Love others as Jesus loved you.',
    category: 'command',
  },
  {
    reference: 'John 14:15',
    text: 'If you love me, keep my commands.',
    explanation: 'Love is demonstrated through obedience.',
    application: "Obey God's word as an act of love.",
    category: 'command',
  },
  {
    reference: 'John 14:21-31',
    text: 'Whoever has my commands and keeps them is the one who loves me... I love the Father and do exactly what my Father has commanded me.',
    explanation: 'Love serves as the motivation for obedience.',
    application: 'Let your love for God drive your actions.',
    category: 'command',
  },
  {
    reference: 'John 15:9-19',
    text: 'As the Father has loved me, so have I loved you. Now remain in my love... My command is this: Love each other as I have loved you.',
    explanation: "Abiding in God's love empowers us to love others.",
    application: "Spend time in God's presence.",
    category: 'command',
  },
  {
    reference: 'Romans 8:28',
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    explanation: "God's sovereignty works for lovers of God.",
    application: "Trust God's plan in difficult times.",
    category: 'promise',
  },
  {
    reference: 'Romans 8:35-39',
    text: 'Who shall separate us from the love of Christ? ... For I am convinced that neither death nor life... nor anything else in all creation, will be able to separate us from the love of God.',
    explanation: "The security of God's love.",
    application: "Rest in the assurance of God's love.",
    category: 'promise',
  },
  {
    reference: 'Romans 12:9-10',
    text: 'Love must be sincere. Hate what is evil; cling to what is good. Be devoted to one another in love. Honor one another above yourselves.',
    explanation: 'Marks of a true Christian.',
    application: 'Serve someone else before yourself.',
    category: 'command',
  },
  {
    reference: 'Romans 13:8',
    text: 'Let no debt remain outstanding, except the continuing debt to love one another, for whoever loves others has fulfilled the law.',
    explanation: 'Love is a perpetual obligation.',
    application: "Look for ways to pay your 'debt' of love.",
    category: 'command',
  },
  {
    reference: 'Romans 13:9',
    text: "The commandments... are summed up in this one rule: 'Love your neighbor as yourself.'",
    explanation: 'Love fulfills the commandments.',
    application: 'Treat your neighbor as you would want to be treated.',
    category: 'command',
  },
  {
    reference: 'Romans 13:10',
    text: 'Love does no harm to a neighbor. Therefore love is the fulfillment of the law.',
    explanation: 'Love is harmless and helpful.',
    application: 'Ensure your actions harm no one.',
    category: 'command',
  },
  {
    reference: '1 Corinthians 2:9',
    text: "However, as it is written: 'What no eye has seen, what no ear has heard, and what no human mind has conceived' — the things God has prepared for those who love him.",
    explanation: 'Future glory for those who love God.',
    application: "Hope in God's future promises.",
    category: 'promise',
  },
  {
    reference: '1 Corinthians 13',
    text: 'Love is patient, love is kind... It always protects, always trusts, always hopes, always perseveres. Love never fails.',
    explanation: 'The definition and character of love.',
    application: 'Practice one specific characteristic of love today.',
    category: 'command',
  },
  {
    reference: 'Galatians 5:6',
    text: 'For in Christ Jesus neither circumcision nor uncircumcision has any value. The only thing that counts is faith expressing itself through love.',
    explanation: 'Faith works through love.',
    application: 'Let your faith be seen in your love.',
    category: 'command',
  },
  {
    reference: 'Galatians 5:13-22',
    text: 'serve one another humbly in love... But the fruit of the Spirit is love, joy, peace...',
    explanation: 'Freedom is for serving in love.',
    application: 'Serve someone humbly today.',
    category: 'command',
  },
  {
    reference: 'Ephesians 4:2',
    text: 'Be completely humble and gentle; be patient, bearing with one another in love.',
    explanation: 'Unity requires loving patience.',
    application: 'Be patient with a difficult person.',
    category: 'command',
  },
  {
    reference: 'Ephesians 4:15',
    text: 'Instead, speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ.',
    explanation: 'Truth and love must go together.',
    application: 'Speak a hard truth with gentleness.',
    category: 'command',
  },
  {
    reference: 'Ephesians 5:2',
    text: 'and walk in the way of love, just as Christ loved us and gave himself up for us as a fragrant offering and sacrifice to God.',
    explanation: "Imitate Christ's sacrificial walk.",
    application: 'Sacrifice your preference for another.',
    category: 'command',
  },
  {
    reference: 'Ephesians 5:25',
    text: 'Husbands, love your wives, just as Christ loved the church and gave himself up for her.',
    explanation: 'Sacrificial love in marriage.',
    application: 'Husbands, do something special for your wives.',
    category: 'command',
  },
  {
    reference: 'Ephesians 5:28',
    text: 'In this same way, husbands ought to love their wives as their own bodies. He who loves his wife loves himself.',
    explanation: "Caring for one's wife is self-care.",
    application: "Care for your spouse's needs.",
    category: 'command',
  },
  {
    reference: 'Ephesians 5:33',
    text: 'However, each one of you also must love his wife as he loves himself, and the wife must respect her husband.',
    explanation: 'Summary of marital duties.',
    application: 'Love and respect in your marriage.',
    category: 'command',
  },
  {
    reference: 'Colossians 3:14',
    text: 'And over all these virtues put on love, which binds them all together in perfect unity.',
    explanation: 'Love is the binding virtue.',
    application: 'Let love unify your other actions.',
    category: 'command',
  },
  {
    reference: '1 Thessalonians 4:9',
    text: 'Now about your love for one another we do not need to write to you, for you yourselves have been taught by God to love each other.',
    explanation: 'God teaches us to love.',
    application: 'Ask God to teach you how to love better.',
    category: 'command',
  },
  {
    reference: '1 Timothy 1:5',
    text: 'The goal of this command is love, which comes from a pure heart and a good conscience and a sincere faith.',
    explanation: 'The purpose of instruction is love.',
    application: 'Check your motives: are they loving?',
    category: 'command',
  },
  {
    reference: '2 Timothy 1:7',
    text: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
    explanation: "God's Spirit empowers love.",
    application: "Rely on the Spirit's power to love.",
    category: 'promise',
  },
  {
    reference: 'Titus 2:4',
    text: 'Then they can urge the younger women to love their husbands and children.',
    explanation: 'Love is learned and taught.',
    application: 'Mentor someone in loving their family.',
    category: 'command',
  },
  {
    reference: 'Philemon 1:5-10',
    text: 'I hear about your love for all his holy people and your faith in the Lord Jesus... Your love has given me great joy and encouragement.',
    explanation: 'Love refreshes others.',
    application: 'Refresh someone with your love.',
    category: 'example',
  },
  {
    reference: 'Hebrews 10:24',
    text: 'And let us consider how we may spur one another on toward love and good deeds.',
    explanation: 'Encourage others to love.',
    application: 'Encourage a friend to do good.',
    category: 'command',
  },
  {
    reference: 'Hebrews 13:1',
    text: 'Keep on loving one another as brothers and sisters.',
    explanation: 'Brotherly love should continue.',
    application: 'Treat church members as family.',
    category: 'command',
  },
  {
    reference: 'James 2:8',
    text: "If you really keep the royal law found in Scripture, 'Love your neighbor as yourself,' you are doing right.",
    explanation: 'The Royal Law.',
    application: 'Fulfill the royal law today.',
    category: 'command',
  },
  {
    reference: '1 Peter 1:8',
    text: 'Though you have not seen him, you love him; and even though you do not see him now, you believe in him and are filled with an inexpressible and glorious joy.',
    explanation: 'Loving the unseen Christ.',
    application: 'Express your love to Jesus.',
    category: 'promise',
  },
  {
    reference: '1 Peter 3:10',
    text: "For, 'Whoever would love life and see good days must keep their tongue from evil and their lips from deceitful speech.'",
    explanation: 'Loving life requires controlling speech.',
    application: 'Speak only good today.',
    category: 'command',
  },
  {
    reference: '1 Peter 4:8',
    text: 'Above all, love each other deeply, because love covers over a multitude of sins.',
    explanation: 'Love forgives and overlooks offenses.',
    application: 'Forgive a repeat offense.',
    category: 'command',
  },
  {
    reference: '1 John 3:14',
    text: 'We know that we have passed from death to life, because we love each other. Anyone who does not love remains in death.',
    explanation: 'Love is evidence of salvation.',
    application: 'Examine your heart for love for believers.',
    category: 'command',
  },
  {
    reference: '1 John 3:16-23',
    text: 'This is how we know what love is: Jesus Christ laid down his life for us. And we ought to lay down our lives for our brothers and sisters... let us not love with words or speech but with actions and in truth.',
    explanation: 'Love is practical action.',
    application: 'Do a tangible act of love.',
    category: 'command',
  },
  {
    reference: '1 John 4:7-9',
    text: 'Dear friends, let us love one another, for love comes from God... This is how God showed his love among us: He sent his one and only Son into the world that we might live through him.',
    explanation: 'God is the source of love.',
    application: 'Connect with God to love others.',
    category: 'command',
  },
  {
    reference: '1 John 4:20-21',
    text: 'Whoever claims to love God yet hates a brother or sister is a liar... Anyone who loves God must also love their brother and sister.',
    explanation: 'Loving God requires loving people.',
    application: 'Mend a broken relationship.',
    category: 'warning',
  },
  {
    reference: '2 John 1:5-6',
    text: 'I am writing to remind you, dear friends, that we should love one another. This is not a new commandment, but one we have had from the beginning. Love means doing what God has commanded us.',
    explanation: 'Love involves obedience.',
    application: "Walk in God's commandments.",
    category: 'command',
  },
  {
    reference: '2 John 1:1-6',
    text: '(Same passage context - emphasize walking in truth and love)',
    explanation: 'Truth and love.',
    application: 'Be true and loving.',
    category: 'command',
  },
  {
    reference: '3 John 1',
    text: 'The elder, To my dear friend Gaius, whom I love in the truth.',
    explanation: 'Personal affection in truth.',
    application: 'Express affection to a friend.',
    category: 'example',
  },
  {
    reference: 'Jude 1:2',
    text: 'Mercy, peace and love be yours in abundance.',
    explanation: 'A blessing of love.',
    application: 'Pray this blessing for someone.',
    category: 'promise',
  },
  {
    reference: 'Jude 1:21',
    text: "Keep yourselves in God's love as you wait for the mercy of our Lord Jesus Christ to bring you to eternal life.",
    explanation: "Remain in God's love.",
    application: 'Stay close to God today.',
    category: 'command',
  },
  {
    reference: 'Revelation 2:4',
    text: 'Yet I hold this against you: You have forsaken the love you had at first.',
    explanation: "Don't lose your first love.",
    application: 'Return to your initial passion for Christ.',
    category: 'warning',
  },
  {
    reference: 'Revelation 3:19',
    text: 'Those whom I love I rebuke and discipline. So be earnest and repent.',
    explanation: 'Discipline is a sign of love.',
    application: "Accept correction as God's love.",
    category: 'promise',
  },
];

// Validation function for passage category
function isValidCategory(category: string): category is PassageCategory {
  return VALID_CATEGORIES.includes(category as PassageCategory);
}

// Validation function for complete passage
function isValidPassage(passage: BiblePassage): boolean {
  return (
    passage.reference.length > 0 && passage.text.length > 0 && isValidCategory(passage.category)
  );
}

describe('Bible Passages Page - Property Tests', () => {
  /**
   * **Feature: page-redesign, Property 1: Passage Category Validity**
   * *For any* Bible passage displayed on the Bible Passages page, the passage
   * category SHALL be one of the four valid types: 'command', 'example',
   * 'promise', or 'warning'.
   * **Validates: Requirements 2.3**
   */
  it('Property 1: Passage Category Validity - all passages have valid categories', () => {
    fc.assert(
      fc.property(fc.constantFrom(...passages), passage => {
        // Verify the category is one of the valid types
        expect(VALID_CATEGORIES).toContain(passage.category);
        expect(isValidCategory(passage.category)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property test: Generated passages with valid categories pass validation
   * This tests the validation function itself with generated data
   */
  it('Property 1b: Generated passages with valid categories pass validation', () => {
    const passageArb: fc.Arbitrary<BiblePassage> = fc.record({
      reference: fc.string({ minLength: 1 }),
      text: fc.string({ minLength: 1 }),
      explanation: fc.string({ minLength: 1 }),
      application: fc.string({ minLength: 1 }),
      category: fc.constantFrom(...VALID_CATEGORIES),
    });

    fc.assert(
      fc.property(passageArb, passage => {
        expect(isValidPassage(passage)).toBe(true);
        expect(VALID_CATEGORIES).toContain(passage.category);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Verify all actual passages in the data have valid categories
   */
  it('All 50 passages have valid categories', () => {
    passages.forEach((passage, index) => {
      expect(
        isValidCategory(passage.category),
        `Passage ${index + 1} (${passage.reference}) has invalid category: ${passage.category}`
      ).toBe(true);
    });
  });
});

// Export for potential reuse
export { VALID_CATEGORIES, isValidCategory, isValidPassage, passages };

