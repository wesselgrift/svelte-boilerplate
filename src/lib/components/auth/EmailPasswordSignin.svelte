<script>
  import { login } from "$lib/firebase/auth";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import Label from '$lib/components/ui/Label.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import TextLink from '$lib/components/ui/TextLink.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Spinner from '$lib/components/ui/Spinner.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  let email = $state("");
  let password = $state("");
  let error = $state("");
  let showLoading = $state(false);

  $effect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      email = savedEmail;
    }
  });

  async function handleLogin() {
    try { 

      // Show loading indicator
      showLoading = true;

      // Login the user
      await login(email, password);

      // Store the email in local storage
      localStorage.setItem("email", email);
      
      // Redirect to the app
      goto("/app");

    } catch (err) {

      error = err.message;
      showLoading = false;

    } finally {

      showLoading = false;

    }
  }
</script>

{#if error}
  <div class="mb-5">
    <Card variant="danger" borderRadius="rounded-lg">
      Whoops, that didn't work. Please check if you filled in both email and password correctly.
    </Card>
  </div>
{/if}

<form onsubmit={e => { e.preventDefault(); handleLogin(); }}>
  <Label for="email" label="Email" />
  <Input name="email" type="email" bind:value={email} />

  <div class="flex flex-row justify-between">
    <Label for="password" label="Password" />
    <TextLink variant="muted" href="/reset-password" text="Forgot?" />
  </div>

  <Input name="password" type="password" bind:value={password} />
  
  <Button type="submit">
    {#if showLoading}
      <Spinner className="w-6 h-6 mr-3" spinColor="fill-color-primary-foreground" pathColor="text-color-primary-hover" />
    {/if}
      Log in
  </Button>
</form>