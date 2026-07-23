<script lang="ts">
	import { resolve } from '$app/paths';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<footer class="flex h-fit w-full items-center justify-between p-8">
	<div class="caption flex flex-row gap-4 text-tertiary-fg">
		<a href={resolve(`/?privacy`)}>Privacy Policy</a>
		<a href={resolve(`/?terms`)}>Terms of Service</a>
	</div>

	<ThemeToggle />
</footer>
