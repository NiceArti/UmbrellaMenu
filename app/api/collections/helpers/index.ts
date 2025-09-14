import { createClient, RedisClientType } from "redis";
import { template } from "./template";

const REDIS_KEY = "collections";
const REDIS_URL = process.env.REDIS_URL || "";

// Reuse a single client instance across invocations (important for Vercel serverless)
let redisClient: RedisClientType | undefined;

async function getRedis(): Promise<RedisClientType> {
  if (redisClient && redisClient.isOpen) return redisClient;
  if (!REDIS_URL) throw new Error("Missing REDIS_URL");
  redisClient = createClient({
    url: REDIS_URL,
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 50, 500),
    },
  });
  redisClient.on("error", (err) => console.error("Redis error:", err));
  await redisClient.connect();
  return redisClient;
}

export async function saveCollections(data: any) {
  const client = await getRedis();
  const payload = JSON.stringify(data);
  await client.set(REDIS_KEY, payload);
}

export async function readCollections() {
  const client = await getRedis();
  const r = await client.get(REDIS_KEY);
  if (!r) {
    await saveCollections(template);
    return template;
  }
  try {
    return JSON.parse(r);
  } catch (e) {
    console.error("Failed to parse collections JSON from Redis:", e);
    // Reset to template on parse error to avoid corrupted state
    await saveCollections(template);
    return template;
  }
}
