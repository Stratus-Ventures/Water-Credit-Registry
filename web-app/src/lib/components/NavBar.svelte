<script lang="ts">

    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import type { Pathname } from '$app/types';

    // const tabs = {
    //     'Overview': '/overview', // [LEFT: Total Credits, list of live credits being created, CENTER: US MAP with overlays and stations available.. RIGHT: list of water stations, clicking on a water station opens an overlay with the location on map. With the metrics we have on an overlay. and also have the credits listed. ]
    //     'Credits': '/credits', // [Center Ledger for all produced on site. Like People list. Clicking on one of these will go to a Credit Detail Page]
    //     'Water Stations': '/water-stations', // [List of water stations available on the map and which they are associated with, water station Detail Page. Map snippet to link back to map.]
    //     'About': '/about', // [About the project, team, and contact information]
    //     'Wallet': '/wallet', // [USER protected page. Login Overlay use better auth. Only for people who have bought credits.]
    // }

    const tabs = [
        { id: 0, icon: 'globe', name: 'Overview', page: '/overview' },
        { id: 1, icon: 'coin', name: 'Credits', page: '/credits' },
        { id: 2, icon: 'water', name: 'Water Stations', page: '/water-stations' },
        { id: 3, icon: 'info', name: 'About', page: '/about' },
        { id: 4, icon: 'wallet', name: 'Wallet', page: '/wallet' },
    ] satisfies { id: number; icon: string; name: string; page: Pathname }[];

</script>

<!-- BOTTOM NAVBAR -->
<nav class="
    fixed bottom-16 left-0 right-0
    flex flex-row justify-center items-center
    w-fit h-fit p-2 mx-auto gap-2 rounded-2xl
    [corner-shape:squircle] bg-zinc-900 text-white"
>
    {#each tabs as tab (tab.id)}
        <button
            class=""
            onclick={() => goto(resolve(tab.page))}>
                {tab.name}
        </button>
    {/each}
</nav>
