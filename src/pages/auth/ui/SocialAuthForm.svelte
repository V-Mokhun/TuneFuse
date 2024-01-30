<script lang="ts">
  import githubIcon from "@/assets/icons/github.svg";
  import googleIcon from "@/assets/icons/google.svg";
  import spotifyIcon from "@/assets/icons/spotify.svg";
  import { supabase } from "@/shared/lib";
  import { Button } from "@/shared/ui";
  import type { AuthType } from "./AuthForm.svelte";

  export let authType: AuthType = "sign-in";
</script>

<ul class="space-y-2">
  <li>
    <Button
      on:click={() =>
        supabase.auth.signInWithOAuth({
          provider: "google",
        })}
      class="w-full flex items-center gap-2"
      variant="outline"
    >
      <img src={googleIcon} alt="Google" class="w-5 h-5" />
      <span>Sign {authType === "sign-in" ? "in" : "up"} with Google</span>
    </Button>
  </li>
  <li>
    <Button
      on:click={() =>
        supabase.auth.signInWithOAuth({
          provider: "github",
        })}
      class="w-full flex items-center gap-2"
      variant="outline"
    >
      <img src={githubIcon} alt="Google" class="w-5 h-5" />
      <span> Sign {authType === "sign-in" ? "in" : "up"} with GitHub</span>
    </Button>
  </li>
  <li>
    <Button
      on:click={() =>
        supabase.auth.signInWithOAuth({
          provider: "spotify",
        })}
      class="w-full flex items-center gap-2"
      variant="outline"
    >
      <img src={spotifyIcon} alt="Spotify" class="w-5 h-5" />
      <span> Sign {authType === "sign-in" ? "in" : "up"} with Spotify</span>
    </Button>
  </li>
</ul>

<style>
</style>
