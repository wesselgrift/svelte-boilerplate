<script>
    let {
        id,
        name,
        options, // takes an array of strings
        selected = $bindable(), // this is bindable in the parent component as a boolean
        required = false,
        disabled = false,
    } = $props();

    const radioClasses = 
        "focus-ring border-input cursor-pointer rounded-full size-4 bg-background hover:bg-accent/80 checked:bg-primary checked:hover:bg-primary/80 checked:focus:bg-primary checked:active:bg-primary transition-all"
    const labelClasses = 
        "text-sm text-foreground cursor-pointer select-none"
    
    const disabledClasses =
        "disabled:cursor-default disabled:bg-primary/30 disabled:border-input/50 disabled:pointer-events-none";
</script>

<div class="flex flex-col gap-1">
    {#each options as option, index}
        <div class="flex flex-row gap-2 items-center">
            <input id={`${id}-${index}`} name={`${name}-${index}`} type="radio" value={option} class={radioClasses + ' ' + disabledClasses} bind:group={selected} {required} {disabled}>
            <label for={`${id}-${index}`} class={labelClasses + ' ' + (disabled ? 'pointer-events-none text-muted-foreground' : '')}>{option}</label>
        </div>
    {/each}
</div>

<style>
    /* Ensure dark radio dot */
    @media (prefers-color-scheme: dark) {
        input[type="radio"]:checked {
            background-image: url("data:image/svg+xml,<svg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'><circle cx='8' cy='8' r='3'/></svg>");
        }   
    }
</style>