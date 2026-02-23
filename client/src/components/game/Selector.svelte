<script lang="ts">
  import { onMount } from "svelte";
  import Card from "./Card.svelte";
  import Words from "./Words.svelte";
  let role: 'impostor' | 'crewmate';
  let word: string;
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

<h1>This is the game page</h1>
