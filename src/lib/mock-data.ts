// Realistic mock data for CreatorPulse AI

export const metrics = {
  views: 1284502,
  followers: 84210,
  engagement: 7.4,
  growth: 12.8,
  trendingScore: 92,
};

export const growthSeries = [
  { day: "Mon", views: 42000, engagement: 5.2, followers: 78200 },
  { day: "Tue", views: 51000, engagement: 6.1, followers: 79050 },
  { day: "Wed", views: 68000, engagement: 6.8, followers: 80100 },
  { day: "Thu", views: 72000, engagement: 7.0, followers: 81000 },
  { day: "Fri", views: 95000, engagement: 7.8, followers: 82400 },
  { day: "Sat", views: 121000, engagement: 8.4, followers: 83500 },
  { day: "Sun", views: 142000, engagement: 7.4, followers: 84210 },
];

export const platformShare = [
  { name: "Instagram", value: 48 },
  { name: "YouTube", value: 31 },
  { name: "TikTok", value: 14 },
  { name: "Facebook", value: 7 },
];

export type Trend = {
  id: string;
  name: string;
  platform: "Instagram" | "YouTube" | "TikTok" | "Facebook";
  niche: string;
  growth: number;
  engagement: number;
  difficulty: number;
  virality: number;
  region: string;
  tag: string;
};

export const trends: Trend[] = [
  { id: "t1", name: "POV: a day in 60 seconds", platform: "Instagram", niche: "Lifestyle", growth: 184, engagement: 9.4, difficulty: 32, virality: 94, region: "Global", tag: "reel" },
  { id: "t2", name: "Silent vlog with text overlays", platform: "YouTube", niche: "Productivity", growth: 142, engagement: 8.1, difficulty: 41, virality: 88, region: "US", tag: "short" },
  { id: "t3", name: "Behind the build: dev edition", platform: "YouTube", niche: "Tech", growth: 121, engagement: 7.6, difficulty: 55, virality: 82, region: "Global", tag: "long" },
  { id: "t4", name: "Get ready with me — founder", platform: "TikTok", niche: "Business", growth: 210, engagement: 9.8, difficulty: 28, virality: 96, region: "EU", tag: "trend" },
  { id: "t5", name: "Audio: 'Espresso' slowed", platform: "Instagram", niche: "Music", growth: 312, engagement: 9.1, difficulty: 18, virality: 97, region: "Global", tag: "audio" },
  { id: "t6", name: "#MorningRoutine2026", platform: "TikTok", niche: "Wellness", growth: 96, engagement: 7.2, difficulty: 22, virality: 79, region: "IN", tag: "hashtag" },
  { id: "t7", name: "AI tools you didn't know", platform: "YouTube", niche: "Tech", growth: 168, engagement: 8.9, difficulty: 38, virality: 90, region: "Global", tag: "list" },
  { id: "t8", name: "Mini cafe walkthrough", platform: "Instagram", niche: "Food", growth: 88, engagement: 8.0, difficulty: 30, virality: 76, region: "EU", tag: "reel" },
  { id: "t9", name: "Pack with me — minimalist", platform: "TikTok", niche: "Travel", growth: 134, engagement: 8.3, difficulty: 26, virality: 85, region: "US", tag: "trend" },
  { id: "t10", name: "Founder Q&A in 30s", platform: "Instagram", niche: "Business", growth: 102, engagement: 7.7, difficulty: 36, virality: 81, region: "Global", tag: "reel" },
];

export const recommendations = [
  { id: "r1", title: "5 AI tools that will save you 10 hours this week", hook: "If you're still doing this manually in 2026…", format: "Reel · 45s", trendMatch: 94, competition: 38, virality: 91, fit: 96 },
  { id: "r2", title: "The 1-minute morning routine of fast-growing creators", hook: "Most creators do this wrong every morning.", format: "Short · 60s", trendMatch: 88, competition: 44, virality: 86, fit: 92 },
  { id: "r3", title: "I rebuilt my workflow with Notion + Linear — here's the result", hook: "My week went from chaos to ship-mode in 7 days.", format: "Long · 8m", trendMatch: 79, competition: 51, virality: 78, fit: 88 },
  { id: "r4", title: "POV: you finally found a content system that works", hook: "Three days. Zero burnout. Here's the system.", format: "Reel · 30s", trendMatch: 92, competition: 33, virality: 89, fit: 94 },
];

