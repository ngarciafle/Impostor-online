<script lang="ts">
  import Initial from './Initial.svelte';
  import Create from './Create.svelte';
  import Join from './Join.svelte';
  import Wait from './Wait.svelte';

  let name: string;
  let idRoom: string;
  let selection: 'initial' | 'create' | 'join' | 'wait' = 'initial';
</script>

{#if selection === 'initial'}
  <Initial bind:selection/>
{:else if selection === 'create'}
  <Create bind:selection bind:name/>
{:else if selection === 'join'}
  <Join bind:selection bind:name bind:idRoom/>
{:else if selection === 'wait'}
  <Wait bind:selection bind:name bind:idRoom />
{/if}


