import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

await redis.set("foo", "bar");
await redis.get("foo");

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "5 s"),
});
