<script lang="ts">
	import Panel from './Panel.svelte';
	import { compact, totalCredits, totalRate, activeStations } from '$lib/data/overview';

	let { onClose, class: className = 'shrink-0' }: { onClose?: () => void; class?: string } =
		$props();

	// Count up to the total on mount for a bit of life.
	import { onMount } from 'svelte';
	let shown = $state(0);
	onMount(() => {
		const start = performance.now();
		const dur = 900;
		let raf = 0;
		const tick = (t: number) => {
			const k = Math.min(1, (t - start) / dur);
			const eased = 1 - Math.pow(1 - k, 3);
			shown = Math.round(totalCredits * eased);
			if (k < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<Panel title="Total Credits" icon="coin" {onClose} class={className}>
	<p class="stat text-tertiary-fg">Registry-wide, all stations</p>

	<div class="mt-1 flex items-baseline gap-2">
		<span class="hero-number leading-none tabular-nums">{shown.toLocaleString()}</span>
	</div>

	<div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
		<div>
			<div class="metric leading-none text-accent tabular-nums">+{totalRate}</div>
			<div class="caption mt-1 text-tertiary-fg">credits / hour</div>
		</div>
		<div>
			<div class="metric leading-none tabular-nums">{activeStations}</div>
			<div class="caption mt-1 text-tertiary-fg">active stations</div>
		</div>
	</div>

	<!-- tiny inline trend bars -->
	<div class="mt-4 flex h-10 items-end gap-1" aria-hidden="true">
		{#each [38, 52, 44, 61, 55, 72, 66, 80, 74, 91, 88, 100] as h, i (i)}
			<span class="flex-1 rounded-sm bg-accent/70" style:height={`${h}%`}></span>
		{/each}
	</div>
	<p class="caption mt-2 text-tertiary-fg">
		Minted over the last 12 hours · {compact(totalCredits)} lifetime
	</p>
</Panel>
