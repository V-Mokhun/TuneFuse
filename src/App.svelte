<script lang="ts">
  import { SignIn, SignUp } from "@/pages";
  import { setSessionContext, supabase } from "@/shared/lib";
  import { buttonVariants } from "@/shared/ui";
  import type { AuthSession } from "@supabase/supabase-js";
  import { Search } from "lucide-svelte";
  import { onMount } from "svelte";
  import { Link, Route, Router } from "svelte-routing";
  import { writable } from "svelte/store";

  export let url = "";

  let session = writable<AuthSession | null>(null);
  setSessionContext(session);

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      $session = data.session;
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      $session = _session;
    });
  });
</script>

<Router {url}>
  <header class="flex items-center justify-between h-20 px-4 md:px-6">
    <Link class="flex items-center" to="/">
      <span>TuneFuse</span>
    </Link>
    <div class="flex items-center justify-center w-full max-w-md mx-auto">
      <form class="relative w-full">
        <Search
          size={24}
          class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
        />
        <input
          type="search"
          class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8 w-full"
          placeholder="Search for songs, artists, albums..."
        />
      </form>
    </div>
    <div class="flex items-center gap-4">
      {#if $session}
        <button
          class={buttonVariants()}
          on:click={() => supabase.auth.signOut()}>Sign out</button
        >
      {:else}
        <Link to="/sign-in" class={buttonVariants()}>Sign in</Link>
      {/if}
    </div>
  </header>
  <main class="flex-1">
    <Route path="/sign-in"><SignIn /></Route>
    <Route path="/sign-up"><SignUp /></Route>
    <Route path="/">Home</Route>
  </main>
  <footer></footer>
</Router>

<style>
</style>
