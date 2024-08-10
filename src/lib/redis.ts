import { Redis } from "@upstash/redis";

// Initialize a Redis client using environment variables for configuration
export const redis = Redis.fromEnv();
