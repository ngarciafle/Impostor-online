<script lang="ts">
  import { CirclePlay, CirclePlus } from 'lucide-svelte';

  export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
</script>

<h1 class="text-2xl mt-10 md:mt-16 xl:mt-20">Impostor Online🕵️‍♂️</h1>
<div class="flex gap-4 xl:gap-6 mt-20 sm:mt-[8%] md:mt-[12%] flex-col md:flex-row">
  <button on:click={() => selection = 'create'} class="flex gap-1 bg-background-secondary shadow shadow-foreground py-2 px-1.5 rounded-2xl hover:scale-105 transition-transform duration-300">
    <CirclePlus />
    <p class="text-md">Crear sala</p>
  </button>
  <button on:click={() => selection = 'join'} class="flex gap-1 bg-background-secondary shadow shadow-foreground py-2 rounded-2xl hover:scale-105 transition-transform duration-300">
    <CirclePlay />
    <p class="text-md">Unirse</p>
  </button>
</div>
