import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';

// Construct better-auth lazily. Calling betterAuth() reads BETTER_AUTH_SECRET /
// ORIGIN and throws if they're missing — but SvelteKit's build/analyse step
// imports this module while those env vars are only present at runtime. Deferring
// construction to first use keeps the build working and fails loudly at runtime
// if config is genuinely absent.
type Auth = ReturnType<typeof betterAuth>;
let _auth: Auth | undefined;

function getAuth(): Auth {
	if (!_auth) {
		_auth = betterAuth({
			baseURL: env.ORIGIN,
			secret: env.BETTER_AUTH_SECRET,
			database: drizzleAdapter(db, { provider: 'pg' }),
			emailAndPassword: { enabled: true },
			plugins: [
				sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
			]
		});
	}
	return _auth;
}

export const auth = new Proxy({} as Auth, {
	get(_target, prop, receiver) {
		return Reflect.get(getAuth(), prop, receiver);
	}
});
