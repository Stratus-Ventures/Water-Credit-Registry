<script lang="ts">
	let { text, class: className = '' }: { text: string; class?: string } = $props();
</script>

<!-- Hidden by default. Touch only: when its tab becomes selected (aria-current),
     flash for 1.5s then hide. Keyboard focus still reveals it for a11y. -->
<span
	role="tooltip"
	class="
		pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-2 opacity-0
		whitespace-nowrap rounded-full px-2.5 py-1 text-sm font-medium
		bg-button-bg text-inverted-primary-fg shadow-card
		transition ease-snappy duration-base
		group-focus-visible:translate-y-0 group-focus-visible:opacity-100
		pointer-coarse:group-aria-[current=page]:animate-tooltip-flash
		{className}"
>
	{text}
</span>
