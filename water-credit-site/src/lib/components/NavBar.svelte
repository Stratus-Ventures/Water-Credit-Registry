<script lang="ts">

    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import type { Pathname } from '$app/types';
    import Icon from './Icon.svelte';
    import ToolTip from './ToolTip.svelte';
    import { onMount } from 'svelte';

    let mounted = $state(false);
    onMount(() => (mounted = true));

    const tabs = [
        { id: 0, icon: 'globe', name: 'Overview', page: '/overview' },
        { id: 1, icon: 'coin', name: 'Credits', page: '/credits' },
        { id: 2, icon: 'water', name: 'Water Stations', page: '/water-stations' },
        { id: 3, icon: 'info', name: 'About', page: '/about' },
        { id: 4, icon: 'wallet', name: 'Wallet', page: '/wallet' },
    ] satisfies { id: number; icon: string; name: string; page: Pathname }[];

    // Compare pathnames directly rather than `page.url.pathname === resolve(t.page)`.
    // With SvelteKit's relative-path resolution, both `resolve()` and `base` return
    // *relative* values during SSR (e.g. "./water-stations", base === "."), so the
    // equality never matched server-side — the highlight rendered mispositioned and
    // only corrected on hydration (the pop-in). `t.page` is already the absolute app
    // path and no base path is configured, so this matches identically in SSR and on
    // the client. (If a base path is ever added, prefix it here.)
    const activeIndex = $derived(
		tabs.findIndex((t) => page.url.pathname === t.page)
	);

</script>

<nav class="
    fixed bottom-8 sm:bottom-16 left-0 right-0 z-40
    flex flex-row justify-center items-center
    w-fit h-fit p-1 rounded-full bg-button-bg mx-auto
    text-inverted-primary-fg shadow-card dark:shadow-none"
>
    <!-- Selection highlight. Always rendered (positioned at the active tab in SSR
         too) so there's no pop-in on load. The `transition-transform` class is added
         only after mount, so the browser never animates the pill's initial value —
         no slide-in from tab 0 — while clicks still animate once mounted.
         `transform` (not the standalone `translate` property) so mobile engines
         reliably composite it on the GPU instead of repainting on the main thread;
         `will-change-transform` promotes the layer without being overridden by the
         inline transform. Invariant: size == button, no gap, offset (top/left-1) == p-1. -->

    <span
		class="absolute top-1 left-1 z-0 size-13 sm:size-10 rounded-full pointer-events-none
		       bg-inverted-tertiary-bg ease-snappy duration-base will-change-transform
		       {mounted ? 'transition-transform' : ''}"
		style:transform={`translateX(${activeIndex * 100}%)`}
		style:opacity={activeIndex < 0 ? '0' : '1'}
		aria-hidden="true"
	></span>

    {#each tabs as tab, i (tab.id)}
        {@const active = i === activeIndex}

        <button
            class="
                group relative z-10 hover:z-30 active:z-30 focus-within:z-30
                size-13 sm:size-10 grid place-items-center rounded-full
                transition-colors ease-snappy duration-fast
                { active ? 'text-inverted-primary-fg' : 'text-inverted-secondary-fg hover:text-inverted-primary-fg' }"
            aria-label={'Go to ' + tab.name + ' page'}
            aria-current={active ? 'page' : undefined}
            onclick={() => goto(resolve(tab.page))}>
            <ToolTip text={tab.name}/>
            <Icon name={tab.icon} class="size-7 sm:size-6"/>
        </button>
    {/each}
</nav>
