<script lang="ts">

    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import type { Pathname } from '$app/types';
    import Icon from './Icon.svelte';
    import ToolTip from './ToolTip.svelte';

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

<!-- BOTTOM NAVBAR -->
<nav class="
    fixed bottom-16 left-0 right-0 z-40
    flex flex-row justify-center items-center
    w-fit h-fit p-1 mx-auto rounded-full
    bg-button-bg text-inverted-primary-fg shadow-card dark:shadow-none"
>
    <!-- Sliding selection circle — tabs are equal width, so shift one tab per index. -->
    <span
        class="absolute top-1 left-1 z-0 size-12 sm:size-10 rounded-full pointer-events-none
               bg-inverted-tertiary-bg transition-[transform,opacity] ease-snappy duration-base"
        style:transform={`translateX(${activeIndex * 100}%)`}
        style:opacity={activeIndex < 0 ? '0' : '1'}
        aria-hidden="true"
    ></span>

    {#each tabs as tab, i (tab.id)}
        {@const active = i === activeIndex}

        <button
            class="
                group relative z-10 hover:z-30 active:z-30 focus-within:z-30
                size-12 sm:size-10 grid place-items-center rounded-full
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
