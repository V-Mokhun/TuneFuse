<script lang="ts">
  import { supabase, type Tables } from "@/shared/lib";
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/shared/ui";
  import { MoreHorizontal } from "lucide-svelte";

  export let song: Tables<"songs">;
  export let playlistId: string | undefined = undefined;

  function handleLikeSong() {
    console.log(song.isLiked);
    supabase
      .from("songs")
      .update({ isLiked: !song.isLiked })
      .eq("id", song.id)
      .then((res) => {
        console.log(res);
      });
  }
</script>

<DropdownMenu>
  <DropdownMenuTrigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative w-6 h-6 p-0"
    >
      <span class="sr-only">Open menu</span>
      <MoreHorizontal class="w-4 h-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Add to playlist</DropdownMenuItem>
    <DropdownMenuItem>Remove from this playlist</DropdownMenuItem>
    <DropdownMenuItem>
      <button type="button" on:click={handleLikeSong}
        >{song.isLiked ? "Remove from" : "Add to"} your Liked Songs</button
      >
    </DropdownMenuItem>
    <DropdownMenuItem>Add to queue</DropdownMenuItem>
    <DropdownMenuItem>Delete this song</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

<style>
</style>
