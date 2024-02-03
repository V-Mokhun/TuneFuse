<script lang="ts">
  import { cn, getSessionContext, supabase } from "@/shared/lib";
  import { Container, buttonVariants } from "@/shared/ui";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";

  let session = getSessionContext();
  let songs: FileList;

  $: console.log(songs && songs[0]);

  const onAddSong = async () => {
    if (!$session) {
      toast.error("You need to be signed in to add a song");
      return;
    }

    if (songs) {
      const song = songs[0];
      const { data, error } = await supabase.storage
        .from("songs")
        .upload(song.name, song);
      console.log(data, error);
    }
  };

  onMount(async () => {
    const songs = await supabase.storage.from("songs").list();
    console.log(songs);
  });
</script>

<section>
  <Container>
    <div class="py-4 flex items-center gap-4 mb-6">
      <h1 class="text-3xl font-semibold">Your Songs</h1>
      <label
        class={buttonVariants({ class: "cursor-pointer" })}
        for="song-upload"
      >
        <span>Add a Song</span>
        <input
          id="song-upload"
          type="file"
          accept="audio/*"
          class="visually-hidden"
          bind:files={songs}
          on:change={onAddSong}
        />
      </label>
    </div>
  </Container>
</section>

<style>
</style>
