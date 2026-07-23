<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';

	let {
		title,
		icon,
		onClose,
		class: className = '',
		header,
		children
	}: {
		title: string;
		icon?: string;
		onClose?: () => void;
		class?: string;
		header?: Snippet; // optional extra controls on the right of the header
		children: Snippet;
	} = $props();
</script>

<!-- Floating "window" — frosted glass over the map, GitHub-HQ style. -->
<section
	class="frosted-glass pointer-events-auto flex min-h-0 flex-col overflow-hidden
	       rounded-2xl border border-border-faded shadow-card dark:shadow-none {className}"
>
	<header class="flex shrink-0 items-center gap-2 px-4 pt-3 pb-2">
		{#if icon}<Icon name={icon} class="size-4 text-secondary-fg" />{/if}
		<h4 class="min-w-0 flex-1 truncate">{title}</h4>
		{@render header?.()}
		{#if onClose}
			<button
				class="grid size-6 place-items-center rounded-full text-tertiary-fg
				       hover:bg-tertiary-bg hover:text-primary-fg"
				aria-label={`Close ${title}`}
				onclick={onClose}
			>
				<Icon name="close" class="size-3.5" />
			</button>
		{/if}
	</header>
	<div class="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
		{@render children()}
	</div>
</section>
