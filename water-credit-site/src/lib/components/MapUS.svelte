<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { theme } from '$lib/stores/themeStore';
	import { projectUS, type Station } from '$lib/data/overview';

	let { stations = [] }: { stations?: Station[] } = $props();

	let container: HTMLDivElement;
	let useMapbox = $state(false); // flips true only if a token + the lib both load

	// Mapbox is optional: set PUBLIC_MAPBOX_TOKEN to render the real US basemap.
	// Without a token we fall back to the styled projection below — no network needed.
	onMount(() => {
		const token = env.PUBLIC_MAPBOX_TOKEN;
		if (!token || !container) return;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let map: any;
		let cancelled = false;

		(async () => {
			try {
				if (!document.querySelector('link[data-mapbox]')) {
					const link = document.createElement('link');
					link.rel = 'stylesheet';
					link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.1/mapbox-gl.css';
					link.dataset.mapbox = 'true';
					document.head.appendChild(link);
				}
				// URL held in a variable so Vite/TS don't try to resolve it at build time —
				// it's a runtime browser import from the CDN.
				const cdn = 'https://esm.sh/mapbox-gl@3.9.1';
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const mapbox: any = await import(/* @vite-ignore */ cdn);
				const gl = mapbox.default ?? mapbox;
				if (cancelled) return;
				gl.accessToken = token;

				const style = () =>
					$theme === 'dark'
						? 'mapbox://styles/mapbox/dark-v11'
						: 'mapbox://styles/mapbox/light-v11';

				map = new gl.Map({
					container,
					style: style(),
					center: [-96, 38.5],
					zoom: 3.4,
					attributionControl: false,
					interactive: true
				});

				useMapbox = true;

				map.on('load', () => {
					for (const s of stations) {
						const el = document.createElement('div');
						el.className = 'mapbox-station-dot';
						el.dataset.status = s.status;
						new gl.Marker({ element: el }).setLngLat([s.lng, s.lat]).addTo(map);
					}
				});
			} catch {
				// Any failure (blocked network, bad token) → keep the styled fallback.
				useMapbox = false;
			}
		})();

		return () => {
			cancelled = true;
			map?.remove();
		};
	});
</script>

<div class="absolute inset-0 overflow-hidden">
	<!-- Real Mapbox basemap mounts here when a token is present. -->
	<div bind:this={container} class="absolute inset-0 h-full w-full"></div>

	{#if !useMapbox}
		<!-- Styled fallback: an abstract US "control room" map. Dark radial field, a
		     faint graticule, and glowing station nodes placed by lng/lat projection. -->
		<div class="map-field pointer-events-none absolute inset-0">
			<svg
				class="absolute inset-0 h-full w-full opacity-[0.35]"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<defs>
					<pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
						<path d="M56 0H0V56" fill="none" stroke="var(--color-border)" stroke-width="1" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>

			<span
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13vw]
				       leading-none font-semibold tracking-[0.35em] text-primary-fg/[0.035] uppercase
				       select-none md:text-[10vw]"
			>
				USA
			</span>

			<!-- Station nodes -->
			{#each stations as s (s.id)}
				{@const p = projectUS(s.lng, s.lat)}
				<span
					class="absolute -translate-x-1/2 -translate-y-1/2"
					style:left={`${p.x * 100}%`}
					style:top={`${p.y * 100}%`}
				>
					{#if s.status === 'active'}
						<span class="absolute inset-0 -m-1.5 animate-ping rounded-full bg-accent/40"></span>
					{/if}
					<span
						class="relative block size-2.5 rounded-full ring-2 ring-primary-bg
						       {s.status === 'active' ? 'bg-accent' : 'bg-tertiary-fg'}"
						title={`${s.name} — ${s.city}, ${s.state}`}
					></span>
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* A soft, dashboard-y depth field behind the grid. Works in both themes because
	   it layers over the theme background token. */
	.map-field {
		background:
			radial-gradient(120% 90% at 50% 8%, var(--color-accent-faded) 0%, transparent 42%),
			radial-gradient(
				80% 70% at 82% 88%,
				color-mix(in oklch, var(--color-accent) 18%, transparent) 0%,
				transparent 45%
			),
			var(--color-secondary-bg);
	}

	/* Markers injected by Mapbox get styled globally (they live outside this component). */
	:global(.mapbox-station-dot) {
		width: 10px;
		height: 10px;
		border-radius: 9999px;
		background: var(--color-accent);
		box-shadow:
			0 0 0 2px var(--color-primary-bg),
			0 0 12px 2px var(--color-accent-faded);
	}
	:global(.mapbox-station-dot[data-status='idle']) {
		background: var(--color-tertiary-fg);
		box-shadow: 0 0 0 2px var(--color-primary-bg);
	}
</style>
