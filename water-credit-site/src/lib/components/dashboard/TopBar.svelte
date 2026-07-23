<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export type WindowKey = 'metric' | 'stations' | 'feed';

	let {
		windows,
		toggle
	}: {
		windows: Record<WindowKey, boolean>;
		toggle: (key: WindowKey) => void;
	} = $props();

	const chips: { key: WindowKey; icon: string; label: string; short: string }[] = [
		{ key: 'metric', icon: 'coin', label: 'Total Credits', short: 'Credits' },
		{ key: 'feed', icon: 'activity', label: 'Live Feed', short: 'Feed' },
		{ key: 'stations', icon: 'water', label: 'Stations', short: 'Stations' }
	];
</script>

<div
	class="frosted-glass pointer-events-auto flex items-center gap-2 rounded-full
	       border border-border-faded px-2 py-1.5 shadow-card dark:shadow-none"
>
	<div class="hidden items-center gap-2 pr-1 pl-2 lg:flex">
		<Icon name="globe" class="size-4 text-accent" />
		<span class="body-medium whitespace-nowrap">Registry Overview</span>
		<span class="mx-1 h-4 w-px bg-border-faded"></span>
	</div>

	<div class="flex items-center gap-1">
		{#each chips as c (c.key)}
			{@const on = windows[c.key]}
			<button
				class="group flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors
				       {on
					? 'bg-button-bg text-inverted-primary-fg'
					: 'text-secondary-fg hover:bg-tertiary-bg hover:text-primary-fg'}"
				aria-pressed={on}
				aria-label={`${on ? 'Hide' : 'Show'} ${c.label}`}
				onclick={() => toggle(c.key)}
			>
				<Icon name={c.icon} class="size-4" />
				<span class="stat whitespace-nowrap">
					<span class="hidden sm:inline">{c.label}</span>
					<span class="sm:hidden">{c.short}</span>
				</span>
				<span
					class="ml-0.5 size-1.5 rounded-full {on ? 'bg-accent' : 'bg-transparent'}"
					aria-hidden="true"
				></span>
			</button>
		{/each}
	</div>
</div>
