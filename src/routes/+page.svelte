<script>
    import { onMount } from "svelte";
    import Map from '$lib/components/Map.svelte';
    import ProfileCard from '$lib/components/ProfileCard.svelte';
    import Logo from '$lib/components/parts/Logo.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    let profileData = $state([]);
    let loading = $state(true);
    let error = $state(null);
    let mapRef = $state();
    const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2Vzc2VsZ3JpZnQxIiwiYSI6ImNtYjE1aXBxejBtZXgyaXMxMW9xaWk4bmEifQ.v0hKcgdU1cZs8LtpzvdPUg';

    // Handle profile hover - now receives location
    function handleProfileHover(location) {
        if (mapRef) {
            mapRef.highlightMarker(location);
        }
    }

    onMount(async () => {
        try {
            const response = await fetch('/profiles.json');
            if (!response.ok) throw new Error('Failed to fetch profiles');
            const data = await response.json();
            profileData = data.profiles;
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });
</script>

<div class="flex flex-row p-4 justify-between border-b border-border">
    <Logo />
    <Navigation />
</div>
<div class="flex w-full min-h-screen">
    <div class="flex flex-col w-1/2 gap-4 p-4">
        filters here
        {#each profileData as profile}
            <ProfileCard 
                {profile} 
                onHover={handleProfileHover}
            />
        {/each}
    </div>
    <div class="flex flex-col w-1/2 h-screen">
        <Map token={MAPBOX_TOKEN} bind:this={mapRef} />
    </div>
</div>