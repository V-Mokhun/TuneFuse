<script lang="ts">
  import logo from "@/assets/images/logo.png";
  import { HOME_ROUTE, SIGN_IN_ROUTE } from "@/shared/consts";
  import { session, supabase } from "@/shared/lib";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Container,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    buttonVariants,
  } from "@/shared/ui";
  import { LogOut, Search } from "lucide-svelte";
  import { Link } from "svelte-routing";

  export let showBasicHeader = false;
</script>

{#if showBasicHeader}
  <header class="py-4">
    <Container>
      <div class="flex items-center justify-between gap-4">
        <Link class="flex items-center gap-1 shrink-0" to={HOME_ROUTE}>
          <img
            src={logo}
            alt="Logo"
            class="shrink-0 flex-[0_0_40px] object-cover w-10 h-10 rounded-full outline outline-4 outline-black outline-offset-[-4.5px]"
          />
          <span class="text-2xl font-bold hidden md:block">TuneFuse</span>
        </Link>
      </div>
    </Container>
  </header>
{:else}
  <header class="py-4">
    <Container>
      <div class="flex items-center justify-between gap-4">
        <Link class="flex items-center gap-1 shrink-0" to={HOME_ROUTE}>
          <img
            src={logo}
            alt="Logo"
            class="shrink-0 flex-[0_0_40px] object-cover w-10 h-10 rounded-full outline outline-4 outline-black outline-offset-[-4.5px]"
          />
          <span class="text-2xl font-bold hidden md:block">TuneFuse</span>
        </Link>
        <!-- <div class="flex items-center justify-center w-full max-w-md mx-auto">
          <form class="relative w-full">
            <Search
              size={24}
              class="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400"
            />
            <Input class="pl-8" placeholder="Search for songs, playlists.." />
          </form>
        </div> -->
        <div class="flex items-center gap-4">
          {#if $session}
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={$session.user?.user_metadata?.avatar_url}
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
    </Container>
  </header>
{/if}

<style>
</style>
