# Design Document

## Overview

This design document outlines the comprehensive redesign of 10 pages on the Practical Love website. The redesign establishes a cohesive design system while enhancing each page's unique purpose. The approach focuses on modern UI patterns, improved visual hierarchy, consistent component usage, and enhanced user engagement through thoughtful interactions and animations.

## Architecture

The redesign follows a component-based architecture using React with TypeScript. Pages are composed of reusable UI components that share a common design language.

```
┌─────────────────────────────────────────────────────────────┐
│                        App Shell                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                      Header                              ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Page Content                          ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        ││
│  │  │ PageHeader  │ │  Section    │ │    CTA      │        ││
│  │  │ Component   │ │ Components  │ │  Component  │        ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘        ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                      Footer                              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Design System Foundation

The redesign establishes these core design tokens:

**Colors:**
- Primary: Red (#DC2626, #B91C1C)
- Secondary: Orange (#EA580C, #F97316)
- Accent: Yellow (#EAB308, #FACC15)
- Neutral: Gray scale (#111827 to #F9FAFB)
- Background gradients: Warm tones (orange-50 to red-50)

**Typography:**
- Headings: Serif font (font-serif class)
- Body: System sans-serif
- Scale: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl

**Spacing:**
- Section padding: py-24 px-6 md:px-12
- Card padding: p-6 md:p-8
- Component gaps: gap-4, gap-6, gap-8

**Border Radius:**
- Small: rounded-lg (8px)
- Medium: rounded-xl (12px)
- Large: rounded-2xl (16px)
- Extra large: rounded-3xl (24px)

## Components and Interfaces

### Shared Components

```typescript
// PageHeader Component
interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}

// SectionCard Component
interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'dark';
  className?: string;
}

// CTASection Component
interface CTASectionProps {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  variant?: 'gradient' | 'white';
}

// FeatureCard Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
}

// NumberedList Component
interface NumberedListProps {
  items: Array<{
    number: number;
    content: string;
    highlight?: boolean;
  }>;
}
```

### Page-Specific Components

```typescript
// Bible Passages Page
interface PassageCardProps {
  reference: string;
  text: string;
  explanation: string;
  application: string;
  category: 'command' | 'example' | 'promise' | 'warning';
  index: number;
}

// Characteristics Page
interface CharacteristicCardProps {
  number: number;
  icon: React.ReactNode;
  text: string;
}

// Love Challenge Page
interface DayTrackerProps {
  totalDays: number;
  completedDays: number[];
  onDayToggle: (day: number) => void;
}

interface DailyFocusProps {
  day: number;
  characteristic: string;
  reflectionQuestions: string[];
}

// Testimonies Page
interface TestimonyCardProps {
  name: string;
  role: string;
  image?: string;
  testimony: string;
  rating: number;
}

// Share Testimony Page
interface TestimonyFormData {
  name: string;
  email: string;
  role: string;
  location?: string;
  testimony: string;
  rating: number;
}

// Yellow Card Page
interface YellowCardCharacteristic {
  num: number;
  text: string;
}
```

## Data Models

### Page Content Models

```typescript
// Bible Passage
interface BiblePassage {
  reference: string;
  text: string;
  explanation: string;
  application: string;
  category: 'command' | 'example' | 'promise' | 'warning';
}

// Love Characteristic
interface LoveCharacteristic {
  num: number;
  icon: string; // Icon component name
  text: string;
}

// Challenge Day
interface ChallengeDay {
  day: number;
  focus: string;
  characteristic: string;
  reflectionQuestions: string[];
}

// Testimony
interface Testimony {
  id: string;
  name: string;
  role: string;
  location?: string;
  image?: string;
  testimony: string;
  rating: number;
  createdAt: Date;
}

// Journey/Mission Content
interface MissionSection {
  id: string;
  title: string;
  content: string;
  icon?: string;
  items?: string[];
}
```

### State Management

```typescript
// Love Challenge State (localStorage)
interface ChallengeProgress {
  completedDays: number[];
  currentDay: number;
  startDate: string;
  lastUpdated: string;
}

