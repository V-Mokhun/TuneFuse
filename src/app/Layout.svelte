<script lang="ts">
  import { Toaster } from "@/shared/ui";
  import { Header } from "@/widgets";
  export let showBasicHeader = false;
</script>

<Toaster richColors />
<Header {showBasicHeader} />
<main class="flex-1">
  <slot />
</main>
<footer></footer>

<style>
</style>
