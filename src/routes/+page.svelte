<script>
    import { onMount } from "svelte";
    import Map from '$lib/components/Map.svelte';
    
    let profileData = $state([]);
    let loading = $state(true);
    let error = $state(null);
    const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2Vzc2VsZ3JpZnQxIiwiYSI6ImNtYjE1aXBxejBtZXgyaXMxMW9xaWk4bmEifQ.v0hKcgdU1cZs8LtpzvdPUg';

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

<div class="flex w-full min-h-screen">
    <div class="flex flex-col w-1/2 gap-4 p-4">
        {#each profileData as profile}
            <div class="flex flex-row items-center gap-4 p-4 border rounded-lg shadow-sm">
                <img 
                    src={profile.image} 
                    alt={profile.name} 
                    class="w-16 h-16 rounded-full object-cover"
                />
                <h1 class="text-xl font-semibold">{profile.name}</h1>
            </div>
        {/each}
    </div>
    <div class="flex flex-col w-1/2 h-screen">
        <Map token={MAPBOX_TOKEN} />
    </div>
</div>
  