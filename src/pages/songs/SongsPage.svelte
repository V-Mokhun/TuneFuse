<script lang="ts">
  import { Container } from "@/shared/ui";
  import { AddSong, Songs } from "./ui";
  import { session, supabase, songs } from "@/shared/lib";
  import { toast } from "svelte-sonner";

  $: fetchSongs($session?.user.id);

  async function fetchSongs(id?: string) {
    if (!id) return;

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", id);

    if (error) {
      toast.error(error.message);
    } else {
      $songs = data;
    }
  }
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
