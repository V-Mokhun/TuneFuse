<script lang="ts">
  import { Container } from "@/shared/ui";
  import { afterUpdate, onMount } from "svelte";
  import { AddSong, Songs } from "./ui";
  import { supabase } from "@/shared/lib";

  afterUpdate(async () => {
    // if ($session?.user?.id) {
    // console.log($session?.user?.id);
    // const songs = await supabase
    //   .from("songs")
    //   .select("*")
    //   .eq("user_id", $session?.user?.id ?? "");
    // console.log(songs.data);
    // }
  });
</script>

<section>
  <Container>
    <div class="py-4 flex items-center gap-4 mb-6">
      <h1 class="text-3xl font-semibold">Your Songs</h1>
      <AddSong />
    </div>

    <Songs />
  </Container>
</section>

<style>
</style>
