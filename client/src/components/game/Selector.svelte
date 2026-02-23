<script lang="ts">
  import { onMount } from "svelte";
  import Card from "./Card.svelte";
  import Words from "./Words.svelte";
  let role: 'impostor' | 'crewmate';
  export let selection: 'card' | 'words' = 'card';

  onMount(() => {
    // const response = fetch("http://localhost:3000/api/get-role")
  })
</script>


{#if selection === 'card'}
  <Card />
{:else if selection === 'words'}
  <Words />
{/if}
