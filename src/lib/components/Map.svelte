<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css';

    let { token } = $props();
    let mapContainer = $state();
    let map = $state();

    onMount(() => {
        mapboxgl.accessToken = token;
        
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [4.9041, 52.3676], // Amsterdam coordinates
            zoom: 10
        });

        return () => {
            map?.remove();
        };
    });
</script>

<div class="w-full h-full" bind:this={mapContainer}></div>

<style>
    :global(.mapboxgl-canvas) {
        width: 100%;
        height: 100%;
    }
</style> 