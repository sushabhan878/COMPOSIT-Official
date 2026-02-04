import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// More reasonable rate limit: 60 requests per minute per IP
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(20, "30 s"),
  analytics: true,
});
