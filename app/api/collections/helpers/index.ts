import { createClient } from 'redis';
import { template } from "./template";

const REDIS_KEY = 'collections';
const REDIS_URL = process.env.REDIS_URL || '';

async function getRedis() {
    return await createClient({
        url: REDIS_URL,
    }).connect();
}

export async function saveCollections(data: any) {
    await (await getRedis()).set(REDIS_KEY, JSON.stringify(data));
}

export async function readCollections() {
    const r = await (await getRedis()).get(REDIS_KEY);
    if (!r) {
        await saveCollections(template)
        return template;
    }
    try {
        return JSON.parse(r);
    } catch {
        return;
    }
}