export const competitors = [
  { handle: "@alishaboe", platform: "Instagram", followers: 412000, avgViews: 218000, engagement: 6.4, postsPerWeek: 5, fit: 88 },
  { handle: "@thomasfrank", platform: "YouTube", followers: 3120000, avgViews: 412000, engagement: 4.2, postsPerWeek: 2, fit: 81 },
  { handle: "@minimalbeans", platform: "Instagram", followers: 184000, avgViews: 92000, engagement: 8.1, postsPerWeek: 7, fit: 92 },
  { handle: "@buildinpublic", platform: "TikTok", followers: 521000, avgViews: 305000, engagement: 9.0, postsPerWeek: 6, fit: 90 },
];

export const competitorSeries = [
  { week: "W1", you: 32, them: 41 },
  { week: "W2", you: 38, them: 44 },
  { week: "W3", you: 47, them: 46 },
  { week: "W4", you: 58, them: 49 },
  { week: "W5", you: 64, them: 52 },
  { week: "W6", you: 78, them: 55 },
];

export type CalendarItem = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  platform: string;
  status: "draft" | "ready" | "published";
};

export const calendarItems: CalendarItem[] = [
  { id: "c1", date: isoOffset(0), title: "AI tools roundup — Reel", platform: "Instagram", status: "ready" },
  { id: "c2", date: isoOffset(1), title: "Founder Q&A short", platform: "YouTube", status: "draft" },
  { id: "c3", date: isoOffset(2), title: "Morning routine carousel", platform: "Instagram", status: "ready" },
  { id: "c4", date: isoOffset(3), title: "Build in public update", platform: "TikTok", status: "draft" },
  { id: "c5", date: isoOffset(-1), title: "Notion + Linear workflow", platform: "YouTube", status: "published" },
  { id: "c6", date: isoOffset(-2), title: "POV: shipping day", platform: "Instagram", status: "published" },
  { id: "c7", date: isoOffset(5), title: "Pack with me — Lisbon", platform: "TikTok", status: "draft" },
];

function isoOffset(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const savedItems = [
  { id: "s1", type: "Trend", title: "Audio: 'Espresso' slowed", folder: "Audio" },
  { id: "s2", type: "Script", title: "5 AI tools — Reel", folder: "Scripts" },
  { id: "s3", type: "Idea", title: "Founder GRWM series", folder: "Series" },
  { id: "s4", type: "Competitor", title: "@minimalbeans", folder: "Watchlist" },
  { id: "s5", type: "Trend", title: "POV: a day in 60 seconds", folder: "Reels" },
  { id: "s6", type: "Script", title: "Notion workflow long-form", folder: "Scripts" },
];

export const notifications = [
  { id: "n1", text: "🔥 New viral trend in your niche: 'AI tools you didn't know'", time: "2m" },
  { id: "n2", text: "@minimalbeans posted a reel performing 3.2× their average.", time: "21m" },
  { id: "n3", text: "Your last reel passed 100k views.", time: "1h" },
  { id: "n4", text: "Weekly growth report is ready.", time: "3h" },
];

export const pricingPlans = [
  { name: "Free", price: 0, tag: "Get started", features: ["10 trend lookups / day", "5 AI scripts / month", "Basic analytics"], cta: "Start free" },
  { name: "Creator Pro", price: 29, tag: "Most popular", popular: true, features: ["Unlimited trends", "200 AI scripts / month", "Competitor tracking (5)", "Viral score engine", "Calendar + scheduler"], cta: "Upgrade" },
  { name: "Agency", price: 99, tag: "For teams", features: ["5 brand workspaces", "Unlimited scripts", "Competitor tracking (50)", "Priority AI", "Team analytics"], cta: "Start trial" },
  { name: "Enterprise", price: null, tag: "Custom", features: ["SSO + SAML", "Dedicated success manager", "Custom integrations", "SLA + audit logs"], cta: "Talk to sales" },
];

export const testimonials = [
  { name: "Aisha Patel", role: "Creator · 412k", quote: "CreatorPulse replaced 4 tools I was paying for. My reels hit viral 3× more often." },
  { name: "Diego Morales", role: "Founder · BuildLog", quote: "It's like having a growth strategist on call every morning." },
  { name: "Lin Wei", role: "Agency owner", quote: "We onboarded 12 creators in a week. The recommendations are scary good." },
];

export const faqs = [
  { q: "How does CreatorPulse find trends?", a: "We monitor signals across Instagram, YouTube, TikTok and Facebook in real time, then score them against your niche and audience." },
  { q: "Can I cancel anytime?", a: "Yes. Plans are month-to-month, and you can cancel from billing in one click." },
  { q: "Do you support teams?", a: "Yes — the Agency plan includes 5 brand workspaces with shared calendars and analytics." },
  { q: "Is there a free plan?", a: "Yes. The Free plan covers 10 trend lookups per day and 5 AI scripts per month, forever." },
];
