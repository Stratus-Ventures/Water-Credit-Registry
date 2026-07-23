<script lang="ts">
	import Sun from '$lib/components/icons/sun.svelte';
	import Moon from '$lib/components/icons/moon.svelte';
	import { theme, toggleTheme } from '$lib/stores/themeStore';

	let isHovered = $state(false);
</script>

<button
	class="
      flex h-fit w-fit cursor-pointer items-center justify-center p-1"
	aria-label="Toggle theme"
	onclick={toggleTheme}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	{#if $theme === 'light'}
		<Sun
			size={18}
			color={isHovered ? 'var(--color-primary-fg)' : 'var(--color-tertiary-fg)'}
			{isHovered}
		/>
	{:else}
		<Moon
			size={18}
			color={isHovered ? 'var(--color-primary-fg)' : 'var(--color-tertiary-fg)'}
			{isHovered}
		/>
	{/if}
</button>
