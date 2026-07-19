<script lang="ts">
	let { text, class: className = '' }: { text: string; class?: string } = $props();
</script>

<!-- Hidden by default. Revealed on hover (desktop — v4 gates hover to hover-capable
     devices), keyboard focus, and on touch tap via `pointer-coarse:group-active`. -->
<span
	role="tooltip"
	class="
		pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-2 opacity-0
		whitespace-nowrap rounded-full px-2.5 py-1 text-sm font-medium
		bg-button-bg text-inverted-primary-fg shadow-card
		transition ease-snappy duration-base
		group-hover:translate-y-0 group-hover:opacity-100
		group-focus-visible:translate-y-0 group-focus-visible:opacity-100
		pointer-coarse:group-active:translate-y-0 pointer-coarse:group-active:opacity-100
		{className}"
>
	{text}
</span>
