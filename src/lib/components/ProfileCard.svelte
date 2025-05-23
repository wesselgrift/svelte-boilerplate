<script>
    let { profile, onHover } = $props();

    function handleMouseEnter() {
        onHover?.(profile.location);
    }

    function handleMouseLeave() {
        onHover?.(null);
    }
</script>

<div 
    class="bg-card text-card-foreground p-4 rounded-lg shadow-sm border border-border hover:border-primary/50 transition-colors cursor-pointer"
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    role="presentation"
>
    <div class="flex items-center gap-4">
        <img src={profile.image} alt={profile.name} class="w-12 h-12 rounded-full" />
        <div>
            <h3 class="font-medium">{profile.name}</h3>
            <p class="text-sm text-muted-foreground">{profile.type}</p>
            <p class="text-sm text-muted-foreground">€{profile.price} per hour</p>
            <p class="text-sm text-muted-foreground">{profile.rating} stars</p>
        </div>
    </div>
</div> 