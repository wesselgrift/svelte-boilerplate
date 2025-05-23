<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css';

    let { token } = $props();
    let mapContainer = $state();
    let map = $state();
    let profiles = $state([]);
    let markers = $state(new Map());

    // Function to highlight a specific marker by location
    function highlightMarker(location) {
        // Reset all markers to default state
        markers.forEach(marker => {
            marker.getElement().classList.remove('highlighted');
        });
        
        // Highlight the selected marker if location is provided
        if (location) {
            const marker = markers.get(location);
            if (marker) {
                marker.getElement().classList.add('highlighted');
            }
        }
    }

    // Expose the highlightMarker method
    export { highlightMarker };

    onMount(async () => {
        // Load profiles data
        const response = await fetch('/profiles.json');
        const data = await response.json();
        profiles = data.profiles;

        mapboxgl.accessToken = token;
        
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [4.9041, 52.3676], // Amsterdam coordinates
            zoom: 10
        });

        // Add markers after map loads
        map.on('load', () => {
            profiles.forEach(profile => {
                const [lat, lng] = profile.location.split(',').map(Number);
                
                // Create marker element
                const el = document.createElement('div');
                el.className = 'marker';
                
                // Create and add marker
                const marker = new mapboxgl.Marker(el)
                    .setLngLat([lng, lat])
                    .addTo(map);
                
                // Store marker reference with location as key
                markers.set(profile.location, marker);
            });
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

    :global(.marker) {
        width: 12px;
        height: 12px;
        background-color: blue;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: background-color 0.2s ease;
    }

    :global(.marker.highlighted) {
        background-color: red;
        transform: scale(1.2);
    }
</style> 