// Testimony Form State
interface FormState {
  data: TestimonyFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the acceptance criteria analysis, the following correctness properties have been identified:

### Property 1: Passage Category Validity

*For any* Bible passage displayed on the Bible Passages page, the passage category SHALL be one of the four valid types: 'command', 'example', 'promise', or 'warning'.

**Validates: Requirements 2.3**

### Property 2: Characteristic Rendering Completeness

*For any* love characteristic displayed on the Characteristics page or Yellow Card page, the rendered output SHALL contain the characteristic number (1-17), an associated icon, and the full characteristic text.

**Validates: Requirements 3.2, 9.2**

### Property 3: Day Completion Toggle

*For any* day (1-30) on the Love Challenge page, clicking the day SHALL toggle its completion status - if the day was marked complete, it becomes incomplete; if incomplete, it becomes complete.

**Validates: Requirements 4.2**

### Property 4: Day Content Display

*For any* valid day number (1-30) on the Love Challenge page, the system SHALL display a daily focus characteristic and at least one reflection question for that day.

**Validates: Requirements 4.3**

### Property 5: Numbered Content Sequencing

*For any* numbered list (strategy steps, message points), the items SHALL be numbered sequentially starting from 1, with no gaps or duplicates in the sequence.

**Validates: Requirements 5.3, 6.1**

### Property 6: Testimony Content Display

*For any* testimony displayed on the Testimonies page, the rendered output SHALL contain the person's name, role, star rating (1-5), and testimony quote text.

**Validates: Requirements 7.3**

### Property 7: Form Validation Errors

*For any* form submission on the Share Testimony page with missing required fields (name, email, role, testimony), the system SHALL display an error message for each missing required field and prevent form submission.

**Validates: Requirements 8.2**

### Property 8: Touch Target Accessibility

*For any* interactive element (button, link, clickable card) across all redesigned pages, the element SHALL have a minimum tap target size of 44x44 pixels to ensure touch accessibility.

**Validates: Requirements 11.4**

## Error Handling

### Form Validation Errors

The Share Testimony form implements client-side validation with the following error handling:

```typescript
interface ValidationErrors {
  name?: string;      // "Name is required"
  email?: string;     // "Email is required" | "Please enter a valid email"
  role?: string;      // "Please tell us your role"
  testimony?: string; // "Please share your testimony" | "Please write at least 50 characters"
}

// Validation function
const validateForm = (data: TestimonyFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Please enter a valid email';
  if (!data.testimony.trim()) errors.testimony = 'Please share your testimony';
  else if (data.testimony.length < 50) errors.testimony = 'Please write at least 50 characters';
  if (!data.role.trim()) errors.role = 'Please tell us your role';
  
  return errors;
};
```

### Loading States

All pages implement loading states for async operations:
- Initial page load: Skeleton loaders or spinner
- Form submission: Button disabled with loading indicator
- Data fetching: Loading message with animation

### Empty States

Pages handle empty data gracefully:
- Testimonies page: Encouraging message when no testimonies exist
- Progress tracker: Welcome message for new users

## Testing Strategy

### Dual Testing Approach

The redesign will be tested using both unit tests and property-based tests to ensure comprehensive coverage.

### Unit Testing

Unit tests will cover:
- Component rendering with various props
- User interaction handlers (clicks, form inputs)
- State management (localStorage operations)
- Edge cases (empty data, boundary values)

**Framework:** Vitest with React Testing Library

### Property-Based Testing

Property-based tests will verify the correctness properties defined above using generated test data.

**Framework:** fast-check (JavaScript property-based testing library)

**Configuration:** Each property test will run a minimum of 100 iterations.

**Test Annotation Format:** Each property-based test will be tagged with:
`**Feature: page-redesign, Property {number}: {property_text}**`

### Test Categories

1. **Rendering Tests**
   - Verify all required elements are present
   - Check responsive layout behavior
   - Validate accessibility attributes

2. **Interaction Tests**
   - Form validation and submission
   - Toggle/click handlers
   - Navigation links

3. **State Tests**
   - localStorage persistence
   - Progress tracking
   - Form state management

4. **Property Tests**
   - Data validity (categories, numbers)
   - Content completeness
   - Accessibility compliance

### Test File Structure

```
pages/
  __tests__/
    BiblePassagesPage.test.tsx
    CharacteristicsPage.test.tsx
    LoveChallengePage.test.tsx
    MissionVisionPage.test.tsx
    LoveInNigeriaPage.test.tsx
    TestimoniesPage.test.tsx
    ShareTestimonyPage.test.tsx
    YellowCardPage.test.tsx
    YellowCardSeriesPage.test.tsx
components/
  __tests__/
    shared.test.tsx
```

## Visual Design Specifications

### Page Layout Patterns

**Standard Page Structure:**
```
┌────────────────────────────────────────┐
│           Page Header                   │
│  [Icon] Title                          │
│  Subtitle/Description                  │
├────────────────────────────────────────┤
│           Main Content                  │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ Card │ │ Card │ │ Card │           │
│  └──────┘ └──────┘ └──────┘           │
├────────────────────────────────────────┤
│           CTA Section                   │
│  [Primary Button] [Secondary Button]   │
└────────────────────────────────────────┘
```

### Responsive Breakpoints

- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (two columns)
- Desktop: > 1024px (multi-column)

### Animation Specifications

- Hover transitions: 200-300ms ease
- Page transitions: 300ms fade
- Scroll reveals: 400ms slide-up
- Respect `prefers-reduced-motion` media query
