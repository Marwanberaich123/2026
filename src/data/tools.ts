import { AITool, CategoryInfo } from '../types';
import { CATEGORIES as MASTER_CATEGORIES } from './categories';
import { CHAT_TOOLS } from './toolsData/chatTools';
import { DEV_TOOLS } from './toolsData/devTools';
import { AGENT_TOOLS } from './toolsData/agentTools';
import { IMAGE_TOOLS } from './toolsData/imageTools';
import { VIDEO_TOOLS } from './toolsData/videoTools';
import { VOICE_TOOLS } from './toolsData/voiceTools';
import { PRODUCTIVITY_TOOLS } from './toolsData/productivityTools';
import { WRITING_TOOLS } from './toolsData/writingTools';
import { DESIGN_TOOLS } from './toolsData/designTools';
import { RESEARCH_TOOLS } from './toolsData/researchTools';
import { MARKETING_TOOLS } from './toolsData/marketingTools';

export const CATEGORIES: CategoryInfo[] = MASTER_CATEGORIES;

export const AI_TOOLS: AITool[] = [
  ...CHAT_TOOLS,
  ...DEV_TOOLS,
  ...AGENT_TOOLS,
  ...IMAGE_TOOLS,
  ...VIDEO_TOOLS,
  ...VOICE_TOOLS,
  ...PRODUCTIVITY_TOOLS,
  ...WRITING_TOOLS,
  ...DESIGN_TOOLS,
  ...RESEARCH_TOOLS,
  ...MARKETING_TOOLS,
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select Your AI Tool',
    description: 'Browse our directory of 150+ premier AI platforms including ChatGPT Plus, Claude 3.5, Midjourney, Sora, Cursor, and ElevenLabs.',
    iconName: 'Compass',
  },
  {
    step: '02',
    title: 'Instant Unlock Modal',
    description: 'Click "Unlock Access" to trigger the interactive in-page verification popup. No signup, email, or password required.',
    iconName: 'LockOpen',
  },
  {
    step: '03',
    title: 'Unlimited Direct Access',
    description: 'Complete the quick human confirmation to immediately receive your unrestricted access credentials and private gateway link.',
    iconName: 'Zap',
  },
];

export const FAQS = [
  {
    question: 'Is AIUnlock really 100% free with no login required?',
    answer: 'Yes! AIUnlock was built from the ground up to be open and accessible to all visitors worldwide. We do not require you to sign up, provide an email address, create a password, or register an account. You can discover, inspect, and unlock tools directly in your browser.'
  },
  {
    question: 'How does the "Unlock Access" verification modal work?',
    answer: 'When you click "Unlock Access", our secure interactive verification modal opens directly on the page without redirecting you away. Complete a quick sponsor task or human check (taking about 30 seconds) to verify your session and unlock the premium tool link.'
  },
  {
    question: 'Will clicking "Unlock Access" redirect me to another tab or external website?',
    answer: 'No. AIUnlock enforces a strict in-page interactive modal rule. The content locker loads securely inside our responsive overlay popup so you never lose your place or get redirected away.'
  },
  {
    question: 'Which AI tools and models are currently available?',
    answer: 'Our catalog contains 150+ top-tier industry tools across 11 comprehensive categories: AI Chat & LLMs, Coding & Dev, Autonomous Agents, AI Image & Art, AI Video & Motion, AI Voice & Audio, Productivity & Search, AI Writing & Content, Design & UI/UX, Research & Education, and Marketing & Sales.'
  },
  {
    question: 'Can I access AIUnlock on mobile phones and tablets?',
    answer: 'Absolutely. AIUnlock is designed mobile-first with responsive glassmorphism interfaces, smooth touch controls, and high performance across all iOS, Android, and desktop screens.'
  },
  {
    question: 'Is AIUnlock affiliated with OpenAI, Google, Anthropic, or Canva?',
    answer: 'No. AIUnlock is an independent directory and discovery platform. We are not officially affiliated with, endorsed by, or sponsored by OpenAI, Google, Anthropic, Midjourney, xAI, Canva, or any other trademark holders.'
  }
];
