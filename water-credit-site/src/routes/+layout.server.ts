import type { LayoutServerLoad } from './$types';

// Expose the logged-in user (from hooks.server.ts locals) to every page via
// page.data, so the client — e.g. the NavBar CTA — can react to auth state.
export const load: LayoutServerLoad = async ({ locals }) => {
	return { user: locals.user ?? null };
};
