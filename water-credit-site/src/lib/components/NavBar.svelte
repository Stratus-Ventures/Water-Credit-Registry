<script lang="ts">

    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import type { Pathname } from '$app/types';
    import Icon from './Icon.svelte';
    import ToolTip from './ToolTip.svelte';
    import { onMount } from 'svelte';

    // Flip after first paint so the highlight scales in (scale-0 → scale-100)
    // on load, instead of being there instantly or sliding in from tab 0.
    let mounted = $state(false);
    onMount(() => (mounted = true));

    const tabs = [
        { id: 0, icon: 'globe', name: 'Overview', page: '/overview' },
        { id: 1, icon: 'coin', name: 'Credits', page: '/credits' },
        { id: 2, icon: 'water', name: 'Water Stations', page: '/water-stations' },
        { id: 3, icon: 'info', name: 'About', page: '/about' },
        { id: 4, icon: 'wallet', name: 'Wallet', page: '/wallet' },
    ] satisfies { id: number; icon: string; name: string; page: Pathname }[];

    const activeIndex = $derived(
        tabs.findIndex((t) => page.url.pathname === resolve(t.page))
    );

</script>

<nav class="
    fixed bottom-12 sm:bottom-16 left-0 right-0 z-40
    flex flex-row justify-center items-center
    w-fit h-fit p-1 mx-auto rounded-full bg-button-bg
    text-inverted-primary-fg shadow-card dark:shadow-none"
>
    <!-- Selection highlight. Positioned with the `translate` property so `scale`
         is free to animate independently: scales in on load, scales out on non-tab
         pages, and slides between tabs. transition-transform covers translate+scale.
         Invariant: size == button, no gap between buttons, offset (top/left-1) == p-1. -->
    <span
        class="absolute top-1 left-1 z-0 size-13 sm:size-10 rounded-full pointer-events-none
               bg-inverted-tertiary-bg transition-transform ease-snappy duration-base
               {mounted && activeIndex >= 0 ? 'scale-100' : 'scale-0'}"
        style:translate={`${activeIndex * 100}% 0`}
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
