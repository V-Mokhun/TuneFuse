<script lang="ts">
  import { supabase, type Tables } from "@/shared/lib";
  import { DropdownMenuItem } from "@/shared/ui";
  import { toast } from "svelte-sonner";

  export let song: Tables<"songs">;
  export let playlistId: string | undefined = undefined;

  function handleLikeSong() {
    supabase
      .from("songs")
      .update({ isLiked: !song.isLiked })
      .eq("id", song.id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success(
            `${song.isLiked ? "Removed from" : "Added to"} your Liked Songs`
          );
        }
      });
  }
</script>

<DropdownMenuItem>Add to playlist</DropdownMenuItem>
{#if playlistId}
  <DropdownMenuItem>Remove from this playlist</DropdownMenuItem>
{/if}
<DropdownMenuItem>
  <button type="button" on:click={handleLikeSong}
    >{song.isLiked ? "Remove from" : "Add to"} your Liked Songs</button
  >
</DropdownMenuItem>
<DropdownMenuItem>Add to queue</DropdownMenuItem>
<DropdownMenuItem>Delete this song</DropdownMenuItem>

<style>
</style>
