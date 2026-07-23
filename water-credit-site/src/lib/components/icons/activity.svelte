<script lang="ts">
	let { ...props }: Record<string, unknown> = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.75"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...props}
>
	<path d="M3 12h4l2.5 7 5-14L17 12h4" />
</svg>
