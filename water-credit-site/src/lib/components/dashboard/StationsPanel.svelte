<script lang="ts">
	import Panel from './Panel.svelte';
	import { stations, compact } from '$lib/data/overview';

	let { onClose, class: className = 'min-h-0 flex-1' }: { onClose?: () => void; class?: string } =
		$props();

	const sorted = [...stations].sort((a, b) => b.credits - a.credits);
</script>

<Panel title="Water Stations" icon="water" {onClose} class={className}>
	{#snippet header()}
		<span class="caption rounded-full bg-tertiary-bg px-2 py-0.5 text-secondary-fg tabular-nums">
			{stations.length}
		</span>
	{/snippet}

	<ul class="flex flex-col divide-y divide-border-faded">
		{#each sorted as s (s.id)}
			<li class="flex items-center gap-3 py-2.5">
				<span
					class="size-2 shrink-0 rounded-full {s.status === 'active'
						? 'bg-accent'
						: 'bg-tertiary-fg'}"
					title={s.status}
				></span>
				<div class="min-w-0 flex-1">
					<div class="body-medium truncate">{s.name}</div>
					<div class="caption text-tertiary-fg">{s.city}, {s.state}</div>
				</div>
				<div class="text-right">
					<div class="stat tabular-nums">{compact(s.credits)}</div>
					<div
						class="caption tabular-nums {s.status === 'active'
							? 'text-accent'
							: 'text-tertiary-fg'}"
					>
						{s.status === 'active' ? `+${s.rate}/h` : 'idle'}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</Panel>
