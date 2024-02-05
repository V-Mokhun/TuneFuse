<script lang="ts">
  export let pictureUrl: string | null = null;
  export let title: string;
</script>

<div class="flex items-center gap-2">
  {#if pictureUrl}
    <img class="w-10 h-10 rounded-md" src={pictureUrl} alt={title} />
  {/if}
  <span class="truncate">{title}</span>
</div>

<style>
</style>
