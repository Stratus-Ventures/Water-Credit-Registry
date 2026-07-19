<script lang="ts">
	import type { Component } from 'svelte';

	const icons = import.meta.glob('./icons/*.svelte', {
		eager: true,
		import: 'default'
	}) as Record<string, Component>;

	let {
		name,
		class: className = 'size-6',
	}: { name: string; class?: string } = $props();

	const SvgIcon = $derived(icons[`./icons/${name}.svelte`]);
</script>

{#if SvgIcon}
	<SvgIcon class={className} aria-hidden="true" />
{:else}
	<span class="inline-flex {className} justify-center items-center" title={`Missing icon: ${name}`}>?</span>
{/if}
