<script lang="ts">
  import { HOME_ROUTE, SONGS_ROUTE } from "@/shared/consts";
  import {
    Card,
    CardTitle,
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/shared/ui";
  import {
    Heart,
    Home,
    ListMusic,
    Mic2,
    PlaySquare,
    Plus,
    Repeat,
  } from "lucide-svelte";
  import { Link } from "svelte-routing";
</script>

<Card class="h-screen overflow-y-auto flex-[0_0_200px]">
  <nav class="p-4 text-lg">
    <CardTitle class="text-2xl mb-4 flex items-center justify-between gap-2"
      ><span>Library</span>
      <Popover>
        <PopoverTrigger>
          <Plus size={28} class="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent class="p-1 w-52">
          <ul>
            <li>
              <button
                class="flex items-center gap-1 hover:bg-secondary transition-colors w-full p-1"
                type="button"
              >
                <ListMusic size={20} />
                <span>Create a new playlist</span>
              </button>
            </li>
          </ul>
        </PopoverContent>
      </Popover></CardTitle
    >
    <ul class="space-y-4 mb-8">
      <li>
        <Link class="flex items-center gap-1" to={HOME_ROUTE}
          ><Home size={20} /><span>Home</span></Link
        >
      </li>
      <li>
        <Link class="flex items-center gap-1" to={SONGS_ROUTE}
          ><Mic2 size={20} /><span>Songs</span></Link
        >
      </li>
      <li>
        <Link class="flex items-center gap-1" to={HOME_ROUTE}
          ><PlaySquare size={20} /><span>Playlists</span></Link
        >
        <ul></ul>
      </li>
    </ul>
    <CardTitle class="text-2xl mb-4">My Music</CardTitle>
    <ul class="space-y-4">
      <li>
        <Link class="flex items-center gap-1" to={HOME_ROUTE}
          ><Repeat size={20} /><span>Recently Played</span></Link
        >
      </li>
      <li>
        <Link class="flex items-center gap-1" to={HOME_ROUTE}
          ><Heart size={20} /><span>Favorite Songs</span></Link
        >
      </li>
    </ul>
  </nav>
</Card>

<style>
</style>
