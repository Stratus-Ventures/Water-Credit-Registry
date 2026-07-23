<script lang="ts">
	import MapUS from '$lib/components/MapUS.svelte';
	import TopBar, { type WindowKey } from '$lib/components/dashboard/TopBar.svelte';
	import MetricPanel from '$lib/components/dashboard/MetricPanel.svelte';
	import StationsPanel from '$lib/components/dashboard/StationsPanel.svelte';
	import FeedPanel from '$lib/components/dashboard/FeedPanel.svelte';
	import { stations } from '$lib/data/overview';

	// All windows start open; the top bar toggles them.
	let windows = $state<Record<WindowKey, boolean>>({
		metric: true,
		stations: true,
		feed: true
	});
	const toggle = (key: WindowKey) => (windows[key] = !windows[key]);
	const close = (key: WindowKey) => (windows[key] = false);

	const leftOpen = $derived(windows.metric || windows.stations);
</script>

<svelte:head>
	<title>Overview · Water Credit Registry</title>
</svelte:head>

<!-- The whole dashboard lives inside ONE section: the map fills it, and every panel
     (metric, stations, feed) + the top bar float on top of the map, inside the section. -->
<section class="relative h-[100svh] w-full overflow-hidden">
	<MapUS {stations} />

	<!-- ========================= DESKTOP / TABLET ========================= -->
	<!-- Overlay is click-through; only the panels/top bar capture pointer events, so
	     the map stays draggable through the gaps. Row order: [left][top bar][right]. -->
	<div class="pointer-events-none absolute inset-0 hidden p-3 md:block">
		<div class="flex h-full gap-3">
			<!-- LEFT COLUMN — big metric on top, stations below -->
			{#if leftOpen}
				<div class="flex w-72 min-w-0 flex-col gap-3 lg:w-80">
					{#if windows.metric}
						<MetricPanel onClose={() => close('metric')} />
					{/if}
					{#if windows.stations}
						<StationsPanel onClose={() => close('stations')} />
					{/if}
				</div>
			{/if}

			<!-- CENTER — top bar sits on top of the map; map shows through below it -->
			<div class="flex min-w-0 flex-1 flex-col items-center">
				<div class="pointer-events-auto">
					<TopBar {windows} {toggle} />
				</div>
				<div class="flex-1"></div>
			</div>

			<!-- RIGHT COLUMN — live credit creation feed -->
			{#if windows.feed}
				<div class="flex w-80 min-w-0 flex-col">
					<FeedPanel onClose={() => close('feed')} />
				</div>
			{/if}
		</div>
	</div>

	<!-- ============================== MOBILE ============================== -->
	<!-- Same pieces, restacked: sticky top bar, then windows stacked over the map
	     backdrop in a single scroll column. Order: Credits → Feed → Stations. -->
	<div class="absolute inset-0 flex flex-col md:hidden">
		<div class="shrink-0 px-3 pt-3">
			<TopBar {windows} {toggle} />
		</div>

		<div class="min-h-0 flex-1 overflow-y-auto px-3 pt-3 pb-28">
			<div class="flex flex-col gap-3">
				{#if windows.metric}
					<MetricPanel onClose={() => close('metric')} class="shrink-0" />
				{/if}
				{#if windows.feed}
					<FeedPanel onClose={() => close('feed')} class="max-h-[55svh] shrink-0" />
				{/if}
				{#if windows.stations}
					<StationsPanel onClose={() => close('stations')} class="max-h-[60svh] shrink-0" />
				{/if}

				{#if !windows.metric && !windows.feed && !windows.stations}
					<p class="stat mt-8 text-center text-tertiary-fg">
						All windows closed — reopen them from the bar above.
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>
