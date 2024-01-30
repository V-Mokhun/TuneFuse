<script lang="ts">
  import { Header } from "@/widgets";
  export let showBasicHeader = false;
</script>

<Header {showBasicHeader} />
<main class="flex-1">
  <slot />
</main>
<footer></footer>

<style>
</style>
