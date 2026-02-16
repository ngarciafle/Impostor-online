<script lang="ts">
  import Initial from './Initial.svelte';
  import Create from './Create.svelte';
  import Join from './Join.svelte';

  let selection: 'initial' | 'create' | 'join' = 'initial';
</script>

{#if selection === 'initial'}
  <Initial bind:selection />
{:else if selection === 'create'}
  <Create bind:selection />
{:else if selection === 'join'}
  <Join bind:selection />
{/if}


