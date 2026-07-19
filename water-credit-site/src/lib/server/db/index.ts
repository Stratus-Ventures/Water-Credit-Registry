import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Lazily create the client so importing this module never connects (or throws)
// at load time. SvelteKit's build/analyse step imports server modules, but
// DATABASE_URL is only present at runtime — so we defer until first use.
let _db: ReturnType<typeof drizzle<typeof schema>> | undefined;

function getDb() {
	if (!_db) {
		if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
		const client = postgres(env.DATABASE_URL);
		_db = drizzle(client, { schema });
	}
	return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
	get(_target, prop, receiver) {
		return Reflect.get(getDb(), prop, receiver);
	}
});
