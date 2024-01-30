<script lang="ts">
  import logo from "@/assets/images/logo.svg";
  import { HOME_ROUTE, SIGN_IN_ROUTE } from "@/shared/consts";
  import { getSessionContext, supabase } from "@/shared/lib";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Popover,
    PopoverContent,
    PopoverTrigger,
    buttonVariants,
  } from "@/shared/ui";
  import { LogOut, Search } from "lucide-svelte";
  import { Link } from "svelte-routing";

  export let showBasicHeader = false;

  const session = getSessionContext();
</script>

{#if showBasicHeader}
  <header class="py-4">
    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <div class="flex items-center justify-between gap-4">
        <Link class="flex items-center" to={HOME_ROUTE}>
          <img src={logo} alt="Logo" class="object-cover w-auto h-10" />
        </Link>
      </div>
    </div>
  </header>
{:else}
  <header class="py-4">
    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <div class="flex items-center justify-between gap-4">
        <Link class="flex items-center" to={HOME_ROUTE}>
          <img src={logo} alt="Logo" class="object-cover w-auto h-10" />
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
                  <AvatarImage
                    src={$session.user?.user_metadata?.avatar}
                    alt="User Avatar"
                  />
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
            <Link to={SIGN_IN_ROUTE} class={buttonVariants()}>Sign in</Link>
          {/if}
        </div>
      </div>
    </div>
  </header>
{/if}

<style>
</style>
