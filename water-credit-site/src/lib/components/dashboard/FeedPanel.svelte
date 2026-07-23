<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Panel from './Panel.svelte';
	import { seedEvents, makeEvent, ago, type CreditEvent } from '$lib/data/overview';

	let { onClose, class: className = 'min-h-0 flex-1' }: { onClose?: () => void; class?: string } =
		$props();

	let events = $state<CreditEvent[]>([]);
	let now = $state(0);

	onMount(() => {
		now = Date.now();
		events = seedEvents(now);

		// New credit event on a jittered cadence.
		let addTimer: ReturnType<typeof setTimeout>;
		const schedule = () => {
			addTimer = setTimeout(
				() => {
					now = Date.now();
					events = [makeEvent(now), ...events].slice(0, 30);
					schedule();
				},
				1600 + Math.random() * 2600
			);
		};
		schedule();

		// Tick relative timestamps once a second.
		const clock = setInterval(() => (now = Date.now()), 1000);

		return () => {
			clearTimeout(addTimer);
			clearInterval(clock);
		};
	});
</script>

<Panel title="Live Credit Feed" icon="activity" {onClose} class={className}>
	{#snippet header()}
		<span class="caption inline-flex items-center gap-1.5 text-secondary-fg">
			<span class="relative flex size-2">
				<span class="absolute inline-flex size-full animate-ping rounded-full bg-accent/70"></span>
				<span class="relative inline-flex size-2 rounded-full bg-accent"></span>
			</span>
			Live
		</span>
	{/snippet}

	<ul class="flex flex-col gap-1.5">
		{#each events as e (e.id)}
			<li
				animate:flip={{ duration: 260 }}
				in:fly={{ y: -8, duration: 220 }}
				class="flex items-center gap-3 rounded-xl bg-primary-bg/40 px-3 py-2"
			>
				<span class="size-2 shrink-0 rounded-full bg-accent"></span>
				<div class="min-w-0 flex-1">
					<div class="stat truncate">{e.station.name}</div>
					<div class="caption text-tertiary-fg">
						{e.station.city}, {e.station.state} · {ago(e.at, now)}
					</div>
				</div>
				<div class="body-medium shrink-0 text-accent tabular-nums">+{e.amount}</div>
			</li>
		{/each}
	</ul>
</Panel>
