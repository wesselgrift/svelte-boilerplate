<script>
	import '$src/app.css';
    import Protected from "$lib/components/blocks/auth/Protected.svelte";
    import Sidebar from "$lib/components/blocks/sidebar/Sidebar.svelte";
	
    let { children } = $props();
</script>

<Protected>
    <div class="flex min-h-screen animate-fade-in">
        <aside class="w-64 bg-color-navbar dark:bg-color-navbar-dark">
            <Sidebar />
        </aside>
        <main class="flex-1">
            <div class="p-10">
                {@render children()}
            </div>
        </main>
    </div>
</Protected>