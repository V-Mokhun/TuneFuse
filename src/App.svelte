<script lang="ts">
  import { SignIn, SignUp } from "@/pages";
  import { setSessionContext, supabase } from "@/shared/lib";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Popover,
    PopoverContent,
    PopoverTrigger,
    buttonVariants,
  } from "@/shared/ui";
  import type { AuthSession } from "@supabase/supabase-js";
  import { LogOut, Search } from "lucide-svelte";
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
  <header class="flex items-center justify-between gap-4 h-20 px-4 md:px-6">
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
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <!-- <AvatarImage src={$session.user?.} alt="User avatar" /> -->
              <AvatarFallback class="uppercase"
                >{$session.user.user_metadata?.username?.substring(0, 2) ??
                  $session.user.email?.substring(0, 2) ??
                  "TF"}</AvatarFallback
              >
            </Avatar>
          </PopoverTrigger>
          <PopoverContent class="px-1 py-2 w-60">
            <ul class="space-y-0.5">
              <li>
                <Link
                  class="block p-2 hover:bg-secondary transition-colors"
                  to="/profile">Profile</Link
                >
              </li>
              <li class="border-b pb-0.5">
                <Link
                  class="block p-2 hover:bg-secondary transition-colors"
                  to="/settings">Settings</Link
                >
              </li>
              <li>
                <button
                  class="flex w-full items-center gap-2 p-2 hover:bg-secondary transition-colors"
                  on:click={() => supabase.auth.signOut()}
                >
                  <LogOut size={20} /> <span>Sign out</span></button
                >
              </li>
            </ul>
          </PopoverContent>
        </Popover>
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
