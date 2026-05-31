import { useEffect, useState, useRef } from "react";
import { trends as seedTrends, metrics as seedMetrics, recommendations as seedRecs } from "./mock-data";

// --- Helpers ---------------------------------------------------------------

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function jitter(n: number, amt: number) {
  return n + (Math.random() - 0.5) * 2 * amt;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function relativeTime(from: number) {
  const diff = Math.max(1, Math.floor((Date.now() - from) / 1000));
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// --- Live trends -----------------------------------------------------------

export function useLiveTrends(intervalMs = 4000) {
  const [data, setData] = useState(() =>
    seedTrends.map((t) => ({ ...t, momentum: Math.random() > 0.5 ? 1 : -1, lastChange: 0 })),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((t) => {
          const dir = Math.random() < 0.55 ? 1 : -1;
          const growth = clamp(Math.round(jitter(t.growth, 6)), 12, 420);
          const virality = clamp(Math.round(jitter(t.virality, 2)), 40, 99);
          const engagement = +clamp(jitter(t.engagement, 0.2), 3, 10).toFixed(1);
          return { ...t, growth, virality, engagement, momentum: dir, lastChange: Date.now() };
        }),
      );
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return data;
}

// --- Live metrics ----------------------------------------------------------

export function useLiveMetrics(intervalMs = 3500) {
  const [data, setData] = useState(seedMetrics);
  useEffect(() => {
    const id = setInterval(() => {
      setData((m) => ({
        views: m.views + Math.floor(Math.random() * 320 + 40),
        followers: m.followers + Math.floor(Math.random() * 9 - 1),
        engagement: +clamp(jitter(m.engagement, 0.08), 4, 11).toFixed(2),
        growth: +clamp(jitter(m.growth, 0.3), 4, 24).toFixed(1),
        trendingScore: clamp(Math.round(jitter(m.trendingScore, 1.2)), 60, 99),
      }));
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return data;
}

// --- Live activity feed ----------------------------------------------------

const activityTemplates: { icon: string; text: () => string }[] = [
  { icon: "🔥", text: () => `New viral trend detected: "${pick(["AI side hustles", "POV: founder life", "Silent vlog series", "Reels under 8s", "Carousel storytelling"])}"` },
  { icon: "📈", text: () => `Viral score updated for "${pick(["Morning routine", "Founder GRWM", "AI tools roundup", "Pack with me"])}" → ${Math.floor(Math.random() * 20 + 75)}/100` },
  { icon: "👀", text: () => `Competitor @${pick(["minimalbeans", "thomasfrank", "buildinpublic", "alishaboe"])} posted ${Math.floor(Math.random() * 4 + 1)} new pieces` },
  { icon: "#️⃣", text: () => `Hashtag #${pick(["MorningRoutine2026", "AItools", "SideHustle", "BuildInPublic", "ReelsIndia"])} gaining traction (+${Math.floor(Math.random() * 80 + 20)}%)` },
  { icon: "✨", text: () => `Pulse AI generated ${Math.floor(Math.random() * 6 + 3)} new recommendations for your niche` },
  { icon: "🎵", text: () => `Trending audio: "${pick(["Espresso (slowed)", "Houdini remix", "Birds of a Feather", "Cruel Summer instrumental"])}"` },
  { icon: "🌍", text: () => `Trend rising in ${pick(["Maharashtra", "California", "Berlin", "London", "Mumbai"])}` },
];

export type ActivityEvent = { id: string; icon: string; text: string; ts: number };

export function useLiveActivity(intervalMs = 5500, max = 8) {
  const [events, setEvents] = useState<ActivityEvent[]>(() =>
    Array.from({ length: 5 }).map((_, i) => {
      const t = pick(activityTemplates);
      return { id: `seed-${i}`, icon: t.icon, text: t.text(), ts: Date.now() - (i + 1) * 60_000 * (i + 1) };
    }),
  );
  useEffect(() => {
    const id = setInterval(() => {
      const t = pick(activityTemplates);
      setEvents((prev) =>
        [{ id: `${Date.now()}-${Math.random()}`, icon: t.icon, text: t.text(), ts: Date.now() }, ...prev].slice(0, max),
      );
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, max]);
  return events;
}

// --- Now-tick for relative timestamps --------------------------------------

export function useNowTick(intervalMs = 1000) {
  const [, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((n) => n + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}

// --- Daily briefing --------------------------------------------------------

export type Briefing = {
  generatedAt: number;
  trendingTopics: { name: string; growth: number; platform: string }[];
  risingTrends: { name: string; momentum: number }[];
  viralOpportunities: { title: string; score: number }[];
  trendingAudio: { name: string; uses: number }[];
  trendingHashtags: { tag: string; volume: string }[];
  bestTimes: { platform: string; time: string }[];
  aiPicks: { title: string; reason: string }[];
};

function buildBriefing(): Briefing {
  return {
    generatedAt: Date.now(),
    trendingTopics: [
      { name: "AI Tools", growth: 168 + Math.floor(Math.random() * 40), platform: "YouTube" },
      { name: "Side Hustles", growth: 142 + Math.floor(Math.random() * 30), platform: "Instagram" },
      { name: "Fitness Challenges", growth: 124 + Math.floor(Math.random() * 25), platform: "TikTok" },
      { name: "Instagram Growth", growth: 98 + Math.floor(Math.random() * 30), platform: "Instagram" },
      { name: "Remote Jobs", growth: 88 + Math.floor(Math.random() * 20), platform: "YouTube" },
    ],
    risingTrends: [
      { name: "Silent vlog series", momentum: 92 },
      { name: "Founder GRWM", momentum: 88 },
      { name: "Carousel storytelling", momentum: 81 },
    ],
    viralOpportunities: [
      { title: "5 AI tools you didn't know existed", score: 94 },
      { title: "POV: a founder's morning in 60s", score: 91 },
      { title: "How I plan a week in Notion", score: 87 },
    ],
    trendingAudio: [
      { name: "Espresso — slowed", uses: 412_300 },
      { name: "Birds of a Feather", uses: 308_900 },
      { name: "Houdini — remix", uses: 224_100 },
    ],
    trendingHashtags: [
      { tag: "#MorningRoutine2026", volume: "1.2M" },
      { tag: "#AItools", volume: "884k" },
      { tag: "#BuildInPublic", volume: "612k" },
      { tag: "#SideHustle", volume: "498k" },
    ],
    bestTimes: [
      { platform: "Instagram", time: "7:42 PM IST" },
      { platform: "YouTube", time: "11:15 AM IST" },
      { platform: "TikTok", time: "9:30 PM IST" },
    ],
    aiPicks: [
      ...seedRecs.slice(0, 3).map((r) => ({ title: r.title, reason: `Trend match ${r.trendMatch} · low competition` })),
    ],
  };
}

export function useDailyBriefing(refreshMs = 45_000) {
  const [briefing, setBriefing] = useState<Briefing>(() => buildBriefing());
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    const id = setInterval(() => setBriefing(buildBriefing()), refreshMs);
    return () => clearInterval(id);
  }, [refreshMs]);
  return briefing;
}
