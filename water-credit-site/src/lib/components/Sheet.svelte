<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { trapFocus, dragDismiss } from '$lib/actions/overlay';

	let { open = $bindable(false), title = '', children }: {
		open?: boolean;
		title?: string;
		children?: Snippet;
	} = $props();

	const close = () => (open = false);

	// Lock body scroll while the sheet is open.
	$effect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => { document.body.style.overflow = prev; };
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && close()} />

{#if open}
	<!-- Backdrop: dark scrim + blur; click to dismiss. -->
	<div
		class="fixed inset-0 z-50 flex items-end justify-center sm:items-center
		       bg-black/30 backdrop-blur-sm"
		transition:fade={{ duration: 150 }}
		onclick={close}
		role="presentation"
	>
		<!-- Panel: bottom sheet on mobile, centered card on desktop. -->
		<div
			class="relative w-full sm:max-w-md max-h-[85vh] overflow-y-auto
			       bg-primary-bg text-primary-fg shadow-card
			       rounded-t-3xl sm:rounded-3xl p-6 pb-8"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			transition:fly={{ y: 24, duration: 220, easing: cubicOut }}
			onclick={(e) => e.stopPropagation()}
			use:trapFocus
			use:dragDismiss={{ onDismiss: close }}
		>
			<!-- Drag handle (mobile only) — grab to drag the sheet down and dismiss. -->
			<div
				data-drag-handle
				class="sm:hidden mx-auto -mt-2 mb-4 h-1.5 w-10 rounded-full bg-tertiary-bg
				       cursor-grab touch-none active:cursor-grabbing"
			></div>

			{#if title}<h2 class="mb-4">{title}</h2>{/if}
			{@render children?.()}
		</div>
	</div>
{/if}
